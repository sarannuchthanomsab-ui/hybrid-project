import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

function NavbarComponent() {
  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">ระบบบริหารจัดการ</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
                หน้าหลัก
            </Nav.Link>
            <Nav.Link as={Link} to="/customer">ข้อมูลลูกค้า</Nav.Link>
            <NavDropdown title="ข้อมูลสินค้า" id="basic-nav-dropdown">
              <NavDropdown.Item href="#">กระเป๋า</NavDropdown.Item>
              <NavDropdown.Item href="#">รองเท้า</NavDropdown.Item>
            </NavDropdown>
              <Nav.Link as ={Link} to="/about">เกี่ยวกับ</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
