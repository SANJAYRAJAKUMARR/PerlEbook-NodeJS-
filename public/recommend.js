function executePythonScript() {
    // Make a GET request to the server's endpoint
    fetch('/recommendedbooks')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to execute Python script');
        }
        // Return the response as text
        return response.text();
    })
    .then(data => {
        // Log the data received from the Python script
        console.log(data);
        // You can handle the received data here, such as updating the UI
        // Once the data is received, you can redirect to the index page
        window.location.href = '/index'; // Redirect to the index page
    })
    .catch(error => {
        console.error('Error executing Python script:', error);
    });
}
