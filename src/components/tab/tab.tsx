import { TStatusRU } from '../../lib/types';
import styles from './tab.module.scss';

interface TTab {
  content: TStatusRU;
  count: number;
  currentTab: TStatusRU;
  setIsCurrentTab: (status: TStatusRU) => void;
}

export const Tab = ({ content, count, currentTab, setIsCurrentTab }: TTab) => {
  return (
    <button
      className={`${styles.tab} ${currentTab === content && styles['tab-active']}`}
      onClick={() => setIsCurrentTab(content)}
    >{`${content} (${count})`}</button>
  );
};
