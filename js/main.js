var PRODUCTS;

// Generate unique ID
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

document.addEventListener('DOMContentLoaded', function () {
  const cameraSelect = document.getElementById('cameraSelect');
  const detectedBarcodesElement = document.getElementById('detected-barcodes');
  const productInfoForm = document.getElementById('product-info-form');
  const productNameInput = document.getElementById('productName');
  const expirationDateInput = document.getElementById('expirationDate');
  const productTableBody = document.getElementById('product-table-body');

  /**
   * Load saved data from local storage on page load
   */
  window.onload = function () {
    showEditForm(false);
    loadTable(null);
  };

  // Upload data from file
  window.uploadData = function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const contents = e.target.result;
        DATA = JSON.parse(contents);
        loadTable(mergeListsById(PRODUCTS, DATA));
      };
      reader.readAsText(file);
    }
  };

  // Save data to file
  window.saveData = function () {
    const dataStr = JSON.stringify(PRODUCTS, null, 2);
    const dataUri =
      'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const exportFileDefaultName = `productData(${new Date().toUTCString()}).json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Populate camera selection dropdown
  navigator.mediaDevices.enumerateDevices().then(function (devices) {
    devices.forEach(function (device) {
      if (device.kind === 'videoinput') {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.text = device.label || `Camera ${cameraSelect.length + 1}`;
        cameraSelect.appendChild(option);
      }
    });
    // Automatically select the first camera
    if (cameraSelect.options.length > 0) {
      cameraSelect.selectedIndex = 0;
      startVideoStream(cameraSelect.value);
    }
  });

  /**
   * Changes current camera
   */
  cameraSelect.addEventListener('change', function () {
    if (cameraSelect.value) {
      startVideoStream(cameraSelect.value);
    }
  });

  // Initialize QuaggaJS
  Quagga.init(
    {
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.getElementById('barcode-video')
      },
      decoder: {
        readers: ['ean_reader']
      }
    },
    function (err) {
      if (err) {
        console.error('Error initializing Quagga:', err);
        return;
      }
      console.log('Initialization finished. Ready to start');
      Quagga.start();
    }
  );
  // Handle barcode detection
  const detectedBarcodes = new Set();
  Quagga.onDetected(function (result) {
    const code = result.codeResult.code;
    if (!detectedBarcodes.has(code)) {
      detectedBarcodes.add(code);
      const barcodeElement = document.createElement('div');
      barcodeElement.textContent = code;
      barcodeElement.addEventListener('click', function () {
        // Display selected barcode and show product info form

        productNameInput.value =
          PRODUCTS.filter((el) => el.barcode === code).at(-1)?.productName ||
          '';

        detectedBarcodesElement.textContent = 'Selected Barcode: ' + code;
        productInfoForm.dataset.barcode = code; // Store selected barcode in form dataset
        showEditForm(true);
      });
      detectedBarcodesElement.appendChild(barcodeElement);
    }
  });

  // Handle form submission
  productInfoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const productName = productNameInput.value;
    const expirationDate = expirationDateInput.value;
    const barcode = productInfoForm.dataset.barcode; // Retrieve selected barcode from form dataset

    if (!expirationDate) {
      alert('Please enter an expiration date.');
      return;
    }

    // Save data to local storage
    const data = {
      id: generateId(), // Generate a unique ID for the new entry
      barcode: barcode,
      productName: productName,
      expirationDate: expirationDate
    };

    PRODUCTS.push(data);

    // Reset form and hide it
    detectedBarcodesElement.value = '';
    detectedBarcodesElement.textContent = '';
    showEditForm(false);
    loadTable(PRODUCTS);

    detectedBarcodes.clear();
  });

  /**
   * Single event listener for delete buttons
   * Deletes product by id
   */
  productTableBody.addEventListener('click', function (event) {
    if (
      event.target.tagName === 'BUTTON' &&
      event.target.textContent === 'Delete'
    ) {
      const id = event.target.dataset.id;
      const confirmed = confirm(
        'Are you sure you want to delete this product?'
      );
      if (confirmed) {
        loadTable(PRODUCTS.filter((record) => record.id !== id));
      }
    }
  });

  /**
   * Reloads data table
   */
  const loadTable = function (updatedDate) {
    if (updatedDate) {
      localStorage.setItem('productData', JSON.stringify(updatedDate));
    }

    const savedData = localStorage.getItem('productData');
    PRODUCTS = savedData ? JSON.parse(savedData) : [];
    

    productTableBody.innerHTML = '';
    PRODUCTS.sort(
      (a, b) => new Date(a.expirationDate) - new Date(b.expirationDate)
    );
    PRODUCTS.forEach((data) => {
      const row = productTableBody.insertRow();
      const cellBarcode = row.insertCell(0);
      const cellProductName = row.insertCell(1);
      const cellExpirationDate = row.insertCell(2);
      const cellAction = row.insertCell(3);
      cellBarcode.textContent = data.barcode;
      cellProductName.textContent = data.productName;
      cellExpirationDate.textContent = data.expirationDate;

      // Add delete button
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('btn', 'btn-primary', 'mb-2');
      deleteButton.textContent = 'Delete';
      deleteButton.dataset.id = data.id;
      cellAction.appendChild(deleteButton);
    });
  };

  /**
   * Enable/disable input form for product
   */
  const showEditForm = function (show) {
    expirationDateInput.value = '';
    productInfoForm.style.display = show ? 'flex' : 'none';
  };

  /**
   * Activates camera by id
   */
  function startVideoStream(deviceId) {
    navigator.mediaDevices
      .getUserMedia({
        video: { deviceId: { exact: deviceId } }
      })
      .then(function (stream) {
        var video = document.getElementById('barcode-video');
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
          video.play();
        };
      })
      .catch(function (err) {
        console.error('Error accessing the camera:', err);
      });
  }

  function mergeListsById(list1, list2) {
    // Create a map from list1 using the ID as the key
    const map = new Map();
    list1.forEach((item) => map.set(item.id, { ...item }));

    // Merge objects from list2 into the map
    list2.forEach((item) => {
      if (map.has(item.id)) {
        // If the ID exists in list1, merge the objects
        map.set(item.id, { ...map.get(item.id), ...item });
        console.log('updated: ', item);
      } else {
        // If the ID does not exist in list1, add the item to the map
        map.set(item.id, { ...item });
        console.log('added: ', item);
      }
    });
    // Convert the map back to an array
    return Array.from(map.values());
  }
});
