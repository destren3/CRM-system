import { Route, Routes } from 'react-router-dom';
import { ProfilePage, TodosPage } from './pages';
import { AppLayout } from './components'; // Импортируем новый Layout

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
