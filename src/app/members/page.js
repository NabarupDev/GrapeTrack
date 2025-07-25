
"use client";
import React from "react";

export default function UserHomePage() {
  // Placeholder user data and stats
  const user = { name: "John Doe" };
  const stats = [
    { label: "Total Tasks", value: 12, color: "from-violet-500 to-indigo-500" },
    { label: "In Progress", value: 5, color: "from-yellow-400 to-orange-500" },
    { label: "Completed", value: 7, color: "from-green-400 to-emerald-500" },
  ];

  const taskId = "123";
  const quickLinks = [
    { label: "My Tasks", href: `/members/tasks`, icon: "📝" },
    { label: "Team", href: "#", icon: "👥" },
    { label: "Profile", href: "#", icon: "👤" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-neutral-800 mb-2">Welcome, {user.name}!</h1>
        <p className="text-neutral-600 mb-8">Here’s a quick overview of your activity and shortcuts to get started.</p>

        {/* Task Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl shadow-md border border-neutral-200 bg-gradient-to-br ${stat.color} text-white p-6 flex flex-col items-center`}
            >
              <div className="text-4xl font-extrabold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex flex-col items-center justify-center bg-white border border-neutral-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition group"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">{link.icon}</span>
              <span className="text-lg font-semibold text-neutral-800 group-hover:text-violet-700">{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
