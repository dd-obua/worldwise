import Logo from './Logo';
import AppNav from './AppNav';
import Footer from './Footer';

import styles from './Sidebar.module.css';

const Sidebar = function () {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <p>List of cities</p>
      <Footer />
    </div>
  );
};

export default Sidebar;
