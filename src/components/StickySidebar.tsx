import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Globe, FileText } from 'lucide-react'; // Icons for social links

import { Button } from '@/components/ui/button'; // Shadcn Button component
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet" // Shadcn Sheet component for mobile drawer
import { useIsMobile } from '@/hooks/use-mobile'; // Hook to detect mobile devices

// Array containing social link data (icon, href, label)
const socialLinks = [
  { id: 'cv', icon: FileText, href: '#', label: 'CV' }, // TODO: Replace '#' with actual CV link
  { id: 'github', icon: Github, href: 'https://github.com/tsaqifassajeed', label: 'GitHub' }, // TODO: Replace '#' with actual GitHub link
  { id: 'website', icon: Globe, href: '#', label: 'Website' }, // TODO: Replace '#' with actual Website link
  { id: 'linkedin', icon: Linkedin, href: '#', label: 'LinkedIn' }, // TODO: Replace '#' with actual LinkedIn link
];

// Component for the sticky sidebar with social links and animations
const StickySidebar = () => {
  // State to track if the sidebar is being hovered over (for desktop view)
  const [isHovered, setIsHovered] = useState(false);
  // Hook to check if the current viewport is mobile size
  const isMobile = useIsMobile();

  // Framer Motion variants for the sidebar container (currently unused, but can be extended)
  const sidebarVariants = {
    initial: {},
    hover: {},
  };

  // Framer Motion variants for the social icons (scale effect on hover)
  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, transition: { type: 'spring', stiffness: 300 } },
  };

  // Conditional rendering based on device type (mobile vs. desktop)
  if (isMobile) {
    // Mobile/Tablet View: Render a Sheet (drawer) component
    return (
      <Sheet>
        {/* Trigger button for the drawer, fixed at bottom-right */}
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="fixed bottom-4 right-4 z-50 bg-gray-800/80 text-white hover:bg-gray-700/90 border-purple-500">
            {/* Simple hamburger menu icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
          </Button>
        </SheetTrigger>
        {/* Content of the drawer */}
        <SheetContent side="right" className="bg-gray-900/95 border-l border-purple-500 text-white w-[250px] sm:w-[300px]">
          <SheetHeader>
            <SheetTitle className="text-purple-400">Connect</SheetTitle>
          </SheetHeader>
          {/* List of social links inside the drawer */}
          <div className="flex flex-col space-y-4 mt-8">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                target="_blank" // Open link in a new tab
                rel="noopener noreferrer" // Security best practice for target="_blank"
                className="flex items-center space-x-3 p-3 rounded-md hover:bg-purple-900/50 transition-colors duration-200"
              >
                <link.icon className="w-6 h-6 text-white" />
                <span className="text-lg">{link.label}</span>
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop View: Render the sticky sidebar
  return (
    <motion.div
      // Styling for the sidebar container: fixed position, centered vertically, styling
      className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50 p-1 rounded-lg overflow-hidden"
      // Dynamically set the CSS variable for glow color based on hover state
      style={{ '--glow-color': isHovered ? 'var(--tw-color-purple-500)' : 'var(--tw-color-blue-500)' } as React.CSSProperties}
      // Update hover state on mouse enter/leave
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // Apply sidebar variants (currently empty)
      variants={sidebarVariants}
      initial="initial"
      whileHover="hover"
    >
      {/* Animated Border using conic-gradient and CSS animation */}
      <motion.div
        className="absolute inset-0 border-2 rounded-lg pointer-events-none"
        style={{
          borderColor: 'transparent', // Membuat border dasar transparan
          borderImage: `conic-gradient(from var(--angle), transparent, var(--glow-color), transparent) 1`,
          animation: `spin ${isHovered ? '2s' : '10s'} linear infinite`,
        }}
        // Perbaikan tipe untuk animate
        animate={{ '--angle': isHovered ? '360deg' : '0deg' } as Record<string, string>}
        transition={{ duration: isHovered ? 2 : 10, repeat: Infinity, ease: "linear" }}
      />

      {/* TODO: Particle Effect Placeholder - Requires a more complex implementation (e.g., using canvas or another library) */}
      {/* <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-lg"> ... particles ... </div> */}

      {/* Inner Content container with background and blur */}
      <div className="relative flex flex-col items-center space-y-5 bg-gray-900/80 backdrop-blur-sm p-4 rounded-md">
        {/* Map through social links and render animated icons */}
        {socialLinks.map((link) => (
          <motion.a
            key={link.id}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group" // Group for hover effects
            variants={iconVariants} // Apply icon animation variants
            whileHover="hover"
            initial="initial"
          >
            {/* Social link icon */}
            <link.icon className="w-8 h-8 text-white transition-colors duration-200 group-hover:text-[var(--glow-color)]" />
            {/* Glow effect element shown on icon hover */}
            <span
              className="absolute -inset-1.5 bg-[var(--glow-color)] rounded-full blur-md opacity-0 group-hover:opacity-75 transition-opacity duration-300 -z-10"
            />
          </motion.a>
        ))}
      </div>

      {/* Inline CSS for the @property and @keyframes needed for the animated border */}
      {/* Note: Removed 'jsx' and 'global' attributes as they caused build errors */}
      <style>{`
        /* Define the --angle custom property for animation */
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        /* Define the keyframes for the spinning animation */
        @keyframes spin {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }
      `}</style>
    </motion.div>
  );
};

export default StickySidebar;

