function saveTabToGroup(groupName, tab) {
  chrome.storage.local.get("groups", (data) => {
    let groups = data.groups || {};
    groups[groupName] = groups[groupName] || [];
    groups[groupName].push(tab);
    chrome.storage.local.set({ groups });
  });
}

function removeTabFromGroup(groupName, tabId) {
  chrome.storage.local.get("groups", (data) => {
    let groups = data.groups;
    groups[groupName] = groups[groupName].filter((tab) => tab.id !== tabId);
    chrome.storage.local.set({ groups });
  });
}
