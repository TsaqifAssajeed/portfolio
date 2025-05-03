// Import necessary hooks and components from React and libraries
import { useState } from 'react'; // React hook for managing component state (e.g., activeIndex, direction)
import { motion, AnimatePresence } from 'framer-motion'; // Libraries for creating animations and managing enter/exit animations
// Import icons from lucide-react library for navigation arrows and card representations
import { ArrowLeftCircle, ArrowRightCircle, User, FolderGit2, Award, Layers } from 'lucide-react'; // Added Layers icon for Tech Stack
import { Button } from '@/components/ui/button'; // Custom Button component from shadcn/ui library
import { useNavigate } from 'react-router-dom'; // Hook from react-router-dom for programmatic navigation between pages
import { useIsMobile } from '@/hooks/use-mobile'; // Custom hook to detect if the current viewport is considered mobile

/**
 * @interface CardDataItem
 * Defines the structure (TypeScript interface) for the data associated with each interactive card.
 * This ensures type safety and consistency for card data objects.
 */
interface CardDataItem {
  id: number; // Unique identifier for the card, used as a key in React lists
  title: string; // Title displayed prominently on the card
  content: string; // Short description or content for the card (kept for potential future use, currently not displayed on non-profile cards)
  type: 'profile' | 'about' | 'projects' | 'certificates' | 'tech-stack' | 'contact'; // Type category for the card, used for conditional rendering/styling (e.g., profile card has different layout)
  link: string; // The URL path (route) this card navigates to when clicked
  icon?: React.ComponentType<{ className?: string }>; // Optional icon component (e.g., from lucide-react) to display on the card
}

/**
 * InteractiveCards Component
 * This is the main component for displaying the interactive navigation cards.
 * It renders differently based on whether the device is mobile or desktop.
 * - Mobile: A horizontal scroll view with snap-to-center behavior and fade effects on the edges.
 * - Desktop: An animated carousel with navigation arrows and blurred side cards.
 */
const InteractiveCards = () => {
  // Initialize the navigate function from react-router-dom hook for page transitions
  const navigate = useNavigate();
  // Determine if the current view is mobile using the custom hook
  const isMobile = useIsMobile();
  // State variable to keep track of the index of the currently centered card in the desktop carousel
  // Initialized to 0, making the 'Profile' card (index 0) the default view
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Array containing the data objects for each card to be displayed.
  // Each object must conform to the CardDataItem interface.
  const cardData: CardDataItem[] = [
    // Card data objects: id, title, content (placeholder), type, link (route), icon component
    { id: 1, title: 'Profile', content: '', type: 'profile', link: '/', icon: User }, // Profile card (index 0)
    { id: 2, title: 'About Me', content: 'Learn more about my background and skills.', type: 'about', link: '/about', icon: User },
    { id: 3, title: 'Projects', content: 'Explore the projects I have worked on.', type: 'projects', link: '/projects', icon: FolderGit2 },
    { id: 4, title: 'Certificates', content: 'View my certifications and qualifications.', type: 'certificates', link: '/certificates', icon: Award },
    { id: 5, title: 'Tech Stack', content: 'Discover the technologies I use.', type: 'tech-stack', link: '/tech-stack', icon: Layers }, // Newly added Tech Stack card
    // { id: 6, title: 'Contact', content: 'Get in touch with me.', type: 'contact', link: '/contact', icon: Mail }, // Example contact card (commented out)
  ];

  // --- Desktop Carousel Specific Logic ---

  /**
   * goToNext (Desktop only function)
   * Calculates the index of the *next* card in the sequence and triggers navigation.
   * It handles wrapping around to the beginning if the current card is the last one.
   */
  const goToNext = (): void => {
    // Calculate the next index using the modulo operator to ensure it wraps around
    const nextIndex = (activeIndex + 1) % cardData.length;
    // Call the handleNavigation function to update the state
    handleNavigation(nextIndex);
  };

  /**
   * goToPrev (Desktop only function)
   * Calculates the index of the *previous* card in the sequence and triggers navigation.
   * It handles wrapping around to the end if the current card is the first one.
   */
  const goToPrev = (): void => {
    // Calculate the previous index, adding cardData.length before modulo to handle negative results correctly
    const prevIndex = (activeIndex - 1 + cardData.length) % cardData.length;
    // Call the handleNavigation function to update the state
    handleNavigation(prevIndex);
  };

  /**
   * @constant cardVariants (Desktop only constant)
   * Defines animation states (variants) for Framer Motion, used specifically in the desktop carousel.
   * These variants control the appearance (position, opacity, scale, blur) and transition of cards
   * as they enter the view, become the center card, exit the view, or sit on the sides.
   */
  const cardVariants = {
    // 'enter': Defines the initial state when a card animates *into* view (from left or right).
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300, // Start position off-screen (300px right if direction > 0, -300px left otherwise)
      opacity: 0, // Start fully transparent
      scale: 0.8, // Start slightly smaller
      filter: 'blur(4px)', // Start blurred
      zIndex: 1, // Lower z-index than the center card to appear behind it
    }),
    // 'center': Defines the state for the active card positioned in the middle of the carousel.
    center: {
      x: 0, // Center position horizontally
      opacity: 1, // Fully opaque
      scale: 1, // Normal size
      filter: 'blur(0px)', // Not blurred
      zIndex: 2, // Higher z-index to appear on top of side cards
      transition: { type: 'spring', stiffness: 300, damping: 30 } // Use a spring animation for a smooth, bouncy effect
    },
    // 'exit': Defines the state when a card animates *out* of view (to left or right).
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300, // Exit position off-screen (opposite direction of entry)
      opacity: 0, // Fade out
      scale: 0.8, // Shrink slightly
      filter: 'blur(4px)', // Become blurred
      zIndex: 1, // Lower z-index
      transition: { duration: 0.3 } // Use a simple duration-based transition for exit
    }),
    // 'side': Defines the state for the cards visible on the left or right of the center card.
    side: (position: 'left' | 'right') => ({
      x: position === 'left' ? -180 : 180, // Position slightly off-center (-180px left, 180px right)
      opacity: 0.5, // Partially transparent
      scale: 0.85, // Slightly smaller than center card
      filter: 'blur(3px)', // Blurred appearance
      zIndex: 1, // Lower z-index than the center card
      transition: { type: 'spring', stiffness: 300, damping: 30 } // Use spring animation for smooth positioning
    })
  };

  // State variable to track the direction of navigation (-1 for previous, 1 for next, 0 for initial)
  // This is passed as a 'custom' prop to Framer Motion variants to control animation direction (enter/exit).
  const [direction, setDirection] = useState<number>(0);

  /**
   * handleNavigation (Desktop only function)
   * Updates the navigation direction state and the active card index state.
   * This function is called by goToNext and goToPrev.
   * @param {number} newIndex - The index of the card to navigate to.
   */
  const handleNavigation = (newIndex: number): void => {
    // Determine the direction of navigation based on the difference between new and current index
    setDirection(newIndex > activeIndex ? 1 : (newIndex < activeIndex ? -1 : 0));
    // Update the active index state to the new index
    setActiveIndex(newIndex);
  }

  // Calculate the indices for the previous and next cards relative to the current activeIndex.
  // These are used to determine which cards to render in the desktop carousel (center, left neighbor, right neighbor).
  const prevIndex: number = (activeIndex - 1 + cardData.length) % cardData.length; // Index of the card to the left
  const nextIndex: number = (activeIndex + 1) % cardData.length; // Index of the card to the right

  // --- Render Logic ---
  // The return statement defines the JSX structure of the component.
  return (
    // Main container div for the entire InteractiveCards section.
    // Uses Tailwind CSS classes for styling and layout.
    // - `flex flex-col items-center justify-center`: Centers content vertically and horizontally.
    // - `min-h-[70vh] md:min-h-screen`: Sets minimum height (70% of viewport height on mobile, full screen height on medium screens and up).
    // - `bg-gray-900 text-white`: Sets the background color to dark gray and default text color to white.
    // - `p-4 relative`: Adds padding and establishes a relative positioning context for absolutely positioned children.
    // - Conditional padding-top (`pt-16`) for mobile to create space for the title above the cards.
    <div className={`flex flex-col items-center justify-center min-h-[70vh] md:min-h-screen bg-gray-900 text-white p-4 relative ${isMobile ? 'pt-16' : ''}`}>
      
      {/* Large "Hello World" Title displayed above the card section */}
      {/* - `text-5xl md:text-7xl`: Responsive text size (large on mobile, larger on desktop). */}
      {/* - `font-bold text-center`: Bold font weight and centered text. */}
      {/* - `mb-8 md:mb-12`: Responsive bottom margin. */}
      <h1 className="text-5xl md:text-7xl font-bold text-center mb-8 md:mb-12">
        Hello World
      </h1>

      {/* Conditional Rendering: Renders different layouts based on the isMobile state. */}
      {isMobile ? (
        // --- Mobile Layout: Horizontal Scroll View --- 
        // Wrapper div needed for positioning the fade overlay effects.
        // - `relative w-full`: Takes full width and creates a positioning context.
        <div className="relative w-full">
          {/* Left Fade Overlay: Creates a gradient fade effect on the left edge of the scroll area. */}
          {/* - `absolute ...`: Positions the overlay absolutely within the relative parent. */}
          {/* - `w-16`: Sets the width of the fade effect. */}
          {/* - `bg-gradient-to-r from-gray-900 to-transparent`: Creates a horizontal gradient from the background color to transparent. */}
          {/* - `z-10 pointer-events-none`: Ensures the overlay is above the cards but doesn't block clicks. */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10 pointer-events-none"></div>
          {/* Right Fade Overlay: Creates a gradient fade effect on the right edge. */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10 pointer-events-none"></div>

          {/* Scrollable Container for the cards */}
          {/* - `flex space-x-4`: Lays out cards horizontally with spacing between them. */}
          {/* - `overflow-x-auto`: Enables horizontal scrolling. */}
          {/* - `py-4`: Adds vertical padding. */}
          {/* - `scrollbar-hide`: Hides the browser's default scrollbar (requires tailwind-scrollbar-hide plugin or custom CSS). */}
          {/* - `w-full`: Takes the full width of its parent. */}
          {/* - `snap-x snap-mandatory`: Enables horizontal scroll snapping, forcing the scroll to stop at defined snap points. */}
          {/* - `px-[calc(50%-8rem)]`: Adds horizontal padding calculated to allow the first and last cards to snap to the center (card width w-64 = 16rem, so half is 8rem). */}
          <div className="flex space-x-4 overflow-x-auto py-4 scrollbar-hide w-full snap-x snap-mandatory px-[calc(50%-8rem)]">
            {/* Map through the cardData array to render each card */}
            {cardData.map((card, index) => (
              // Card container using Framer Motion for entry animation
              <motion.div
                key={card.id} // Unique key for React list rendering
                // Styling classes for mobile cards
                // - `snap-center`: Defines this element as a snap point for the scroll container.
                // - `flex-shrink-0`: Prevents cards from shrinking to fit the container.
                // - `w-64 h-80`: Sets a fixed width and height for the cards.
                // - `bg-gray-800 rounded-lg shadow-xl border border-gray-700`: Basic card appearance (background, rounded corners, shadow, border).
                // - `flex flex-col`: Arranges card content vertically.
                // - `cursor-pointer`: Changes cursor to indicate clickability.
                // - `transform transition-transform duration-300 hover:scale-105`: Adds a slight scale-up effect on hover.
                // - Conditional padding: `p-0 overflow-hidden` for profile card (image fills), `p-6` for others.
                className={`snap-center flex-shrink-0 w-64 h-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col cursor-pointer transform transition-transform duration-300 hover:scale-105 ${card.type === 'profile' ? 'p-0 overflow-hidden' : 'p-6'}`}
                // Framer Motion animation properties
                initial={{ opacity: 0, y: 20 }} // Initial state: transparent and slightly below final position
                animate={{ opacity: 1, y: 0 }} // Animate to: fully opaque and final position
                transition={{ duration: 0.3, delay: index * 0.05 }} // Animation duration and staggered delay based on index
                // Click handler: Navigates to the card's specified link using react-router
                onClick={() => navigate(card.link)}
                // Add data-interactive attribute for potential custom cursor effects
                data-interactive="true"
              >
                {/* Conditional Rendering for Card Content based on card.type */}
                {card.type === 'profile' ? (
                  // Profile Card Layout: Displays only a placeholder image/background
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    {/* Placeholder text - replace with an actual <img> tag when image is available */}
                    {/*<span className="text-gray-500 text-sm">Profile Image Placeholder</span>*/}
                    <img
      src="/profil.jpeg" // Ganti dengan path sebenarnya ke gambar profil kamu
      alt="Profile"
      className="w-full h-full object-cover"
    />
                  </div>
                ) : (
                  // Layout for Other Cards (About, Projects, Certificates, Tech Stack)
                  <>
                    {/* Card Title */}
                    <h3 className="text-xl font-bold mb-4 text-center">{card.title}</h3>
                    {/* Content paragraph removed as per user request */}
                    {/* Centered Icon Area */}
                    {/* - `flex-grow flex items-center justify-center`: Makes the div take remaining vertical space and centers the icon within it. */}
                    {card.icon && (
                      <div className="flex-grow flex items-center justify-center">
                        {/* Render the icon component passed in cardData */}
                        {/* - `h-24 w-24`: Sets the size of the icon. */}
                        {/* - `text-purple-400 opacity-70`: Sets the icon color and opacity. */}
                        <card.icon className="h-24 w-24 text-purple-400 opacity-70" />
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        // --- Desktop Layout: Animated Carousel View --- 
        // Container for the carousel, including cards and navigation buttons.
        // - `relative flex items-center justify-center`: Centers the carousel area and provides positioning context.
        // - `w-full max-w-5xl`: Takes full width up to a maximum of 5xl.
        // - `h-[400px]`: Sets a fixed height for the carousel area.
        <div className="relative flex items-center justify-center w-full max-w-5xl h-[400px]">
          {/* Left Navigation Button (Desktop) */}
          {/* - No motion.div wrapper to prevent unwanted hover effects from parent. */}
          <Button
            variant="outline" // Style variant for the button
            size="icon" // Size variant for icon-only button
            // Styling classes
            // - `absolute left-16 md:left-24`: Absolute positioning, responsive distance from the left edge.
            // - `top-1/2 transform -translate-y-1/2`: Vertically centers the button.
            // - `z-10`: Ensures button is above the side cards.
            // - `bg-purple-600/70 hover:bg-purple-500/90`: Background color with opacity and hover effect.
            // - `text-white rounded-full border-purple-500/80 shadow-lg`: Text color, shape, border, shadow.
            // - `transition-colors duration-300`: Smooth transition only for colors (removed transform transition).
            // - `data-[interactive=true]`: Attribute for custom cursor.
            className="absolute left-16 md:left-24 top-1/2 transform -translate-y-1/2 z-10 bg-purple-600/70 hover:bg-purple-500/90 text-white rounded-full border-purple-500/80 shadow-lg transition-colors duration-300 data-[interactive=true]"
            // Click handler: Calls the goToPrev function
            onClick={goToPrev}
            data-interactive="true"
          >
            {/* Left arrow icon inside the button */}
            <ArrowLeftCircle className="h-8 w-8" />
          </Button>

          {/* Card Display Area (Desktop): Contains the animated cards */}
          {/* - `relative w-72 h-96`: Sets dimensions and positioning context for the motion.div cards. */}
          {/* - `flex items-center justify-center`: Centers the active card within this area. */}
          <div className="relative w-72 h-96 flex items-center justify-center">
            {/* AnimatePresence: Manages the mounting and unmounting animations of cards */}
            {/* - `initial={false}`: Prevents initial animation on first load. */}
            {/* - `custom={direction}`: Passes the navigation direction to variants for enter/exit animations. */}
            <AnimatePresence initial={false} custom={direction}>
              {
                // Render only the active card and its immediate neighbors (previous and next)
                [prevIndex, activeIndex, nextIndex].map((index) => {
                  // Get the card data for the current index
                  const card = cardData[index];
                  // Check if the current card is a neighbor (prev or next)
                  // const isNeighbor = index === prevIndex || index === nextIndex; // Removed as unused
                  // Skip rendering if the card is neither the active one nor a direct neighbor (optimization)
                  // Note: This logic might need adjustment if more side cards should be visible.
                  // if (index !== activeIndex && !isNeighbor) return null;

                  // Render the card using Framer Motion
                  return (
                    <motion.div
                      key={card.id} // Unique key
                      // Base styling classes for desktop cards
                      // - `absolute w-72 h-96`: Positions cards absolutely within the display area with fixed dimensions.
                      // - `bg-gray-800 rounded-lg shadow-xl border border-gray-700`: Basic card appearance.
                      // - `flex flex-col`: Arranges content vertically.
                      // - Conditional padding: `p-0 overflow-hidden` for profile, `p-6` for others.
                      // - Conditional cursor: `cursor-default` for active card, `cursor-pointer` for side cards.
                      className={`absolute w-72 h-96 bg-gray-800 rounded-lg shadow-xl border border-gray-700 flex flex-col ${card.type === 'profile' ? 'p-0 overflow-hidden' : 'p-6'} ${index === activeIndex ? 'cursor-default' : 'cursor-pointer'}`}
                      // Animation variants defined in cardVariants constant
                      variants={cardVariants}
                      // Custom prop passed to variants: 0 for center, 1 for right side, -1 for left side
                      custom={index === activeIndex ? 0 : (index === nextIndex ? 1 : -1)}
                      // Initial animation state ('enter')
                      initial="enter"
                      // Target animation state: 'center' if active, 'side' (left or right) if neighbor
                      animate={index === activeIndex ? 'center' : cardVariants.side(index === prevIndex ? 'left' : 'right')}
                      // Exit animation state ('exit')
                      exit="exit"
                      // Click handler for cards
                      onClick={() => { 
                        // If a side card is clicked, navigate the carousel to that card
                        if (index !== activeIndex) handleNavigation(index);
                        // If the center card is clicked (and it's not the profile card), navigate to its page link
                        else if (card.type !== 'profile') navigate(card.link);
                      }}
                      // Add data-interactive attribute only to side cards for cursor effect
                      {...(index !== activeIndex && { 'data-interactive': 'true' })}
                    >
                      {/* Conditional Rendering for Card Content (Desktop) based on card.type */}
                      {card.type === 'profile' ? (
                        // Profile Card Layout: Full placeholder image
                        <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                           {/* Placeholder text */}
                           <img src="/profil.jpeg" alt="tes" className='w-full h-full items-center justify-center'/>
                           {/*<span className="text-gray-500 text-sm">Profile Image Placeholder</span>*/}
                        </div>
                      ) : (
                        // Layout for Other Cards (About, Projects, etc.)
                        <>
                          {/* Card Title */}
                          <h3 className="text-xl font-bold mb-4 text-center">{card.title}</h3>
                          {/* Centered Icon Area */}
                          {card.icon && (
                            <div className="flex-grow flex items-center justify-center">
                              {/* Render icon component */}
                              <card.icon className="h-24 w-24 text-purple-400 opacity-70" />
                            </div>
                          )}
                          {/* View Button: Only shown on the active (center) card */}
                          {index === activeIndex && (
                            <Button
                              // Styling: Full width, margin top auto (pushes to bottom), background colors
                              className="w-full mt-auto bg-purple-600 hover:bg-purple-700 data-[interactive=true]"
                              // Click handler: Prevent event bubbling to the card's onClick, then navigate to the link
                              onClick={(e) => { e.stopPropagation(); navigate(card.link); }}
                              data-interactive="true"
                            >
                              {/* Dynamic button text */}
                              View {card.title}
                            </Button>
                          )}
                        </>
                      )}
                    </motion.div>
                  );
                })
              }
            </AnimatePresence>
          </div>

          {/* Right Navigation Button (Desktop) */}
          {/* - Similar structure and styling to the left button, but positioned on the right. */}
          <Button
            variant="outline"
            size="icon"
            // Styling classes (similar to left button, but `right-16 md:right-24`)
            className="absolute right-16 md:right-24 top-1/2 transform -translate-y-1/2 z-10 bg-purple-600/70 hover:bg-purple-500/90 text-white rounded-full border-purple-500/80 shadow-lg transition-colors duration-300 data-[interactive=true]"
            // Click handler: Calls the goToNext function
            onClick={goToNext}
            data-interactive="true"
          >
            {/* Right arrow icon */}
            <ArrowRightCircle className="h-8 w-8" />
          </Button>
        </div>
      )}
    </div>
  );
};

// Export the component for use in other parts of the application
export default InteractiveCards;

