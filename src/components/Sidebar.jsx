import Logo from './Logo';
import AppNav from './AppNav';
import Footer from './Footer';

import styles from './Sidebar.module.css';
import { Outlet } from 'react-router-dom';

const Sidebar = function () {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Sidebar;
