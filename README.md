// Import necessary components from React and libraries
import { motion } from 'framer-motion'; // For page transition animations
import { Link } from 'react-router-dom'; // For navigation
import { ArrowLeft } from 'lucide-react'; // Icon for back button

/**
 * AboutPage Component
 * Displays detailed information about the user/portfolio owner.
 */
const AboutPage = () => {
  return (
    // Main container for the About page
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
      {/* - `max-w-3xl`: Limits the maximum width of the content area. */}
      {/* - `w-full`: Ensures it takes full width up to the max-width. */}
      {/* - `mx-auto`: Centers the container horizontally. */}
      {/* - `relative`: Positioning context for the back button. */}
      <div className="max-w-3xl w-full mx-auto relative">
        {/* Back to Home Button - Positioned top-left */}
        {/* <Link 
          to="/"
          className="absolute -top-16 left-0 flex items-center text-purple-400 hover:text-purple-300 transition-colors data-[interactive=true]"
          data-interactive="true"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link> */}
        
        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">About Me</h1>
        
        {/* Detailed description */}
        {/* TODO: Replace this placeholder text with the actual About Me content */}
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg border border-gray-700">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            This is the dedicated About Me page. Here, you can provide a much more detailed description about yourself, your background, your skills, your experience, your passions, and your career goals. 
            <br/><br/>
            Feel free to elaborate on your journey, highlight key achievements, and showcase your personality. You can structure this section with paragraphs, bullet points (if appropriate), or any format that best tells your story.
            <br/><br/>
            Remember to replace this placeholder text with your actual content!
          </p>
        </div>
        
        {/* Optional: Add subsections for skills, experience, education, etc. */}
        {/* 
        <div className="bg-gray-800 p-6 md:p-8 rounded-lg shadow-lg border border-gray-700 mt-8">
          <h2 className="text-3xl font-bold text-white mb-6">Skills</h2>
          <ul className="list-disc list-inside text-lg text-gray-400 space-y-2">
            <li>Skill 1</li>
            <li>Skill 2</li>
            <li>Skill 3</li>
          </ul>
        </div>
        */}
      </div>
    </motion.div>
  );
};

export default AboutPage;

