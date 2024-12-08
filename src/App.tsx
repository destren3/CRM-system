import { TodosPage } from './pages/pages-logic';
import styles from './styles/App.module.scss';

function App() {
  return (
    <div className={styles['pages-wrapper']}>
      <TodosPage />
    </div>
  );
}

export default App;
