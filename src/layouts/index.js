import styles from './index.css';

function BasicLayout(props) {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>智赛棋牌赛事管理系统</h1>
      { props.children }
    </div>
  );
}

export default BasicLayout;
