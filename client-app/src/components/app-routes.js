import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './home'

const AppRoutes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/:category' component={Home} />
  </Switch>
)

export default AppRoutes
