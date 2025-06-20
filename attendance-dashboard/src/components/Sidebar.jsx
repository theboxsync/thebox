import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="h-screen w-64 bg-blue-900 text-white fixed top-0 left-0 shadow-lg">
      <div className="p-6 font-bold text-xl border-b border-blue-700">
        Admin Panel
      </div>
      <nav className="mt-4 flex flex-col space-y-2 px-4">
        <Link to="/" className="hover:bg-blue-700 rounded px-4 py-2">Dashboard</Link>
        <Link to="/users" className="hover:bg-blue-700 rounded px-4 py-2">Users</Link>
        <Link to="/attendance" className="hover:bg-blue-700 rounded px-4 py-2">Attendance</Link>
        <Link to="/export" className="hover:bg-blue-700 rounded px-4 py-2">Export</Link>
      </nav>
    </div>
  );
}
