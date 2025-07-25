"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Users, User, Settings, Shield } from "lucide-react";

const users = [
  { id: 1, name: "Alice Johnson", email: "alice.johnson@company.com", role: "User", taskLoad: 3, joinedDate: "2024-01-15" },
  { id: 2, name: "Bob Smith", email: "bob.smith@company.com", role: "Manager", taskLoad: 5, joinedDate: "2024-02-20" },
  { id: 3, name: "Carol Davis", email: "carol.davis@company.com", role: "Admin", taskLoad: 1, joinedDate: "2024-03-10" },
];

const getRoleIcon = (role) => {
  switch (role) {
    case "Admin": return <Shield className="w-4 h-4 text-red-500" />;
    case "Manager": return <Settings className="w-4 h-4 text-blue-500" />;
    default: return <User className="w-4 h-4 text-gray-500" />;
  }
};

export default function UserDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const userId = parseInt(params?.id, 10);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Users className="h-auto w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-800 mb-2">User Not Found</h2>
        <button
          className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => router.push("/admin")}
        >
          Back to Admin
        </button>
      </div>
    );
  }

  // Dummy updates data
  const [updates, setUpdates] = React.useState([
    { id: 1, word: "Hello", timestamp: "2024-07-20 10:00" },
    { id: 2, word: "World", timestamp: "2024-07-21 14:30" },
  ]);
  const [input, setInput] = React.useState("");

  const handleSignWord = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setUpdates([
      { id: updates.length + 1, word: input, timestamp: new Date().toLocaleString() },
      ...updates,
    ]);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 flex flex-col gap-6 border border-gray-200">
        <div className="flex items-center gap-6 border-b pb-4">
          <div className="h-16 w-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl">
            {(user.name ? user.name.charAt(0) : user.email.charAt(0)).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <div className="flex items-center gap-2 mt-1">
              {getRoleIcon(user.role)}
              <span className="text-xs px-2 py-1 rounded-full border bg-gray-100 text-gray-800 border-gray-200">{user.role}</span>
            </div>
            <div className="text-sm text-gray-500 mt-1">{user.email}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="text-xs text-gray-400">Joined</div>
            <div className="text-sm text-gray-700">{user.joinedDate}</div>
            <div className="text-xs text-gray-400 mt-1">Task Load</div>
            <div className="text-sm text-gray-700">{user.taskLoad} tasks</div>
          </div>
        </div>

        <form onSubmit={handleSignWord} className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Sign a word..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium"
          >
            Sign
          </button>
        </form>

        <div>
          <h3 className="text-lg font-semibold mb-2">User Updates</h3>
          {updates.length === 0 ? (
            <div className="text-gray-400 text-sm">No updates yet.</div>
          ) : (
            <ul className="space-y-2">
              {updates.map(update => (
                <li key={update.id} className="flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-2">
                  <span className="font-medium text-indigo-700">{update.word}</span>
                  <span className="text-xs text-gray-500 ml-auto">{update.timestamp}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 font-medium mt-2"
          onClick={() => router.push("/admin")}
        >
          Back to Admin
        </button>
      </div>
    </div>
  );
}
