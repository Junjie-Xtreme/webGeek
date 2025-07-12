import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardStudent from './pages/DashboardStudent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboardadmin" element={<DashboardAdmin />} />
        <Route path="/dashboardstudent" element={<DashboardStudent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
