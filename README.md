# Palace Library Registry Viewer

A responsive web application for browsing and searching libraries from the Palace Project registry. Built with React, TypeScript, and Tailwind CSS, optimized for mobile devices.

## Features

- 🔍 **Search Libraries** - Search by library name or description
- 🗺️ **State Filtering** - Filter libraries by US state
- 🌙 **Dark Mode Support** - Toggle between light and dark themes via URL parameter
- 📱 **Mobile Optimized** - Responsive design optimized for mobile devices
- ⚡ **Fast Loading** - Efficient data fetching with loading states
- 🎨 **Clean UI** - Modern interface with Tailwind CSS styling
- ♿ **Accessible** - Proper ARIA labels and semantic HTML

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **Palace Project API** - Library data source

## Prerequisites

- **Node.js** (version 16 or higher)
- **npm** (comes with Node.js)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd palace_registry_ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   - Navigate to `http://localhost:3000`
   - For dark mode: `http://localhost:3000/?theme=dark`

## Live Demo

🌐 **[View Live Demo on GitHub Pages](https://jamesenglish1028.github.io/https-github.com-JamesEnglish1028-palace_registry_ui/)**

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Building for Production

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` directory.

## Usage

### Basic Usage
- Browse all available Palace Project libraries
- Use the search box to find libraries by name or description
- Select a state from the dropdown to filter results
- Click "Add Library" to access a library's catalog

### Dark Mode
Add `?theme=dark` to the URL to enable dark mode:
```
http://localhost:3000/?theme=dark
```

### Native App Integration
Add `?native=true` to enable native app communication mode:
```
http://localhost:3000/?native=true
```

When in native mode, the "Add Library" button will attempt to communicate with the native app using multiple methods:
- **Custom URL Scheme**: `palace://addLibrary?url=...&name=...`
- **PostMessage**: Messages sent to parent frame (WebView)
- **iOS WebKit Bridge**: `webkit.messageHandlers.palaceApp`
- **Android Interface**: `window.Android.addLibrary()`

### Mobile Usage
The app is optimized for mobile devices with:
- Touch-friendly interface
- Responsive layout
- Properly sized touch targets
- Mobile-optimized typography

## Project Structure

```
├── components/
│   ├── LibraryCard.tsx    # Individual library display component
│   └── SearchInput.tsx    # Search input component
├── services/
│   └── libraryService.ts  # API service for fetching library data
├── public/
│   └── palace-logo.png    # Palace Project logo
├── App.tsx               # Main application component
├── types.ts              # TypeScript type definitions
├── index.tsx             # Application entry point
└── index.html           # HTML template
```

## API Integration

The app fetches library data from the Palace Project registry API:
- **Endpoint:** `https://registry.palaceproject.io/libraries`
- **CORS Proxy:** Uses `corsproxy.io` to handle CORS restrictions
- **Data Format:** OPDS catalog format with library metadata

## Native App Integration

### For Native App Developers

The web app can communicate with native mobile apps through several methods:

#### 1. URL Parameters
- Add `?native=true` to enable native app mode
- Combine with theme: `?native=true&theme=dark`

#### 2. Communication Methods

**Custom URL Scheme:**
```javascript
palace://addLibrary?url=<catalogUrl>&name=<libraryName>
```

**iOS WebKit Message Handler:**
```javascript
window.webkit.messageHandlers.palaceApp.postMessage({
  action: 'addLibrary',
  url: catalogUrl,
  name: libraryName
});
```

**Android WebView Interface:**
```javascript
window.Android.addLibrary(catalogUrl, libraryName);
```

**PostMessage (WebView):**
```javascript
window.parent.postMessage({
  type: 'ADD_LIBRARY',
  url: catalogUrl,
  name: libraryName,
  timestamp: Date.now()
}, '*');
```

#### 3. Native App Setup

**iOS (Swift):**
```swift
// Register URL scheme in Info.plist
// Handle in AppDelegate or SceneDelegate
func application(_ app: UIApplication, open url: URL, options: [UIApplication.OpenURLOptionsKey : Any] = [:]) -> Bool {
    if url.scheme == "palace" && url.host == "addLibrary" {
        // Parse URL parameters and add library
        return true
    }
    return false
}

// WebView message handler
webView.configuration.userContentController.add(self, name: "palaceApp")
```

**Android (Kotlin):**
```kotlin
// WebView JavaScript interface
webView.addJavascriptInterface(WebAppInterface(), "Android")

class WebAppInterface {
    @JavascriptInterface
    fun addLibrary(url: String, name: String) {
        // Handle library addition
    }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Palace Project ecosystem. Please refer to the Palace Project licensing terms.

## Support

For issues related to:
- **This app:** Create an issue in this repository
- **Palace Project:** Visit [The Palace Project](https://thepalaceproject.org)
- **Library access:** Contact your local library directly
