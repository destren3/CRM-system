import { TodosPage } from './pages/pages-logic';
import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles.background}>
      <TodosPage />
    </div>
  );
}

export default App;
