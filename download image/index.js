document.getElementById('imageForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the input text
    var inputText = document.getElementById('textInput').value;

    // Make a request to the Unsplash API to get 10 random images
    fetch('https://api.unsplash.com/photos/random?count=10&query=' + encodeURIComponent(inputText) + '&client_id=z-XRW_fWPnJonOY7QGVmEErASXYr6qhkZ54ju1dNBMA')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Clear previous images
            var imageContainer = document.getElementById('imageContainer');
            imageContainer.innerHTML = '';

            // Iterate through the response data and create image elements
            data.forEach(photo => {
                // Create an image element
                var img = document.createElement('img');
                // Set the source of the image to the URL received from the API
                img.src = photo.urls.regular;
                // Set the alt attribute of the image
                img.alt = photo.alt_description || 'Generated Image';

                // Create a download link for the image
                var downloadLink = document.createElement('a');
                downloadLink.textContent = 'Download';
                // Convert the image URL to Blob
                fetch(photo.urls.full)
                    .then(response => response.blob())
                    .then(blob => {
                        // Create a Blob URL for the image Blob
                        var blobUrl = URL.createObjectURL(blob);
                        downloadLink.href = blobUrl;
                        downloadLink.download = 'image_' + Date.now() + '.jpg'; // Assign a unique name for the downloaded file
                    })
                    .catch(error => {
                        console.error('Error creating Blob:', error);
                    });

                // Append the image and download link to the image container
                var imageDiv = document.createElement('div');
                imageDiv.appendChild(img);
                imageDiv.appendChild(downloadLink);
                imageContainer.appendChild(imageDiv);
            });
        })
        .catch(error => {
            console.error('There was a problem with the request:', error);
        });
});
