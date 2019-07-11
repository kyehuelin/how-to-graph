import React, { Component } from "react"
import gql from "graphql-tag"

import { Mutation } from "react-apollo"

import AUTH_TOKEN from "../../constants"

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

class Login extends Component {
  constructor(props) {
    super(props)
    // Don't call this.setState() here!
    this.state = {
      login: true, // switch between Login and SignUp
      email: "",
      password: "",
      name: ""
    }
  }

  _confirm = async ({ data, login, history }) => {
    const { token } = login ? data.login : data.signup
    this._saveUserData(token)
    history.push(`/`)
  }

  _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token)
  }

  render() {
    const { login, email, password, name } = this.state
    const { history } = this.props
    return (
      <div>
        <h4 className="mv3">{login ? "Login" : "Sign Up"}</h4>
        <div className="flex flex-column">
          {!login && (
            <input
              value={name}
              onChange={e => this.setState({ name: e.target.value })}
              type="text"
              placeholder="Your name"
            />
          )}
          <input
            value={email}
            onChange={e => this.setState({ email: e.target.value })}
            type="text"
            placeholder="Your email address"
          />
          <input
            value={password}
            onChange={e => this.setState({ password: e.target.value })}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>
        <div className="flex mt3">
          <Mutation
            mutation={login ? LOGIN_MUTATION : SIGNUP_MUTATION}
            variables={{ email, password, name }}
            onCompleted={data => this._confirm({ data, login, history })}
          >
            {mutation => (
              <button
                type="button"
                className="pointer mr2 button"
                onClick={mutation}
              >
                {login ? "login" : "create account"}
              </button>
            )}
          </Mutation>
          <button
            type="button"
            className="pointer button"
            onClick={() => this.setState({ login: !login })}
          >
            {login ? "need to create an account?" : "already have an account?"}
          </button>
        </div>
      </div>
    )
  }
}

export default Login
