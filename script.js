document.addEventListener('DOMContentLoaded', () => {
    const videoElement = document.getElementById('qr-video');
    const qrResultElement = document.getElementById('qr-result');

    // Initialize QRScanner object
    const qrScanner = new QRScanner(videoElement, result => {
        qrResultElement.textContent = result;
        // Handle QR code result (e.g., send to server, process data, etc.)
    });

    // Start scanning when video stream is ready
    qrScanner.start();

    // Stop scanning when the page is unloaded
    window.addEventListener('unload', () => {
        qrScanner.stop();
    });

    // Handle errors
    qrScanner.onError = error => {
        console.error('QR Scanner error:', error);
    };
});
