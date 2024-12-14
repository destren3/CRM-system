import { Route, Routes } from 'react-router-dom';
import {
  ForgotPasswordPage,
  LoginPage,
  ProfilePage,
  RegistrationPage,
  TodosPage,
} from './pages';
import { AppLayout } from './components';
import { AuthLayout } from './components/auth-layout/auth-layout';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AppLayout>
            <TodosPage />
          </AppLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <AppLayout>
            <ProfilePage />
          </AppLayout>
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
      <Route
        path="/forgot-password"
        element={
          <AuthLayout image="/purple lock.jpg" title="Восстановление пароля">
            <ForgotPasswordPage />
          </AuthLayout>
        }
      />
    </Routes>
  );
}

export default App;
