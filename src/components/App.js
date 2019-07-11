import React from "react"
import { Switch, Route } from "react-router-dom"
import LinkList from "./LinkList/LinkList"
import CreateLink from "./CreateLink/CreateLink"
import Header from "./Header/Header"
import Login from "./Login/Login"

export default function App() {
  return (
    <div className="center w85">
      <Header />
      <div className="ph3 pv1 background-gray">
        <Switch>
          <Route exact path="/" component={LinkList} />
          <Route exact path="/create" component={CreateLink} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    </div>
  )
}
