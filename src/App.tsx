import { Route, Routes } from 'react-router-dom';
import { LoginPage, ProfilePage, RegistrationPage, TodosPage } from './pages';
import { AppLayout, ProtectedRoute } from './components';
import { AuthLayout } from './components/auth-layout/auth-layout';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <TodosPage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/registration"
        element={
          <AuthLayout image="/green lock.jpg" title="Регистрация">
            <RegistrationPage />
          </AuthLayout>
        }
      />
      <Route
        path="/login"
        element={
          <AuthLayout image="/blue lock.jpg" title="Вход">
            <LoginPage />
          </AuthLayout>
        }
      />
    </Routes>
  );
}

export default App;
