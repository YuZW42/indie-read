import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';


function ColorSchemesExample() {
  return (
    <div className="nav-container">
      <Navbar collapseOnSelect expand='md'>
        <Container fluid>
          <Navbar.Toggle aria-controls='offcanvasNavbar-expand-md'/>
          <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-md`}
              aria-labelledby={`offcanvasNavbarLabel-expand-md}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
                  Indie Art Reads
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Nav className="justify-content-center flex-grow-1 p-3 fs-5 fw-light gap-3">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="#">Books</Nav.Link>
                  <Nav.Link href="/resources">Resources</Nav.Link>
                  <Nav.Link href="/search">Search</Nav.Link>
                  <Nav.Link href="#">About</Nav.Link>
                  <Nav.Link href="#">Contact</Nav.Link>
              
                  <Nav.Link href="/login">Login</Nav.Link>
              </Nav>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </div>
  );
}

export default ColorSchemesExample;