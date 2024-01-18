// Add event listeners to track user activity on the page
document.addEventListener('click', handleUserActivity);
document.addEventListener('keydown', handleUserActivity);
document.addEventListener('mousemove', handleUserActivity);

function handleUserActivity() {
  // Send a message to the background script to indicate activity
  chrome.runtime.sendMessage({ action: 'userActivity' });
}

//  // Create a list of tabs with checkboxes
//  chrome.tabs.query({}, (tabs) => {
//   const tabList = document.getElementById('tabList');
//   tabs.forEach((tab) => {
//       const tabDiv = document.createElement('div');
//       const checkbox = document.createElement('input');
//       checkbox.type = 'checkbox';
//       tabDiv.appendChild(checkbox);
//       tabDiv.appendChild(document.createTextNode(tab.title));
//       tabList.appendChild(tabDiv);
//   });
// });

// // Add an event listener to suspend selected tabs
// document.getElementById('suspendTabs').addEventListener('click', () => {
//   const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//   checkboxes.forEach((checkbox, index) => {
//       if (checkbox.checked) {
//           // Suspend the selected tab based on its ID
//           chrome.tabs.discard(tabs[index].id);
//       }
//   });
// });
  