// Add a click event listener to the suspension button
document.getElementById('suspendTabs').addEventListener('click', () => {
    // Send a message to the background script to initiate tab suspension
    chrome.runtime.sendMessage({ action: 'suspendTabs' }, (response) => {
      if (response.success) {
        // Handle success
        console.log('Tabs suspended successfully.');
      } else {
        // Handle any errors
        console.error('Error suspending tabs:', response.error);
      }
    });
  });
  document.getElementById('suspendTabs').addEventListener('click', () => {
    console.log('Button clicked!'); // Add this line for debugging
    // Send a message to the background script to initiate tab suspension
    chrome.runtime.sendMessage({ action: 'suspendTabs' }, (response) => {
        // Handle the response
        console.log('Response received:', response);
    });
});


