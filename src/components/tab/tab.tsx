import styles from "./tab.module.scss";

interface TTab {
  content: string;
  count: number;
  isActive: boolean;
  setIsActive: () => void;
}

export const Tab = ({ content, count, isActive, setIsActive }: TTab) => {
  return (
    <button
      className={`${styles.tab} ${isActive && styles["tab-active"]}`}
      onClick={setIsActive}
    >{`${content} (${count})`}</button>
  );
};
