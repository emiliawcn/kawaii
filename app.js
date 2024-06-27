var imageDisplay = document.getElementById('imageDisplay');
var caption = document.getElementById('caption');
var buttonContainer = document.getElementById('buttonContainer');

var imageUrls = [];
var usedImages = [];
var currentIndex = 0;


// lägger till ny button och tar nästa i listan
function addNewButton() {
    var image = getNextImage();
    if (!image) return;

    var button = document.createElement('button');
    button.textContent = currentIndex;
    button.onclick = function() {
        changeImage(image);
    };
    buttonContainer.appendChild(button);
}
// Fetchar images från API
async function fetchImages() {
    try {
        const response = await fetch("https://picsum.photos/v2/list?page=2&limit=100");
        const images = await response.json();
        imageUrls = images.map(function(image, index)  {
            addNewButton();
            let img = {
                url: image.download_url,
                caption: 'Image ' + (index + 1)
            }
            return img
        });
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function getNextImage() {
    if (currentIndex >= imageUrls.length) return null;
    var image = imageUrls[currentIndex];
    currentIndex++;
    return image;
}

function changeImage(image) {
    imageDisplay.classList.add('fade-out');
    imageDisplay.onload = function() {
        imageDisplay.classList.remove('fade-out');
        imageDisplay.classList.add('fade-in');
        caption.textContent = image.caption;
        imageDisplay.onload = null; // tar bort onload handler
    };
    imageDisplay.src = image.url;
}

// initial images and create initial button
fetchImages().then(() => {
});

imageDisplay.addEventListener('animationend', function(event) {
    if (event.animationName === 'fade-in') {
        imageDisplay.classList.remove('fade-in');
    }
});

// var imageUrls = [
//     { url: 'https://picsum.photos/id/237/400/400', caption: 'Image 1' },
//     { url: 'https://picsum.photos/id/1025/400/400', caption: 'Image 2' },
//     { url: 'https://picsum.photos/id/219/400/400', caption: 'Image 3' },
//     { url: 'https://picsum.photos/id/433/400/400', caption: 'Image 4' },
//     { url: 'https://picsum.photos/id/593/400/400', caption: 'Image 5' },
//     { url: 'https://picsum.photos/id/582/400/400', caption: 'Image 6' }
// ];
