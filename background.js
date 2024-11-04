// Create the context menu item when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  // Create a context menu item with ID "addToGroup"
  chrome.contextMenus.create({
    id: "addToGroup",
    title: "Add to Group",
    contexts: ["all"] // The "all" context makes it available across all areas
  });
});

// Listener for context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToGroup") {
    // Fetch existing groups from local storage
    chrome.storage.local.get("groups", (data) => {
      // Prompt the user for the group name
      let groupName = prompt("Enter group name:");
      if (groupName) {
        // Initialize groups if they don't exist
        let groups = data.groups || {};
        groups[groupName] = groups[groupName] || []; // Create group if it doesn't exist
        groups[groupName].push({ title: tab.title, url: tab.url }); // Add tab to the group
        // Save updated groups back to storage
        chrome.storage.local.set({ groups }, () => {
          console.log(`Tab added to group: ${groupName}`);
        });
      }
    });
  }
});

