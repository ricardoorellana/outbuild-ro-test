import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from 'components/auth/Login';
import Dashboard from 'components/dashboard';
import { AuthProvider } from 'context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;