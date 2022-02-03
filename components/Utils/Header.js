import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import { Container, NavDropdown } from 'react-bootstrap';
import { FiAlignJustify } from 'react-icons/fi';
import { useContext, useState } from 'react';
import styles from '@/styles/utils/Header.module.css';
import { StateContext } from 'context/StateProvider';

const Header = () => {
  const { isLoggedIn } = useContext(StateContext);

  const [show, setShow] = useState(false);

  return (
    <nav className={styles.myNav}>
      <Container>
        <div className={styles.navFlex}>
          <div>
            <Link href='/'>
              <a onClick={() => setShow(false)}>
                <Image src={logo} alt='logo' width={70} height={50} />
              </a>
            </Link>

            <FiAlignJustify
              className={styles.ham}
              onClick={() => setShow(!show)}
            />
          </div>
          <div className={show ? 'nav-links show-links' : 'nav-links'}>
            <ul className={styles.ul}>
              <li>
                <Link href='/'>
                  <a className={styles.myLinks} onClick={() => setShow(false)}>
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <NavDropdown
                  title={<span style={{ color: '#4f5665' }}>Products</span>}
                  id='basic-nav-dropdown'
                  className={styles.myDropDown}
                >
                  <NavDropdown.Item as={Link} href='/products/portable'>
                    <a className='dropdown-item' onClick={() => setShow(false)}>
                      Portable
                    </a>
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href='/products/durable'>
                    <a className='dropdown-item' onClick={() => setShow(false)}>
                      Durable
                    </a>
                  </NavDropdown.Item>
                  <NavDropdown
                    title={<span style={{ color: '#4f5665' }}>Mobile</span>}
                    id='basic-nav-dropdown'
                    // className={styles.myDropDown}
                  >
                    <NavDropdown.Item
                      as={Link}
                      href='/products/mobile/screen-protection'
                    >
                      <a
                        className='dropdown-item'
                        onClick={() => setShow(false)}
                      >
                        Screen Protection
                      </a>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href='/products/mobile/accidental-damage-and-liquid-damage'
                    >
                      <a
                        className='dropdown-item'
                        onClick={() => setShow(false)}
                      >
                        ADLD
                      </a>
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      href='/products/mobile/extended-warranty'
                    >
                      <a
                        className='dropdown-item'
                        onClick={() => setShow(false)}
                      >
                        Extended Warranty
                      </a>
                    </NavDropdown.Item>
                  </NavDropdown>
                </NavDropdown>
              </li>
              <li>
                <Link href='/contact'>
                  <a className={styles.myLinks} onClick={() => setShow(false)}>
                    Contact us
                  </a>
                </Link>
              </li>
              <li>
                <Link href='/cart'>
                  <a className={styles.myLinks} onClick={() => setShow(false)}>
                    Cart
                  </a>
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link href='/account/dashboard'>
                    <a
                      className={styles.myLinks}
                      onClick={() => setShow(false)}
                    >
                      Account
                    </a>
                  </Link>
                </li>
              )}
              {!isLoggedIn && (
                <>
                  {' '}
                  <li>
                    <Link href='/account/login'>
                      <a
                        className={styles.myLinks}
                        onClick={() => setShow(false)}
                      >
                        Log in
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href='/account/register'>
                      <a
                        className='my-links button-outline'
                        onClick={() => setShow(false)}
                      >
                        Sign up
                      </a>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
