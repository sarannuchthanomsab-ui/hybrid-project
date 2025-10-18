import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";
function FooterComponent() {
return (
<Navbar bg="primary" data-bs-theme="dark"fixed="bottom">
    <Container>
    <Navbar.Brand href="/home">Dhurakijpundit university</Navbar.Brand>
    </Container>
</Navbar>
);
}
export default FooterComponent;