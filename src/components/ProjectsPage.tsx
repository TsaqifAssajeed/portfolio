import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button'; // Shadcn Button component
import { ExternalLink, Github } from 'lucide-react'; // Icons for links
import { Link } from 'react-router-dom'; // For navigation
import { ArrowLeft } from 'lucide-react'; // Icon for back button


// Define the structure for project data
interface ProjectItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string; // Placeholder image URL
  liveLink?: string; // Optional link to the live project demo
  sourceLink?: string; // Optional link to the source code repository
}


// Component to display the Projects page
const ProjectsPage = () => {
  // Placeholder data for projects (replace with actual data later)
  // Added placeholder liveLink and sourceLink
  const allProjects: ProjectItem[] = [
    {
      id: 1,
      title: "Database CRUD App",
      description: "Manage your database with this CRUD application. Create, Read, Update, and Delete records easily.",
      imageUrl: "/project/1.png", // Placeholder image URL
      sourceLink: "https://github.com/tsaqifassajeed/CRUD",
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "A personal portfolio website to showcase my projects and skills.",
      imageUrl: "/project/2.png", // Placeholder image URL
      liveLink: "https://tsaqifassajeed.github.io/portofolio-web/",
      sourceLink: "https://github.com/tsaqifassajeed/portfolio-web",
    },
  ];
  

  // State to manage the number of visible projects
  const [visibleCount, setVisibleCount] = useState(6);

  // Function to show all projects
  const showAllProjects = () => {
    setVisibleCount(allProjects.length);
  };
  
  // Slice the projects array to get the currently visible ones
  const visibleProjects = allProjects.slice(0, visibleCount);

  return (
    // Main container for the projects page
    <motion.div
      className="w-full min-h-screen bg-gray-900 text-white py-24 px-4 md:px-8"
      // Animation for page transition (fade in)
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
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
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-12 text-center">My Projects</h1>
      
      {/* Grid container for projects */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Map through visible projects and render each one */}
        {visibleProjects.map((project, index) => (
          <motion.div
          key={project.id}
          // Styling for each project card
          className="bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-700 flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }} // Stagger animation
          >
            {/* Project Image (Placeholder) */}
            <div className="relative aspect-video overflow-hidden"> {/* Use aspect ratio for consistent image height */}
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" // Image zoom on hover (needs group class on parent)
              />
            </div>
            {/* Project Content */}
            <div className="p-6 flex flex-col flex-grow">
              {/* Project Title */}
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              {/* Project Description */}
              <p className="text-gray-400 text-sm mb-4 flex-grow">{project.description}</p>
              {/* Links Section */}
              <div className="mt-auto flex items-center space-x-4 pt-4 border-t border-gray-700/50">
                {/* Live Demo Link (conditionally rendered) */}
                {project.liveLink && (
                  <Button 
                    asChild // Render anchor tag inside button styles
                    variant="link"
                    className="text-purple-400 hover:text-purple-300 p-0 flex items-center space-x-1 data-[interactive=true]"
                    data-interactive="true"
                  >
                     <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                       <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                     </a>
                  </Button>
                )}
                {/* Source Code Link (conditionally rendered) */}
                {project.sourceLink && (
                  <Button 
                    asChild // Render anchor tag inside button styles
                    variant="link"
                    className="text-gray-400 hover:text-gray-300 p-0 flex items-center space-x-1 data-[interactive=true]"
                    data-interactive="true"
                  >
                     <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                       <Github className="w-4 h-4 mr-1" /> Source
                     </a>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}

{/*Coming Soon Section - tampil hanya jika semua project sudah terlihat*/}
{visibleCount >= allProjects.length && (
  <motion.div
    className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 flex flex-col transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-purple-500/20"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    {/* kotak coming soon */}
    <div className="bg-gray-700 text-xl font-semibold text-white mb-2 p-10 rounded-lg text-center mt-10">
      Coming Soon!
    </div>

    {/* Saran */}
    <p className="text-gray-400 text-sm mb-5 text-center">
      Punya ide proyek seru? tulis ide kamu dibawah ini!
    </p>

    {/* Garis halus */}
    <div className='mt-20'>
      <div className="border-t border-gray-700/50 mt-4 pt-4 text-center">
        {/* Link di bawah garis */}
        <a
          href="mailto:youremail@example.com"
          className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Me
        </a>
      </div>
    </div>
  </motion.div>
)}
      </motion.div>

      {/* "See more projects" button */}
      {visibleCount < allProjects.length && (
        <div className="text-center mt-16">
          <Button 
            onClick={showAllProjects} 
            variant="outline"
            className="bg-purple-600 hover:bg-purple-700 text-white border-purple-700 data-[interactive=true]"
            data-interactive="true"
          >
            See More Projects
          </Button>
        </div>
      )}

      </div>
    </motion.div>
  );
};
export default ProjectsPage;

