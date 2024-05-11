// Access video element
const videoElement = document.getElementById('qr-video');

// Function to handle errors
function handleError(error) {
    console.error('Error accessing camera:', error);
}

// Start video stream from rear camera (if available)
navigator.mediaDevices.enumerateDevices()
    .then(function(devices) {
        // Find the rear camera device
        const rearCamera = devices.find(device => device.kind === 'videoinput' && !device.label.toLowerCase().includes('front'));

        // Use the rear camera if found, otherwise use any available camera
        const constraints = {
            video: {
                deviceId: rearCamera ? { exact: rearCamera.deviceId } : undefined,
                facingMode: 'environment' // Use the rear camera
            }
        };

        return navigator.mediaDevices.getUserMedia(constraints);
    })
    .then(function(stream) {
        videoElement.srcObject = stream;
    })
    .catch(handleError);

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
