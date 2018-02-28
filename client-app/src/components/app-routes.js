import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './home'
import Post from './post'

const AppRoutes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/:category/:post_id' component={Post} />
    <Route path='/:category' component={Home} />
  </Switch>
)

export default AppRoutes
