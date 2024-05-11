// Access video element
const videoElement = document.getElementById('qr-video');

// Start video stream from webcam
navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
        videoElement.srcObject = stream;
    })
    .catch(function(error) {
        console.error('Error accessing webcam:', error);
    });

// Configure QuaggaJS to decode QR codes
Quagga.init({
    inputStream: {
        name: "Live",
        type: "LiveStream",
        target: videoElement
    },
    decoder: {
        readers: ["qrcode_reader"]
    }
}, function(err) {
    if (err) {
        console.error('Error initializing Quagga:', err);
        return;
    }
    Quagga.start();
});

// Detect when a QR code is scanned
Quagga.onDetected(function(result) {
    const qrCodeData = result.codeResult.code;
    document.getElementById('qr-result').textContent = qrCodeData;
    // Handle the QR code data here (e.g., send it to a server)
});
