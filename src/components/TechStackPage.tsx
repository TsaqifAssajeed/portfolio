// Import necessary components and hooks from React and libraries
import { motion } from 'framer-motion'; // For page transition animations
import { Link } from 'react-router-dom'; // For navigation
import { ArrowLeft } from 'lucide-react'; // Icon for back button

// Import specific icons from react-icons
// Using a variety of icon sets (e.g., Si for Simple Icons, Fa for Font Awesome, Di for Devicons)
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiGit,
  SiVite,
  SiNextdotjs,
  SiFlask,
  SiMysql,
  SiJavascript
} from 'react-icons/si';

/**
 * @interface TechItem
 * Defines the structure for each technology item in the stack.
 */
interface TechItem {
  id: number; // Unique identifier
  name: string; // Name of the technology/framework
  icon: React.ComponentType<{ size?: number | string; color?: string }>; // Icon component from react-icons
  color: string; // Characteristic color (hex code)
}

/**
 * TechStackPage Component
 * Displays a grid of technologies and frameworks used by the user.
 */
const TechStackPage = () => {
  // Define the list of technologies with their icons and colors
  // TODO: Customize this list with the actual tech stack
  const techStack: TechItem[] = [
    { id: 1, name: 'React', icon: SiReact, color: '#61DAFB' },
    { id: 2, name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
    { id: 3, name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { id: 4, name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    { id: 5, name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
    { id: 6, name: 'Vite', icon: SiVite, color: '#646CFF' },
    { id: 7, name: 'Next.js', icon: SiNextdotjs, color: '#000000' }, // Color is black, text will be white
    { id: 8, name: 'Python', icon: SiPython, color: '#3776AB' },
    { id: 9, name: 'Flask', icon: SiFlask, color: '#000000' }, // Color is black, text will be white
    { id: 10, name: 'MySQL', icon: SiMysql, color: '#4479A1' },
    { id: 11, name: 'Docker', icon: SiDocker, color: '#2496ED' },
    { id: 12, name: 'Git', icon: SiGit, color: '#F05032' },
  ];

  return (
    // Main container for the Tech Stack page
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
      {/* - `max-w-4xl`: Limits the maximum width of the content area. */}
      {/* - `w-full`: Ensures it takes full width up to the max-width. */}
      {/* - `mx-auto`: Centers the container horizontally. */}
      {/* - `relative`: Positioning context for the back button. */}
      <div className="max-w-4xl w-full mx-auto relative">
        {/* Back to Home Button - Positioned top-left */}
        <Link 
          to="/"
          className="absolute -top-12 left-0 flex items-center text-purple-400 hover:text-purple-300 transition-colors data-[interactive=true] mb-4 md:mb-0"
          data-interactive="true"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Home
        </Link>

        {/* Page Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">My Tech Stack</h1>
        
        {/* Grid container for tech stack items */}
        {/* - `grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5`: Responsive grid layout. */}
        {/* - `gap-6 md:gap-8`: Spacing between grid items. */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Map through tech stack items and render each one */}
          {techStack.map((tech, index) => (
            // Tech Item Card
            <motion.div
              key={tech.id}
              // Styling: Background, rounded corners, shadow, border, flex layout, centering
              className="bg-gray-800 rounded-lg shadow-lg p-4 md:p-6 border border-gray-700 flex flex-col items-center justify-center aspect-square transform transition-transform duration-300 hover:scale-105 hover:shadow-purple-500/20"
              // Animation: Fade in and slide up, staggered delay
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              // Add data-interactive attribute for custom cursor effect
              data-interactive="true"
            >
              {/* Tech Icon - Size adjusted for responsiveness */}
              <tech.icon size={window.innerWidth < 768 ? 48 : 64} color={tech.color} />
              {/* Tech Name - Text size adjusted, centered */}
              <p className={`mt-3 text-sm md:text-base font-medium text-center ${tech.color === '#000000' ? 'text-white' : 'text-gray-300'}`}>
                {tech.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TechStackPage;

