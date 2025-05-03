// Simple Footer component
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-800 text-gray-400 text-center py-4 mt-16 border-t border-gray-700">
      <p>&copy; {currentYear} Tsaqif Assajeed. All rights reserved.</p>
      {/* TODO: Replace "Your Name" with the actual name */}
    </footer>
  );
};

export default Footer;

