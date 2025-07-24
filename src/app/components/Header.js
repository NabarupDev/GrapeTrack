import React from 'react';

const Header = () => (
  <header className="bg-purple-900 text-white px-8 py-4 flex items-center justify-between shadow-md">
    <div className="font-bold text-2xl tracking-wide">
      Draaksh Task Manager
    </div>
    <nav className="flex space-x-6">
      <a href="#" className="hover:text-purple-200 transition-colors">Dashboard</a>
      <a href="#" className="hover:text-purple-200 transition-colors">Tasks</a>
      <a href="#" className="hover:text-purple-200 transition-colors">Team</a>
      <a href="#" className="hover:text-purple-200 transition-colors">Profile</a>
    </nav>
  </header>
);

export default Header;
