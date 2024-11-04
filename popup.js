document.getElementById("newGroupBtn").addEventListener("click", () => {
  const groupName = prompt("Enter a name for the new group:");
  if (groupName) {
    chrome.storage.local.get("groups", (data) => {
      let groups = data.groups || {};
      groups[groupName] = [];
      chrome.storage.local.set({ groups }, loadGroups);
    });
  }
});

document.getElementById("pinSidebarBtn").addEventListener("click", openDetachedSidebar);
document.getElementById("exportBtn").addEventListener("click", toggleExportMenu);
document.getElementById("exportMarkdownBtn").addEventListener("click", () => exportGroups("markdown"));
document.getElementById("exportJsonBtn").addEventListener("click", () => exportGroups("json"));
document.getElementById("extractMarkdownBtn").addEventListener("click", extractPageToMarkdown);

function openDetachedSidebar() {
  const width = 400;
  const height = screen.height;

  chrome.windows.create({
    url: chrome.runtime.getURL("popup.html"),
    type: "popup",
    width: width,
    height: height,
    left: screen.width - width,
    top: 0
  });
}

function toggleExportMenu() {
  const exportMenu = document.getElementById("exportMenu");
  exportMenu.style.display = exportMenu.style.display === "none" ? "block" : "none";
}

// Function to extract content from the current page and convert it to Markdown
function extractPageToMarkdown() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: convertPageToMarkdown,
    }, (results) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        alert("Error: Unable to extract content.");
        return;
      }
      
      const markdownContent = results[0].result;
      if (markdownContent) {
        downloadFile(markdownContent, "PageContent.md");
      } else {
        alert("No content found to extract.");
      }
    });
  });
}

// This function runs in the context of the active page to extract and convert content to Markdown
function convertPageToMarkdown() {
    let mainContent = document.querySelector('.v-slot-main-content');
    if (!mainContent) return 'No element with class "v-slot-main-content" found.';

    let all_text = '';
    let inTable = false;
    let tableHeaders = [];

    function traverseNodes(node) {
        if (node.nodeType === Node.ELEMENT_NODE) {
            let tag = node.tagName.toLowerCase();
            
            if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) {
                let headerLevel = parseInt(tag.charAt(1));
                let prefix = '#'.repeat(headerLevel);
                all_text += prefix + ' ' + node.textContent.trim() + '\n\n';
            } else if (tag === 'pre') {
                all_text += '```\n' + node.textContent.trim() + '\n```\n\n';
            } else if (tag === 'p') {
                all_text += node.textContent.trim() + '\n\n';
            } else if (tag === 'li') {
                all_text += '- ' + node.textContent.trim() + '\n';
            } else if (tag === 'table') {
                inTable = true;
                tableHeaders = [];
                all_text += '\n';
            } else if (tag === 'th' && inTable) {
                tableHeaders.push(node.textContent.trim());
            } else if (tag === 'tr' && inTable) {
                if (tableHeaders.length > 0) {
                    all_text += '| ' + tableHeaders.join(' | ') + ' |\n';
                    all_text += '| ' + tableHeaders.map(() => '---').join(' | ') + ' |\n';
                    tableHeaders = [];
                }
            } else if (tag === 'td' && inTable) {
                all_text += '| ' + node.textContent.trim() + ' ';
            } else if (tag === 'tr' && inTable) {
                all_text += '|\n';
            } else if (tag === 'table' && inTable) {
                inTable = false;
                all_text += '\n';
            } else if (tag === 'div' && !node.className && getComputedStyle(node).backgroundColor === 'rgb(238, 238, 238)') {
                all_text += '```\n' + node.textContent.trim() + '\n```\n\n';
            }

            Array.from(node.childNodes).forEach(traverseNodes);
        }
    }

    traverseNodes(mainContent);
    return all_text;
}

// Function to download the Markdown file
function downloadFile(content, filename) {
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
}

