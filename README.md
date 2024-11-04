# Tab Manager Pro 🚀

![Chrome Web Store](https://img.shields.io/chrome-web-store/v/eamocmhjkejbkpcmhdkamgfbfkhlhfcm?label=Chrome%20Web%20Store)
![GitHub License](https://img.shields.io/github/license/fahmifareed/tab-manager-pro?color=blue)
![GitHub Issues](https://img.shields.io/github/issues/fahmifareed/tab-manager-pro)
![GitHub Stars](https://img.shields.io/github/stars/fahmifareed/tab-manager-pro?style=social)

**Tab Manager Pro** is a browser extension that helps users manage and organize their tabs efficiently. This extension provides functionality to save, restore, and categorize tab groups, enabling better productivity and reduced memory usage by managing open tabs in groups.

---

## 🌟 Features

- 💾 **Save Tab Groups:** Organize your browsing sessions by saving groups of tabs.
- 🔄 **Restore Saved Groups:** Quickly restore saved tab groups as needed.
- ⚙️ **Customize Options:** Configure the extension to suit your preferences via the options panel.
- ⚡ **Lightweight and Fast:** Designed to use minimal resources and provide a seamless user experience.
- 📤 **Export Groups:** Easily export saved tab groups to share or backup your session.

---

## 📥 Installation

1. Clone this repository or download it as a ZIP file.
2. Open your browser's extensions page:
   - In Chrome, go to `chrome://extensions/`.
   - In Firefox, go to `about:debugging#/runtime/this-firefox`.
3. Enable "Developer mode" (in Chrome).
4. Click "Load unpacked" and select the extracted project folder.

---

## 🛠 Usage

1. 👉 Click on the extension icon to open the popup.
2. Use the options available to:
   - Save the current group of tabs.
   - Restore any previously saved tab groups.
3. 🔧 Customize the extension's behavior through the options page.

---

## 📂 Project Structure

- **manifest.json**: Defines the extension's permissions, settings, and metadata.
- **popup.html & popup.js**: The popup UI and its functionality for quick tab management.
- **background.js**: Manages the background operations, including saving and restoring tabs.
- **options.html & options.js**: Provides a settings panel for customizing the extension.
- **saved-groups.js**: Handles the logic for saving, organizing, and retrieving tab groups.
- **content/icons/**: Contains the icons used for the extension's appearance in the browser.

---

## 🧑‍💻 Development

1. Install dependencies if any are required (none specified here).
2. Make edits to any HTML, JavaScript, or CSS files.
3. Reload the extension in the browser to see your changes.

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
