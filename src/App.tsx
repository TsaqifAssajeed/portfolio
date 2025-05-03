// Import necessary components from react-router-dom for defining application routes
import { Routes, Route } from 'react-router-dom';

// Import page/layout components used within the application
import InteractiveCards from './components/InteractiveCards'; // Component for the main interactive card navigation
import StickySidebar from './components/StickySidebar'; // Component for the sidebar with social media links
import ContactForm from './components/ContactForm'; // Component for the contact form section
import CustomCursor from './components/CustomCursor'; // Component providing the custom cursor effect
import CertificatesPage from './components/CertificatesPage'; // Component for the dedicated certificates page
import ProjectsPage from './components/ProjectsPage'; // Component for the dedicated projects page
import AboutPage from './components/AboutPage'; // Component for the dedicated About Me page
import TechStackPage from './components/TechStackPage'; // Component for the dedicated Tech Stack page (newly added)
import Footer from './components/Footer'; // Component for the global footer

// Logo import removed as per user request
// import logo from './assets/logo.svg';

// Import global application styles (e.g., Tailwind base, components, utilities)
import './App.css'; // Contains global styles, likely Tailwind imports

/**
 * HomePageLayout Component
 * Defines the layout structure specifically for the main landing page (route: "/").
 * It groups the components that should appear only on the home page.
 */
const HomePageLayout = () => (
  // React Fragment (<>) used to group elements without adding an extra node to the DOM
  <>
    {/* Section containing the interactive card carousel/scroll view */}
    {/* - `id="home"`: ID for potential internal navigation or styling. */}
    {/* - `w-full`: Ensures the section takes the full available width. */}
    <section id="home" className="w-full">
      {/* Renders the InteractiveCards component */}
      <InteractiveCards />
    </section>

    {/* Section containing the contact form */}
    {/* - `id="contact"`: ID for potential internal navigation or styling. */}
    {/* - `w-full`: Ensures the section takes the full available width. */}
    {/* - `py-16 px-4`: Adds vertical and horizontal padding. */}
    {/* Note: ContactForm itself now handles its internal sizing and centering */}
    <section id="contact" className="w-full">
      {/* Renders the ContactForm component */}
      <ContactForm />
    </section>
  </>
);

/**
 * Main App Component (Root Component)
 * This is the top-level component that sets up the overall application structure.
 * It includes:
 * - The main layout container.
 * - Persistent components that appear on all pages (CustomCursor, StickySidebar, Footer).
 * - Routing configuration using React Router (<Routes> and <Route>).
 */
function App() {
  // The return statement defines the JSX structure rendered by the App component.
  return (
    // Root container div for the entire application.
    // Uses Tailwind CSS classes for styling.
    // - `relative`: Establishes a positioning context for absolutely positioned children (like StickySidebar).
    // - `min-h-screen`: Ensures the container takes at least the full viewport height.
    // - `bg-gray-900 text-white`: Sets the global background color to dark gray and default text color to white.
    // - `overflow-x-hidden`: Prevents horizontal scrolling on the body/root element.
    // - `flex flex-col`: Makes the root div a flex container with vertical stacking, crucial for pushing the footer down.
    <div className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden flex flex-col">
      
      {/* Custom Cursor Component */}
      {/* Rendered here, outside the <Routes>, so it persists across all pages/routes. */}
      <CustomCursor />

      {/* Logo Component Removed */}
      {/* The logo was previously positioned absolutely here but has been removed based on user request. */}

      {/* Sticky Sidebar Component */}
      {/* Rendered here, outside the <Routes>, so it persists across all pages/routes. */}
      <StickySidebar />

      {/* Main Content Area */}
      {/* This <main> element wraps the content specific to each route. */}
      {/* - `flex flex-col items-center`: Centers content vertically and horizontally within the main area. */}
      {/* - `w-full`: Ensures the main area takes the full width available. */}
      {/* - `flex-grow`: Allows this element to expand and take up available vertical space, pushing the Footer down. */}
      <main className="flex flex-col items-center justify-center w-full flex-grow">
        
        {/* Routing Setup using React Router v6 */}
        {/* The <Routes> component acts as a container for defining individual routes. */}
        <Routes>
          {/* Route for the Home Page */}
          {/* - `path="/"`: Matches the root URL. */}
          {/* - `element={<HomePageLayout />}`: Specifies the component to render for this route. */}
          <Route path="/" element={<HomePageLayout />} />
          
          {/* Route for the Projects Page */}
          {/* - `path="/projects"`: Matches the /projects URL. */}
          {/* - `element={<ProjectsPage />}`: Renders the ProjectsPage component. */}
          <Route path="/projects" element={<ProjectsPage />} />
          
          {/* Route for the About Page */}
          {/* - `path="/about"`: Matches the /about URL. */}
          {/* - `element={<AboutPage />}`: Renders the AboutPage component. */}
          <Route path="/about" element={<AboutPage />} />
          
          {/* Route for the Certificates Page */}
          {/* - `path="/certificates"`: Matches the /certificates URL. */}
          {/* - `element={<CertificatesPage />}`: Renders the CertificatesPage component. */}
          <Route path="/certificates" element={<CertificatesPage />} />

          {/* Route for the Tech Stack Page (Newly Added) */}
          {/* - `path="/tech-stack"`: Matches the /tech-stack URL. */}
          {/* - `element={<TechStackPage />}`: Renders the TechStackPage component. */}
          <Route path="/tech-stack" element={<TechStackPage />} />
          
          {/* TODO: Implement a 404 Not Found Route */}
          {/* A catch-all route (`path="*"`) should be added to handle invalid URLs. */}
          {/* Example: <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </main>

      {/* Global Footer Component */}
      {/* Rendered here, outside <main> and <Routes>, so it appears at the bottom of every page. */}
      <Footer />

      {/* Toast Notification Container Placeholder */}
      {/* If using react-toastify or sonner for notifications, the container component */}
      {/* (e.g., <ToastContainer /> from react-toastify) should be rendered here, at the top level, */}
      {/* outside <Routes>, to be accessible globally. It's already included within ContactForm, */}
      {/* but placing it here is a common pattern if toasts are needed elsewhere. */}
      {/* Example: <ToastContainer /> */}
    </div>
  );
}

// Export the App component as the default export, making it available for import in main.tsx (or index.tsx)
export default App;

