import Container from 'rsuite/Container'
import Header from 'rsuite/Header'
import Content from 'rsuite/Content'
import Footer from 'rsuite/Footer'
import { CustomNavbar } from './CustomNavbar'

import 'rsuite/dist/rsuite.min.css'

export const CustomContainer = () => {
    return (
        <div className="show-container">
            <Container>
              <Header>
                <CustomNavbar/>
              </Header>
              <Content>Content</Content>
              <Footer>Footer</Footer>
            </Container>
        </div>
    )
}