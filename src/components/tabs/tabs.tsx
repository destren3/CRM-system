import { Tab } from "..";
import { TStatusRU } from "../../lib/types";
import styles from './tabs.module.scss'

interface TTabs {
  tabs: TStatusRU[];
  counts: number[];
  currentTab: TStatusRU;
  setIsCurrentTab: (status: TStatusRU) => void;
}

export const Tabs = ({ tabs, counts, currentTab, setIsCurrentTab }: TTabs) => {
  return (
    <div className={styles.tabs}>
      {tabs.map((tab, index) => (
        <Tab
          content={tab}
          key={index}
          count={counts[index]}
          currentTab={currentTab}
          setIsCurrentTab={setIsCurrentTab}
        />
      ))}
    </div>
  );
};
