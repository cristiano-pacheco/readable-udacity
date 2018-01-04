import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Image, Container } from 'semantic-ui-react'

import logo from '../../assets/logo.png'

const NavBar = () => (
  <div>
    <Menu fixed='top' color='violet' inverted>
      <Container>
        <Menu.Item as={Link} to='/'>
          <Image size='mini'src={logo} className='logo' />
          Readable
        </Menu.Item>
      </Container>
    </Menu>
  </div>
)

export default NavBar
