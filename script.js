document.addEventListener('DOMContentLoaded', async () => {
    const videoElement = document.getElementById('qr-video');
    const qrResultElement = document.getElementById('qr-result');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        videoElement.srcObject = stream;
        videoElement.play();

        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');

        const scanQRCode = () => {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            canvasContext.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

            const imageData = canvasContext.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                qrResultElement.textContent = code.data;
                // Handle QR code data (e.g., send to server, perform action, etc.)
            }

            requestAnimationFrame(scanQRCode);
        };

        requestAnimationFrame(scanQRCode);

    } catch (error) {
        console.error('Error accessing camera:', error);
    }
});
