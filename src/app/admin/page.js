"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { Users, UserPlus, Settings, MoreVertical, Search, Filter, Mail, Shield, Crown, User } from 'lucide-react';

// Dummy data for users and roles
const initialUsers = [
  { id: 1, email: 'alice.johnson@company.com', role: 'User', taskLoad: 3, status: 'active', joinedDate: '2024-01-15' },
  { id: 2, email: 'bob.smith@company.com', role: 'Manager', taskLoad: 5, status: 'active', joinedDate: '2024-02-20' },
  { id: 3, email: 'carol.davis@company.com', role: 'Admin', taskLoad: 1, status: 'active', joinedDate: '2024-03-10' },
];

const roles = ['User', 'Manager', 'Admin'];

const getRoleIcon = (role) => {
  switch (role) {
    case 'Admin': return <Shield className="w-4 h-4 text-red-500" />;
    case 'Manager': return <Settings className="w-4 h-4 text-blue-500" />;
    default: return <User className="w-4 h-4 text-gray-500" />;
  }
};

const getRoleBadgeColor = (role) => {
  switch (role) {
    case 'Admin': return 'bg-red-100 text-red-800 border-red-200';
    case 'Manager': return 'bg-blue-100 text-blue-800 border-blue-200';
    default: return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getTaskLoadColor = (load) => {
  if (load <= 2) return 'text-green-600 bg-green-50';
  if (load <= 5) return 'text-yellow-600 bg-yellow-50';
  return 'text-red-600 bg-red-50';
};

export default function AdminPage() {
  const [users, setUsers] = useState(initialUsers);
  const [inviteEmail, setInviteEmail] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [roleDropdownUserId, setRoleDropdownUserId] = useState(null); // Track which user's dropdown is open

  const handleInvite = () => {
    if (!inviteEmail) return;
    toast.success(`Invitation sent to ${inviteEmail}`);
    setInviteEmail('');
  };

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => user.id === userId ? { ...user, role: newRole } : user));
    setRoleDropdownUserId(null); // Close dropdown after change
    toast.success('Role updated successfully');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const avgTaskLoad = Math.round(users.reduce((sum, u) => sum + u.taskLoad, 0) / users.length);

  return (
    <div className="min-h-screen">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">Manage users, roles, and monitor task loads across your organization</p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(59,130,246,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(139,92,246,0.08)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Task Load</p>
                <p className="text-2xl font-bold text-gray-900">{avgTaskLoad}</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Invite User Section */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-10 w-10 bg-indigo-100 rounded-lg flex items-center justify-center">
              <UserPlus className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Invite New User</h3>
              <p className="text-sm text-gray-600">Send an invitation to join your organization</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                placeholder="Enter email address"
                value={inviteEmail}
                onChange={e => setInviteEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={handleInvite} 
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Send Invite
            </button>
          </div>
        </motion.div>

        {/* User List Section */}
        <motion.div
          className="bg-white rounded-xl shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">All Users</h3>
                <p className="text-sm text-gray-600">Manage user roles and monitor activity</p>
              </div>
              
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                
                <div className="relative min-w-[140px]">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                  <button
                    type="button"
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none bg-white w-full text-left flex items-center justify-between"
                    onClick={() => setRoleDropdownOpen(v => !v)}
                  >
                    {filterRole === 'all' ? 'All Roles' : filterRole}
                    <svg className={`ml-2 h-4 w-4 transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  <AnimatePresence>
                    {roleDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                      >
                        <li>
                          <button
                            className={`w-full text-left px-4 py-2 hover:bg-indigo-50 ${filterRole === 'all' ? 'font-semibold text-indigo-600' : ''}`}
                            onClick={() => { setFilterRole('all'); setRoleDropdownOpen(false); }}
                          >
                            All Roles
                          </button>
                        </li>
                        {roles.map(role => (
                          <li key={role}>
                            <button
                              className={`w-full text-left px-4 py-2 hover:bg-indigo-50 ${filterRole === role ? 'font-semibold text-indigo-600' : ''}`}
                              onClick={() => { setFilterRole(role); setRoleDropdownOpen(false); }}
                            >
                              {role}
                            </button>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Load</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map(user => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                          {user.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.email}</div>
                          <div className="text-sm text-gray-500">Joined {user.joinedDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 relative">
                        {getRoleIcon(user.role)}
                        <div className="relative">
                          <button
                            type="button"
                            className={`text-xs px-3 py-1 rounded-full border font-medium flex items-center gap-1 ${getRoleBadgeColor(user.role)} focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[90px]`}
                            onClick={() => setRoleDropdownUserId(roleDropdownUserId === user.id ? null : user.id)}
                          >
                            {user.role}
                            <svg className={`ml-1 h-3 w-3 transition-transform ${roleDropdownUserId === user.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                          </button>
                          <AnimatePresence>
                            {roleDropdownUserId === user.id && (
                              <motion.ul
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 8 }}
                                transition={{ duration: 0.18 }}
                                className="absolute left-0 z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                              >
                                {roles.map(role => (
                                  <li key={role}>
                                    <button
                                      className={`w-full text-left px-4 py-2 hover:bg-indigo-50 ${user.role === role ? 'font-semibold text-indigo-600' : ''}`}
                                      onClick={() => handleRoleChange(user.id, role)}
                                    >
                                      {role}
                                    </button>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTaskLoadColor(user.taskLoad)}`}>
                        {user.taskLoad} tasks
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                        }`}></div>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredUsers.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Users className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}