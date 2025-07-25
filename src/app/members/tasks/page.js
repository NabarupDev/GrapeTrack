"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, CheckCircle, AlertCircle, Circle } from "lucide-react";

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

const statusConfig = {
  "Completed": { 
    icon: CheckCircle, 
    bgColor: "bg-emerald-50", 
    textColor: "text-emerald-700", 
    borderColor: "border-emerald-200",
    iconColor: "text-emerald-600"
  },
  "In Progress": { 
    icon: Clock, 
    bgColor: "bg-blue-50", 
    textColor: "text-blue-700", 
    borderColor: "border-blue-200",
    iconColor: "text-blue-600"
  },
  "Pending": { 
    icon: Circle, 
    bgColor: "bg-gray-50", 
    textColor: "text-gray-700", 
    borderColor: "border-gray-200",
    iconColor: "text-gray-500"
  }
};

const priorityConfig = {
  "Critical": { color: "text-red-600", bg: "bg-red-100" },
  "High": { color: "text-orange-600", bg: "bg-orange-100" },
  "Medium": { color: "text-yellow-600", bg: "bg-yellow-100" },
  "Low": { color: "text-green-600", bg: "bg-green-100" }
};

const categoryColors = {
  "Design": "bg-purple-100 text-purple-700",
  "Development": "bg-blue-100 text-blue-700",
  "Documentation": "bg-gray-100 text-gray-700",
  "Review": "bg-indigo-100 text-indigo-700"
};

export default function UserTasksPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("due");

  const filteredTasks = tasks.filter(task => 
    filterStatus === "All" || task.status === filterStatus
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === "due") return new Date(a.due) - new Date(b.due);
    if (sortBy === "priority") {
      const priorityOrder = { "Critical": 4, "High": 3, "Medium": 2, "Low": 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return 0;
  });

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.status === "Completed").length;
    const inProgress = tasks.filter(t => t.status === "In Progress").length;
    const pending = tasks.filter(t => t.status === "Pending").length;
    return { completed, inProgress, pending, total: tasks.length };
  };

  const stats = getTaskStats();
  
  const isOverdue = (dueDate) => new Date(dueDate) < new Date();
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen pb-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Manage and track your assigned tasks</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <AlertCircle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.completed}</p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-600">{stats.pending}</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Circle className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <motion.div
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <motion.div className="flex items-center gap-2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <label className="text-sm font-medium text-gray-700">Filter by status:</label>
              <motion.div whileTap={{ scale: 0.97 }} className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 hover:shadow focus:border-blue-500 min-w-[120px] pr-7 cursor-pointer"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option value="All">All Tasks</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
                <motion.span
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ cursor: 'pointer' }}
                >
                  ▼
                </motion.span>
              </motion.div>
            </motion.div>
            <motion.div className="flex items-center gap-2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <motion.div whileTap={{ scale: 0.97 }} className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none border border-gray-300 rounded-md px-3 py-1.5 text-xs font-medium bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:border-blue-400 hover:shadow focus:border-blue-500 min-w-[100px] pr-7 cursor-pointer"
                  style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                >
                  <option value="due">Due Date</option>
                  <option value="priority">Priority</option>
                </select>
                <motion.span
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                  initial={{ rotate: -90 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ cursor: 'pointer' }}
                >
                  ▼
                </motion.span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tasks List */}
        <div className="space-y-4">
          <AnimatePresence>
            {sortedTasks.length === 0 ? (
              <motion.div
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <Circle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                <p className="text-gray-500">No tasks match your current filter criteria.</p>
              </motion.div>
            ) : (
              sortedTasks.map((task, idx) => {
                const StatusIcon = statusConfig[task.status].icon;
                const isTaskOverdue = isOverdue(task.due) && task.status !== "Completed";
                return (
                  <motion.div
                    key={task.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 group cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.35, delay: idx * 0.07 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => router.push(`/members/tasks/details/${task.id}`)}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-3 flex-1">
                          <motion.div
                            className={`p-2 rounded-full ${statusConfig[task.status].bgColor}`}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 + idx * 0.05 }}
                          >
                            <StatusIcon className={`w-4 h-4 ${statusConfig[task.status].iconColor}`} />
                          </motion.div>
                          <div className="flex-1">
                            <motion.h3
                              className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-1"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.15 + idx * 0.05, duration: 0.3 }}
                            >
                              {task.title}
                            </motion.h3>
                            <motion.p
                              className="text-gray-600 text-sm mb-3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.18 + idx * 0.05, duration: 0.3 }}
                            >
                              {task.description}
                            </motion.p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className={`${isTaskOverdue ? 'text-red-600 font-medium' : 'text-gray-600'}`}>
                                  Due {formatDate(task.due)}
                                  {isTaskOverdue && <span className="ml-1 text-red-500">(Overdue)</span>}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <motion.div
                          className="flex flex-col items-end gap-2"
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + idx * 0.05, duration: 0.3 }}
                        >
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusConfig[task.status].bgColor} ${statusConfig[task.status].textColor} ${statusConfig[task.status].borderColor}`}>
                            {task.status}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${priorityConfig[task.priority].bg} ${priorityConfig[task.priority].color}`}>
                            {task.priority}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${categoryColors[task.category]}`}>
                            {task.category}
                          </span>
                        </motion.div>
                      </div>
                      {/* Progress bar for In Progress tasks */}
                      {task.status === "In Progress" && (
                        <motion.div
                          className="mt-4"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.25 + idx * 0.05, duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                            <span>Progress</span>
                            <span>65%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <motion.div
                              className="bg-blue-600 h-2 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: '65%' }}
                              transition={{ duration: 0.7, delay: 0.3 + idx * 0.05, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}