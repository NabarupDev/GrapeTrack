"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

// Use the same static tasks array as the main page
const tasks = [
  { 
    id: "1", 
    title: "Design homepage", 
    status: "In Progress", 
    due: "2025-07-30",
    priority: "High",
    description: "Create a modern, responsive homepage design with improved UX",
    category: "Design"
  },
  { 
    id: "2", 
    title: "Fix login bug", 
    status: "Completed", 
    due: "2025-07-20",
    priority: "Critical",
    description: "Resolve authentication issues preventing user login",
    category: "Development"
  },
  { 
    id: "3", 
    title: "Update user profile page", 
    status: "In Progress", 
    due: "2025-08-05",
    priority: "Medium",
    description: "Enhance user profile with new features and better layout",
    category: "Development"
  },
  { 
    id: "4", 
    title: "Write documentation", 
    status: "Pending", 
    due: "2025-08-10",
    priority: "Low",
    description: "Complete API documentation for the new features",
    category: "Documentation"
  },
  { 
    id: "5", 
    title: "Review code changes", 
    status: "Pending", 
    due: "2025-07-28",
    priority: "High",
    description: "Review pull requests and provide feedback to team members",
    category: "Review"
  },
];


export default function UserTaskDetailsPage() {
  const params = useParams();
  const { id } = params || {};
  const task = tasks.find(t => t.id === id);
  const [comments, setComments] = useState([
    { author: "Alice", text: "Initial wireframes done.", date: "2025-07-05" },
    { author: "John Doe", text: "Started implementing UI.", date: "2025-07-10" },
  ]);
  const [newComment, setNewComment] = useState("");
  const currentUser = "Current User"; // Replace with actual user fetching logic

  // For demo, assign a fake progress based on status
  let progress = 0;
  if (task) {
    if (task.status === "Completed") progress = 100;
    else if (task.status === "In Progress") progress = 65;
    else progress = 0;
  }

  function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    const today = new Date();
    const date = today.toISOString().slice(0, 10);
    setComments([
      ...comments,
      { author: currentUser, text: newComment.trim(), date },
    ]);
    setNewComment("");
  }

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white rounded-xl shadow p-8 border border-gray-200">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Task Not Found</h1>
          <p className="text-gray-600">No task found for id: {id}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md border border-neutral-200 p-8">
        <h1 className="text-2xl font-bold text-neutral-800 mb-2">Task: {task.title}</h1>
        <p className="text-neutral-600 mb-4">{task.description}</p>
        <div className="mb-4">
          <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mr-2">{task.status}</span>
          <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">Progress: {progress}%</span>
        </div>
        <div className="mb-4 text-sm text-neutral-500">
          <div>Due: {task.due}</div>
          <div>Priority: {task.priority}</div>
          <div>Category: {task.category}</div>
        </div>
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Comments & Discussion</h2>
          <ul className="space-y-2 mb-4">
            {comments.map((c, i) => (
              <li key={i} className="bg-neutral-100 rounded-lg px-4 py-2">
                <span className="font-semibold text-neutral-700">{c.author}:</span> {c.text}
                <span className="ml-2 text-xs text-neutral-400">({c.date})</span>
              </li>
            ))}
          </ul>
          <form onSubmit={handleAddComment} className="flex flex-col gap-2">
            <textarea
              className="border border-neutral-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Add a comment..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              required
              rows={2}
            />
            <button
              type="submit"
              className="self-end bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition"
            >
              Add Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
