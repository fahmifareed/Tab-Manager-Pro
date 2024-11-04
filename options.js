document.getElementById("saveSettingsBtn").addEventListener("click", () => {
  const autoSave = document.getElementById("autoSaveCheckbox").checked;
  chrome.storage.local.set({ autoSave }, () => {
    alert("Settings saved!");
  });
});

chrome.storage.local.get("autoSave", (data) => {
  document.getElementById("autoSaveCheckbox").checked = data.autoSave || false;
});
