import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
// import Dashboard from './pages/Dashboard';
// import Users from './pages/Users';
// import Attendance from './pages/Attendance';
// import Export from './pages/Export';
import Login from './pages/Login';

function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem('token');
  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <div className="flex">
                <Sidebar />
                <div className="ml-64 p-6 w-full">
                  <Routes>
                    {/* <Route path="/" element={<Dashboard />} /> */}
                    {/* <Route path="/users" element={<Users />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/export" element={<Export />} /> */}
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
