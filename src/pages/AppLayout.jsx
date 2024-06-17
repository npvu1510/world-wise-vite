import Sidebar from '../components/Sidebar';
import Map from '../components/Map';

import styles from './AppLayout.module.css';
import User from '../components/User';
// import { useAuth } from '../contexts/AuthContext';

function AppLayout() {
  //   const { isAuthenticated } = useAuth();
  // console.log(`AppLayout: ${isAuthenticated}`);
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
