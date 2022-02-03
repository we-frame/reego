import Link from 'next/link';
import styles from '@/styles/utils/SideNav.module.css';
import { useRouter } from 'next/dist/client/router';

const SideNav = () => {
  const { pathname } = useRouter();

  return (
    <aside className={styles.aside}>
      <ul className={styles.mygrid}>
        <li>
          <Link href='/account/dashboard' passHref>
            <button
              className={`${styles.button} ${
                pathname.includes('dashboard') ? `${styles.border}` : ''
              }`}
            >
              Overview
            </button>
          </Link>
        </li>
        <li>
          <Link href='/account/orders' passHref>
            <button
              className={`${styles.button} ${
                pathname.includes('orders') ? `${styles.border}` : ''
              }`}
            >
              Orders
            </button>
          </Link>
        </li>
        <li>
          <Link href='/account/profile' passHref>
            <button
              className={`${styles.button} ${
                pathname.includes('profile') ? `${styles.border}` : ''
              }`}
            >
              Profile
            </button>
          </Link>
        </li>
        <li>
          <Link href='/account/redeem' passHref>
            <button
              className={`${styles.button} ${
                pathname.includes('redeem') ? `${styles.border}` : ''
              }`}
            >
              Products
            </button>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNav;
