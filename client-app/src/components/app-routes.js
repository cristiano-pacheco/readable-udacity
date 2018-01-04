import React from 'react'
import { Route, Switch } from 'react-router-dom'

const AppRoutes = () => (
  <Switch>
    <Route exact path='/' component={() => (<h1>Home</h1>)} />
  </Switch>
)

export default AppRoutes
