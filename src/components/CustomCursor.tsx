import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion'; // Import Variants type
import type { Property } from 'csstype'; // Import csstype for CSS property types

// Component to render a custom cursor with an inverse color effect
const CustomCursor = () => {
  // State to store the cursor position (x, y coordinates)
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to track if the cursor is hovering over an interactive element
  const [isPointer, setIsPointer] = useState(false);
  // State to track if the cursor is visible within the viewport
  const [isVisible, setIsVisible] = useState(true);

  // Effect hook to add and remove event listeners for cursor tracking
  useEffect(() => {
    // Handler for mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      // Update cursor position state
      setPosition({ x: e.clientX, y: e.clientY });

      // Check if the element under the cursor is interactive
      const target = e.target as HTMLElement;
      // Check common interactive elements or elements with data-interactive attribute
      if (target.closest('a, button, [role="button"], input, textarea, select, [data-interactive="true"]')) {
        // Set pointer state to true if interactive
        setIsPointer(true);
      } else {
        // Set pointer state to false otherwise
        setIsPointer(false);
      }
    };

    // Handler for mouse entering the document body
    const handleMouseEnter = () => {
        setIsVisible(true);
    };

    // Handler for mouse leaving the document body
    const handleMouseLeave = () => {
        setIsVisible(false);
    };

    // Add event listeners when the component mounts
    document.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    // Hide the default system cursor
    document.body.style.cursor = 'none';

    // Cleanup function to remove event listeners and restore default cursor when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      // Restore default cursor visibility
      document.body.style.cursor = 'auto';
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Define variants for the cursor animation based on state (default or pointer)
  const cursorSizeDefault = 24; // Increased default size
  const cursorSizePointer = 36; // Increased pointer size

  // Define the cursor variants with explicit typing for mixBlendMode
  const cursorVariants: Variants = {
    // Default cursor style
    default: {
      x: position.x - cursorSizeDefault / 2, // Center the cursor horizontally
      y: position.y - cursorSizeDefault / 2, // Center the cursor vertically
      width: cursorSizeDefault,
      height: cursorSizeDefault,
      backgroundColor: 'white', // Base color for mix-blend-mode
      // Explicitly type mixBlendMode using csstype
      mixBlendMode: 'difference' as Property.MixBlendMode,
      borderRadius: '50%',
      transition: { type: 'spring', stiffness: 500, damping: 30, mass: 0.5 } // Smooth spring animation
    },
    // Cursor style when hovering over interactive elements
    pointer: {
      x: position.x - cursorSizePointer / 2, // Center the larger cursor horizontally
      y: position.y - cursorSizePointer / 2, // Center the larger cursor vertically
      width: cursorSizePointer,
      height: cursorSizePointer,
      backgroundColor: 'white', // Base color for mix-blend-mode
      // Explicitly type mixBlendMode using csstype
      mixBlendMode: 'difference' as Property.MixBlendMode,
      borderRadius: '50%',
      scale: 1.1, // Slightly larger scale on hover
      transition: { type: 'spring', stiffness: 400, damping: 25 } // Smooth spring animation
    }
  };

  // Do not render the cursor if it's not visible (e.g., mouse outside window)
  if (!isVisible) return null;

  // Render the custom cursor element using framer-motion for animation
  return (
    <motion.div
      // Apply fixed positioning, pointer-events none, and high z-index
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      // Apply animation variants based on the cursor state
      variants={cursorVariants}
      // Animate between 'default' and 'pointer' states
      animate={isPointer ? 'pointer' : 'default'}
      // Ensure initial style is set correctly (needed for mix-blend-mode)
      // Explicitly type mixBlendMode in the style prop as well
      style={{ backgroundColor: 'white', mixBlendMode: 'difference' as Property.MixBlendMode }}
    />
    // Removed the trailing dot for simplicity with the new effect
  );
};

export default CustomCursor;

