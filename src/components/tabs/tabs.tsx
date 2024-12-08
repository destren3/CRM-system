import { Tab } from "..";
import styles from './tabs.module.scss'

interface TTabs {
  tabs: string[];
  count: number;
  isActive: boolean;
  setIsActive: () => void;
}

export const Tabs = ({ tabs, count, isActive, setIsActive }: TTabs) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <Tab
          content={tab}
          key={index}
          count={count}
          isActive={isActive}
          setIsActive={setIsActive}
        />
      ))}
    </div>
  );
};
