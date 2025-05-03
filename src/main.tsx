import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import App from './App.tsx';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Ensure the root element exists before rendering
if (rootElement) {
  // Create a React root
  createRoot(rootElement).render(
    // Enable Strict Mode for highlighting potential problems
    <StrictMode>
      {/* Wrap the entire application with BrowserRouter to enable routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
} else {
  // Log an error if the root element is not found
  console.error('Failed to find the root element');
}

