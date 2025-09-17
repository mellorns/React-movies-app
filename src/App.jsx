import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import { NavLink, Outlet } from 'react-router';


function App() {

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand href='#'>
            Movies App
          </Navbar.Brand>
          <Nav>
            <NavLink to='/' className="me-3">
              Home
            </NavLink>
            <NavLink to='/about'>
              About
            </NavLink>
          </Nav>
        </Container>
      </Navbar>
      <Container className='container'>
        <Outlet />
      </Container>
      <ToastContainer position="top-center" />
    </>
  )
}

export default App
