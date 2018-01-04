import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'

import AppRoutes from './app-routes'
import NavBar from './layout/nav-bar'

class App extends Component {
  render () {
    return (
      <div>
        <NavBar />
        <Container className='container-app'>
          <AppRoutes />
        </Container>
      </div>
    )
  }
}

export default App
