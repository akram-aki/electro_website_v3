import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#282828] text-white py-6  pb-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        <p className="text-sm">
          &copy; 2025 Electro Club. All rights reserved.
        </p>
        <nav className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-gray-400">
            Home
          </a>
          <a href="#" className="hover:text-gray-400">
            About
          </a>
          <a href="#" className="hover:text-gray-400">
            Events
          </a>
          <a href="#" className="hover:text-gray-400">
            Contact
          </a>
        </nav>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-xl hover:text-gray-400">
            <FaGithub />
          </a>
          <a href="#" className="text-xl hover:text-gray-400">
            <FaTwitter />
          </a>
          <a href="#" className="text-xl hover:text-gray-400">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
}
