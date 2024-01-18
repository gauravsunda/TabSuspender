// Listen for messages from the popup script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'suspendTabs') {
      // Implement your tab suspension logic here
      suspendInactiveTabs()
        .then(() => sendResponse({ success: true }))
        .catch((error) => sendResponse({ success: false, error }));
      return true; // Indicates that you will respond asynchronously
    }
  });
  
  function suspendInactiveTabs() {
    // Implement your tab suspension logic here
    return new Promise((resolve, reject) => {
      try {
        // Query the list of tabs using chrome.tabs API
        chrome.tabs.query({}, (tabs) => {
          tabs.forEach((tab) => {
            // Check if the tab should be suspended based on your criteria
            // You may use a timestamp to track inactivity and suspend tabs accordingly
            if (shouldSuspendTab(tab)) {
              chrome.tabs.discard(tab.id, () => {
                console.log(`Suspended tab: ${tab.id}`);
              });
            }
          });
          resolve();
        });
      } catch (error) {
        reject(error);
      }
    });
  }
  function shouldSuspendTab(tab) {
    // Implement your criteria to determine if a tab should be suspended
    // For example, compare the last activity time with the current time
    // Return true if it should be suspended, false otherwise
    // You may use a background page or a storage mechanism to track activity timestamps
    return false; // Replace with your logic
  }
  // function shouldSuspendTab(tab, thresholdTime) {
  //   // Get the last activity timestamp of the tab
  //   const lastActivityTimestamp = tab.lastActivity || 0;
  
  //   // Get the current time
  //   const currentTime = Date.now();
  
  //   // Calculate the time since the last activity
  //   const timeSinceLastActivity = currentTime - lastActivityTimestamp;
  
  //   // Compare the time since last activity with the threshold time
  //   return timeSinceLastActivity >= thresholdTime;
  // }
  
  // // Example usage:
  // const thresholdTime = 15 * 60 * 1000; // 15 minutes in milliseconds
  
  // // Sample tab with last activity time
  // const tab = {
  //   id: 1,
  //   lastActivity: Date.now() - 10 * 60 * 1000, // Simulating last activity 10 minutes ago
  // };
  
  // // // if (shouldSuspendTab(tab, thresholdTime)) {
  // // //   console.log('Suspend the tab:', tab.id);
  // // // } else {
  // // //   console.log('Do not suspend the tab:', tab.id);
  // // // }
  
  
  // Initialize a dictionary to track tab activity timestamps
const tabActivityTimestamps = {};

// Listen for messages from the content script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'userActivity') {
    // Update the last activity timestamp for the current tab
    const tabId = sender.tab.id;
    tabActivityTimestamps[tabId] = Date.now();
  }
});

chrome.tabs.query({ discarded: true }, (suspendedTabs) => {
    console.log('Suspended Tabs:', suspendedTabs);
  });

  chrome.tabs.query({ discarded: false }, (activeTabs) => {
    console.log('Active Tabs:', activeTabs);
  });

  
//   // Listen for messages from the popup script
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.action === 'suspendTabs') {
//       const tabId = message.tabId; // The ID of the tab to suspend
//       chrome.tabs.discard(tabId, () => {
//           console.log(`Suspended tab: ${tabId}`);
//           sendResponse({ success: true });
//       });
//       return true;
//   }
// });
