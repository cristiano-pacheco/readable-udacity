import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Home from './home'
import Post from './post'
import PostForm from './post/form'

const AppRoutes = () => (
  <Switch>
    <Route exact path='/' component={Home} />
    <Route path='/post/new' component={PostForm} />
    <Route path='/:category/:post_id' component={Post} />
    <Route path='/:category' component={Home} />
  </Switch>
)

export default AppRoutes
