import Image from 'next/image';
import Link from 'next/link';
import logo from '/public/images/logo.png';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar collapseOnSelect expand='lg' bg='light' variant='light'>
      <Container>
        <Navbar.Brand as={Link} href='/'>
          <a>
            <Image src={logo} alt='logo' width={70} height={50} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ms-auto my-links-container'>
            <Link href='/'>
              <a className='my-links'>Home</a>
            </Link>

            <NavDropdown
              title={<span style={{ color: '#4f5665' }}>Products</span>}
              id='basic-nav-dropdown'
            >
              <NavDropdown.Item as={Link} href='/products/screen-protection'>
                <a className='dropdown-item'>Screen Protection</a>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href='/products/fuck!'>
                <a className='dropdown-item'>
                  Accidental Damage and Liquid Damage
                </a>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href='/products/extended-warranty'>
                <a className='dropdown-item'>Extended Warranty</a>
              </NavDropdown.Item>
            </NavDropdown>

            <Link href='/contact'>
              <a className='my-links'>Contact us</a>
            </Link>
            <Link href='/cart'>
              <a className='my-links'>Cart</a>
            </Link>
            <Link href='/login'>
              <a className='my-links'>Sign in</a>
            </Link>
            <Link href='/login'>
              <a className='my-links button-outline'>Sign up</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
