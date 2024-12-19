import { Route, Routes } from 'react-router-dom';
import { LoginPage, ProfilePage, RegistrationPage, TodosPage } from './pages';
import { AppLayout, ProtectedRoute } from './components';
import { AuthLayout } from './components/auth-layout/auth-layout';

function App() {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<TodosPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route
        element={
          <AuthLayout
            images={['/blue-lock.jpg', '/green-lock.jpg', '/purple-lock.jpg']}
          />
        }
      >
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
}

export default App;
