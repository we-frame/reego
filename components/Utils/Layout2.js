import { Col, Container, Row } from 'react-bootstrap';
import SideNav from './SideNav';

const Layout2 = ({ children }) => {
  return (
    <Container fluid>
      <Row>
        <Col lg={2}>
          <SideNav />
        </Col>
        <Col lg={10}>
          <main className='account-container'>{children}</main>
        </Col>
      </Row>
    </Container>
  );
};

export default Layout2;
