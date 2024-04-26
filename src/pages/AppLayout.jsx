import Sidebar from '../components/Sidebar';

import styles from './AppLayout.module.css';

const AppLayout = function () {
  return (
    <div className={styles.app}>
      <Sidebar />
    </div>
  );
};

export default AppLayout;
