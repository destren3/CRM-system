import { Route, Routes } from 'react-router-dom';
import {
  AdministrationPage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  TodosPage,
} from './pages';
import { AppLayout, ProtectedRoute, AuthLayout } from './components';

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
        <Route path="/my-profile" element={<ProfilePage />} />
        <Route path="/user-profile/:id" element={<ProfilePage />} />
        <Route path="/administration" element={<AdministrationPage />} />
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
