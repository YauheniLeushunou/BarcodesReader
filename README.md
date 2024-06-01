# Barcode Reader with Camera Selection

This project is a web-based application that enables users to scan barcodes using their device's camera, manage the scanned product information, and store the data locally. It utilizes the QuaggaJS library for barcode scanning and JavaScript for handling the camera input and data management.

## Features

- Camera Selection: Allows users to choose from available cameras on their device.
- Live Barcode Scanning: Scans barcodes in real-time using the selected camera.
- Product Information Form: Enables users to enter product details such as name and expiration date for each scanned barcode.
- Data Storage: Saves product information in the browser's local storage.
- Dynamic Table: Displays the list of scanned products with options to delete entries.

## Usage

### Camera Selection

- Select the desired camera from the dropdown menu.
- The video feed from the selected camera will be displayed.

### Scanning Barcodes

- Point the camera at a barcode.
- Detected barcodes will be listed below the video feed.

## Adding Product Information

- Click on a detected barcode to open the product information form.
- Enter the product name and expiration date.
- Click the "Add" button to save the product information.

## Managing Product Data

- Table: Displays all scanned products with their details.
- Delete: Remove a product entry by clicking the "Delete" button next to it.

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

## Technologies Used

- HTML: For the structure of the application.
- CSS: For styling the application.
- JavaScript: For functionality and interactivity.
- QuaggaJS: For barcode scanning.

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
