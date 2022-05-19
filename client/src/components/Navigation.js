
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth';



const Navigation = () => {
    const {user, logout } = useContext(AuthContext);

    const pathname = window.location.pathname;
    const path = (pathname ==='/' ? 'home' : pathname.substring(1));
    const [activeItem, setActiveItem] = useState(path);

    const MenuBar = user ? (
    //if user is logged in show this menu bar
    <> 
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav>
                        <Nav.Link href='/' active>{user.username}</Nav.Link>
                        <Nav.Link onClick={ logout }>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>              
            </Container>
        </Navbar>
    </>) 
    : // if user is not logged in, show this menu bar  
    (<>
        <Navbar collapseOnSelect fixed='top' expand='sm' bg='dark' variant='dark'>
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                <Navbar.Collapse id='responsive-navbar-nav'>
                    <Nav>
                        <Nav.Link active={activeItem === 'home'} href='/'>Home</Nav.Link>
                        <Nav.Link active={activeItem === 'login'} href='/login'>Login</Nav.Link>
                        <Nav.Link active={activeItem === 'register'} href='/register'>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>              
            </Container>
        </Navbar>
    </>)
     return MenuBar;
}

export default Navigation;