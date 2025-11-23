import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function NavbarComponent() {
  const auth_user_id = localStorage.getItem("auth_user_id");

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");

  function getUser() {
    if (!auth_user_id) return;

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api.baserow.io/api/database/rows/table/733327/${auth_user_id}/?user_field_names=true`,
      headers: {
        Authorization: "Token j56eCaWRVQprbZH5LrjUJR0Tz1ykQweR",
      },
    };

    axios
      .request(config)
      .then((response) => {
        setFirstName(response.data?.first_name);
        setLastName(response.data?.last_name);
      })
      .catch((error) => {
        console.log("Error loading user", error);
      });
  }

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    getUser();
  }, [auth_user_id]);

  return (
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/home">ระบบบริหารจัดการ</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">หน้าหลัก</Nav.Link>
            <Nav.Link as={Link} to="/customer">ข้อมูลลูกค้า</Nav.Link>

            <NavDropdown title="ข้อมูลสินค้า" id="basic-nav-dropdown">
              <NavDropdown.Item href="/products/bag">กระเป๋า</NavDropdown.Item>
              <NavDropdown.Item href="/products/shoe">รองเท้า</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/about">เกี่ยวกับ</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as:<Button variant="link" onClick={handleLogout}>{first_name} {last_name}</Button>
          </Navbar.Text>
            <Button variant="danger" onClick={handleLogout}>
              ออกจากระบบ
            </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
