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
