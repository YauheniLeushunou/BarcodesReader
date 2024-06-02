# Barcode Reader with Camera Selection

This project is a web-based barcode reader application that allows users to select a camera, scan barcodes, and manage product information. It also includes functionalities to upload data from a file and save data to a file.

## Features

- Select and use different cameras for barcode scanning
- Scan and detect barcodes using the QuaggaJS library
- Display detected barcodes and input associated product information
- Save product information to local storage
- Upload product data from a JSON file
- Save current product data to a JSON file

## Technologies Used

- HTML
- CSS (Bootstrap 4.5.2)
- JavaScript
- QuaggaJS (for barcode scanning)

## How to Use

1. **Select Camera:**
   - Use the dropdown to select the desired camera for barcode scanning.
2. **Scan Barcode:**
   - The selected camera will start streaming, and barcodes will be detected and displayed.
3. **Add Product Information:**
   - Click on a detected barcode to input the associated product name and expiration date.
   - Click 'Add' to save the product information.
4. **Upload Data:**
   - Click on 'Upload Data' in the header menu to upload product data from a JSON file.
5. **Save Data:**
   - Click on 'Save to File' in the header menu to download the current product data as a JSON file.


## Local Development

To run the project locally:

- Clone the repository:

```bash
git clone https://github.com/yourusername/barcode-reader.git
```

- Navigate to the project directory:

```bash
cd barcode-reader
```

- Open index.html in a web browser.


## Code Overview

### HTML Structure

- Camera Selection: A dropdown menu to select the camera.
- Video Feed: Displays the live video from the selected camera.
- Detected Barcodes: Lists the detected barcodes.
- Product Information Form: Form to enter and submit product details.
- Product Table: Displays the list of products with options to delete.

### JavaScript Functionality

- Camera Initialization: Handles camera selection and starts the video stream.
- Barcode Detection: Uses QuaggaJS to detect barcodes and displays them.
- Form Handling: Manages the display and submission of the product information form.
- Data Management: Stores and retrieves product data from local storage.
- Table Management: Dynamically updates the product table based on stored data.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for review.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
