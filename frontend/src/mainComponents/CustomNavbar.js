import 'rsuite/dist/rsuite.min.css'
import Navbar from 'rsuite/Navbar'
import Nav from 'rsuite/Nav'
import HomeIcon from '@rsuite/icons/legacy/Home'
import CogIcon from '@rsuite/icons/legacy/Cog'

export const CustomNavbar = () => {
    return (
        <Navbar className='navbar'>
            <p><b> Posset hic esse navbar</b> </p>

            {/*<Nav>
              <Nav.Item icon={<HomeIcon />}>
                Главная
              </Nav.Item>
              <Nav.Menu title="About">
                <Nav.Item>Company</Nav.Item>
                <Nav.Item>Team</Nav.Item>
                <Nav.Menu title="Contact">
                  <Nav.Item>Via email</Nav.Item>
                  <Nav.Item>Via telephone</Nav.Item>
                </Nav.Menu>
              </Nav.Menu>
            </Nav>
            <Nav pullRight>
              <Nav.Item icon={<CogIcon />}>Settings</Nav.Item>
            </Nav>*/}
        </Navbar>
    )

}