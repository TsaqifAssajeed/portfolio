// Import necessary components from React and libraries
import { useState } from 'react'; // React hook for state management
import { motion } from 'framer-motion'; // For animations
import { Button } from '@/components/ui/button'; // Shadcn Button component
import { Link } from 'react-router-dom'; // For navigation
import { ArrowLeft } from 'lucide-react'; // Icon for back button

/**
 * @interface CertificateItem
 * Defines the structure for certificate data (using placeholder).
 */
interface CertificateItem {
  id: number;
  imageUrl: string; // Placeholder image URL
  title: string; // Optional title for the certificate
}

/**
 * CertificatesPage Component
 * Displays a grid of certificates with a "See More" functionality.
 */
const CertificatesPage = () => {
  const allCertificates: CertificateItem[] = [
    { id: 1, imageUrl: "/certificate/1.png", title: "Belajar HTML" },
  ];


  // State to manage the number of visible certificates
  const [visibleCount, setVisibleCount] = useState(6);

  // Function to show all certificates
  const showAllCertificates = () => {
    setVisibleCount(allCertificates.length);
  };

  // Slice the certificates array to get the currently visible ones
  const visibleCertificates = allCertificates.slice(0, visibleCount);

  return (
    // Main container for the certificates page
    // - `min-h-screen`: Ensures the page takes at least the full viewport height.
    // - `bg-gray-900 text-white`: Sets background and text colors.
    // - `py-24 px-4`: Vertical and horizontal padding.
    // - `flex flex-col items-center`: Centers content vertically and horizontally.
    <motion.div
      className="w-full min-h-screen bg-gray-900 text-white py-24 px-4 flex flex-col items-center"
      // Animation for page transition (fade in)
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Content container with constrained width and centering */}
      {/* - `max-w-7xl`: Limits the maximum width of the content area (wider for grid). */}
      {/* - `w-full`: Ensures it takes full width up to the max-width. */}
      {/* - `mx-auto`: Centers the container horizontally. */}
      {/* - `relative`: Positioning context for the back button. */}
      <div className="max-w-7xl w-full mx-auto relative">
        {/* Back to Home Button - Positioned top-left */}
        <Link 
          to="/"
          className="absolute -top-16 left-0 flex items-center text-purple-400 hover:text-purple-300 transition-colors data-[interactive=true]"
          data-interactive="true"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link> 

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">My Certificates</h1>
        
        {/* Grid container for certificates */}
        {/* - `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3`: Responsive grid layout. */}
        {/* - `gap-8`: Spacing between grid items. */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Map through visible certificates and render each one */}
          {visibleCertificates.map((certificate, index) => (
            // Certificate Card
            <motion.div
              key={certificate.id}
              // Styling: Background, rounded corners, shadow, border, group for hover effects
              className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 group"
              // Animation: Fade in and slide up, staggered delay
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              // Hover effect: Slight scale up
              whileHover={{ scale: 1.03 }} 
            >
              {/* Certificate Image (Placeholder) */}
              <div className="relative overflow-hidden">
                <img 
                  src={certificate.imageUrl} 
                  alt={certificate.title} 
                  // Styling: Full width, fixed height, object cover, zoom effect on group hover
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Optional: Overlay or link icon on hover (can be added later) */}
              </div>
              {/* Certificate Title (Optional) - Displayed below image */}
              <div className="p-4">
                {/* Styling: Truncate long titles */}
                <h3 className="text-lg font-medium text-white truncate">{certificate.title}</h3>
                {/* Description removed as per user request */}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* "See more certificates" button - Shown only if not all certificates are visible */}
        {visibleCount < allCertificates.length && (
          <div className="text-center mt-16">
            <Button 
              onClick={showAllCertificates} 
              variant="outline"
              // Styling: Purple theme, interactive attribute for cursor
              className="bg-purple-600 hover:bg-purple-700 text-white border-purple-700 data-[interactive=true]"
              data-interactive="true"
            >
              See More Certificates
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CertificatesPage;

