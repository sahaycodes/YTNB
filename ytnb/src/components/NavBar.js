import {Navbar, Container} from "react-bootstrap";
import {useState} from 'react';

export const Navbar = () => {
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, seScrolled]=useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY >50){
                seScrolled(true);
            }else{
                seScrolled(false);
            }
        }

        window.addEventListener("scroll",onScroll);

        return() => window.removeEventListener("scroll",onScroll);
    }, [])

    const onUpdateActivateLink = (value) => {
        setActiveLink(value);
    }

    return(
        <Navbar expand="lg" className={scrolled ?"scrolled": ""}>
            <Container>
                <Navbar.Brand href="#home">
                    <img src={''} alt="Logo"/>
                </Navbar.Brand>    
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>    
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home" className={activeLink==='home' ? 'active navbar-link':'navbar-link'}onClick={() => onUpdateActivateLink('home')}>Home</Nav.Link>
                        <Nav.Link href="#notes"className={activeLink==='notes' ? 'active navbar-link':'navbar-link'}onClick={() => onUpdateActivateLink('notes')}>YourNotes</Nav.Link>
                        <Nav.Link href="#library" className={activeLink==='library' ? 'active navbar-link':'navbar-link'}onClick={() => onUpdateActivateLink('library')}>Library</Nav.Link>
                         
                    </Nav>
                    <span className="navbar-text">
                        <div className="social-icon">
                            <a href="#"><img src={''} alt=""/></a>
                            <a href="#"><img src={''} alt =""/></a>
                            <a href="#"><img src={''} alt=""/></a>
                        </div>
                        <button className="vvd" onClick={() => console.log('connect')}><span>Let's Connect</span></button>
                    </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
  
    )

}