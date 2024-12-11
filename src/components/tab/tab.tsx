import { TStatus, TStatusRU } from '../tabs/status-types';
import styles from './tab.module.scss';
import { translationStatusTypes } from '../tabs/status-constants';

interface TTab {
  content: TStatusRU;
  count: number;
  currentTab: TStatus;
  setIsCurrentTab: (status: TStatus) => void;
}

export const Tab = ({ content, count, currentTab, setIsCurrentTab }: TTab) => {
  return (
    <button
      className={`${styles.tab} ${currentTab === translationStatusTypes[content] && styles['tab-active']}`}
      onClick={() => setIsCurrentTab(translationStatusTypes[content])}
    >{`${content} (${count})`}</button>
  );
};
