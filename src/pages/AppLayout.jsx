import Sidebar from "../components/Sidebar";
import Map from "../components/Map";

import styles from "./AppLayout.module.css";
import User from "../components/User";

const AppLayout = function () {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
