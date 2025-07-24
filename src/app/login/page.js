import React from 'react';

const googleIcon = (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block align-middle mr-2">
    <g>
      <path d="M44.5 20H24V28.5H36.9C35.5 33.1 31.2 36.5 24 36.5C16.3 36.5 10 30.2 10 22.5C10 14.8 16.3 8.5 24 8.5C27.2 8.5 30.1 9.6 32.3 11.5L38.1 6.1C34.5 2.9 29.6 1 24 1C11.8 1 2 10.8 2 23C2 35.2 11.8 45 24 45C36.2 45 46 35.2 46 23C46 21.3 45.8 19.7 45.5 18.1L44.5 20Z" fill="#E0E0E0"/>
      <path d="M6.3 14.7L13.1 19.6C14.9 15.7 19.1 12.5 24 12.5C26.7 12.5 29.1 13.5 30.9 15.1L37.1 9.1C33.7 6.1 29.1 4.5 24 4.5C15.7 4.5 8.7 10.7 6.3 14.7Z" fill="#F44336"/>
      <path d="M24 44.5C29.1 44.5 33.7 42.9 37.1 39.9L30.9 33.9C29.1 35.5 26.7 36.5 24 36.5C19.1 36.5 14.9 33.3 13.1 29.4L6.3 34.3C8.7 38.3 15.7 44.5 24 44.5Z" fill="#4CAF50"/>
      <path d="M44.5 20H24V28.5H36.9C36.2 31.1 34.5 33.1 32.3 34.5L38.1 39.9C41.2 37.1 44.5 32.7 44.5 27.5C44.5 25.7 44.3 23.9 44.5 20Z" fill="#2196F3"/>
    </g>
  </svg>
);

const githubIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="inline-block align-middle mr-2">
    <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/>
  </svg>
);

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl border border-neutral-200" style={{ background: 'linear-gradient(135deg, #f7f7f9 60%, #ece9f6 100%)', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)' }}>
        <h2 className="text-3xl font-extrabold text-neutral-800 mb-7 text-center tracking-tight">Welcome Back</h2>

        <div className="flex flex-col gap-3 mb-7">
          <button type="button" className="w-full flex items-center justify-center bg-white/80 hover:bg-white border border-neutral-200 text-neutral-700 font-semibold py-2.5 rounded-xl shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-300">
            {googleIcon}Continue with Google
          </button>
          <button type="button" className="w-full flex items-center justify-center bg-white/80 hover:bg-white border border-neutral-200 text-neutral-700 font-semibold py-2.5 rounded-xl shadow-sm transition focus:outline-none focus:ring-2 focus:ring-violet-300">
            {githubIcon}Continue with GitHub
          </button>
        </div>

        <div className="flex items-center mb-7">
          <div className="flex-grow h-px bg-neutral-200" />
          <span className="mx-4 text-neutral-400 font-medium text-sm">or</span>
          <div className="flex-grow h-px bg-neutral-200" />
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-neutral-700 font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 transition" placeholder="you@email.com" required />
          </div>
          <div>
            <label className="block text-neutral-700 font-semibold mb-2">Password</label>
            <input type="password" className="w-full px-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400 transition" placeholder="••••••••" required />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-indigo-500 hover:from-violet-700 hover:to-indigo-600 text-white font-bold py-2.5 rounded-xl shadow-md transition">Sign In</button>
        </form>

        <div className="text-center mt-6 text-sm text-neutral-500">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="text-violet-700 hover:underline font-semibold">Sign Up</a>
        </div>
      </div>
    </div>
  );
}
