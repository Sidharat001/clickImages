let stream;

// Function to open the camera
function openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            const video = document.getElementById('video');
            video.srcObject = stream;
            stream = stream;
            document.getElementById('captureBtn').style.display = 'inline';
            document.getElementById('closeCameraBtn').style.display = 'inline';
            document.getElementById('openCameraBtn').style.display = 'none';
            video.style.display = 'inline';
        })
        .catch(error => {
            console.error('Error accessing camera:', error);
        });
}

// Function to close the camera
function closeCamera() {
    const video = document.getElementById('video');
    video.pause();
    video.srcObject.getTracks().forEach(track => track.stop());
    document.getElementById('captureBtn').style.display = 'none';
    document.getElementById('closeCameraBtn').style.display = 'none';
    document.getElementById('openCameraBtn').style.display = 'inline';
    video.style.display = 'none';
}

// Function to capture photo and save
function capturePhotoAndSave() {
    const video = document.getElementById('video');
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame onto the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob((blob) => {
        // Create a new file from the blob
        const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

        // Save the file locally using FileSaver.js
        saveAs(file, 'photo.jpg');
    }, 'image/jpeg');
}

// Add click event listeners to buttons
document.getElementById('openCameraBtn').addEventListener('click', openCamera);
document.getElementById('closeCameraBtn').addEventListener('click', closeCamera);
document.getElementById('captureBtn').addEventListener('click', capturePhotoAndSave);