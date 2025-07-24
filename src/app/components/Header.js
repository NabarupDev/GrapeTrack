import React from 'react';

const Header = () => (
  <header className="bg-white mb-10 text-gray-900 px-8 py-4 flex items-center justify-between shadow-lg border-b border-gray-200">
    <div className="font-bold text-2xl tracking-wide">
      Draaksh Task Manager
    </div>
    <nav className="flex space-x-6">
      <a href="#" className="hover:text-yellow-500 transition-colors font-medium">Dashboard</a>
      <a href="#" className="hover:text-yellow-500 transition-colors font-medium">Tasks</a>
      <a href="#" className="hover:text-yellow-500 transition-colors font-medium">Team</a>
      <a href="#" className="hover:text-yellow-500 transition-colors font-medium">Profile</a>
    </nav>
  </header>
);

export default Header;
