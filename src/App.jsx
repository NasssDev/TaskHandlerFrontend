import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Header from './components/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';
import DonorList from './pages/donors/DonorList';
import DonorDetail from './pages/donors/DonorDetail';
import BeneficiaryList from './pages/beneficiaries/BeneficiaryList';
import BeneficiaryDetail from './pages/beneficiaries/BeneficiaryDetail';
import Dashboard from './pages/Dashboard';
import CreateBeneficiaryForm from './components/beneficiaries/CreateBeneficiaryForm';
import CreateDonorForm from './components/donors/CreateDonorForm';  


function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      {isAuthenticated && <Header />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donors"
          element={
            <ProtectedRoute>
              <DonorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donors/:id"
          element={
            <ProtectedRoute>
              <DonorDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donors/new"
          element={
            <ProtectedRoute>
              <CreateDonorForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries"
          element={
            <ProtectedRoute>
              <BeneficiaryList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/:id"
          element={
            <ProtectedRoute>
              <BeneficiaryDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/beneficiaries/new"
          element={
            <ProtectedRoute>
              <CreateBeneficiaryForm />
            </ProtectedRoute>
          }
        />   
      </Routes>
    </div>
  );
}

export default App;
