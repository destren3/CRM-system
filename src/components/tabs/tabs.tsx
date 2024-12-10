import { Tab } from '..';
import { ICounts, TStatusRU } from './status-types';
import styles from './tabs.module.scss';

interface TTabs {
  tabs: TStatusRU[];
  counts: ICounts;
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
          count={counts[tab]}
          currentTab={currentTab}
          setIsCurrentTab={setIsCurrentTab}
        />
      ))}
    </div>
  );
};
