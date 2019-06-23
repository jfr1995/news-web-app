import React, { Component } from "react";
import * as ROLES from "../../constants /roles";
import * as ROUTES from "../../constants /routes";
import { compose } from "recompose";
import { withAuthorization, withEmailVerification } from "../Session/session";
import { withFirebase } from "../Firebase/index";
import { Switch, Route, Link } from "react-router-dom";

const AdminPage = () => (
  <div>
    <h1>Admin</h1>
    <p>This page is now accessible by every signed in Admin user</p>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </div>
);

class UserListBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // propetry to determine the state of the admin component
      loading: false,
      // a list where we can store the users
      users: []
    };
  } // end of constructor

  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({ users: usersList, loading: false });
    });
  } // end of component did mount

  componentWillUnmount() {
    this.props.firebase.users().off();
  } // end of component will unmount

  render() {
    const { users, loading } = this.state;
    return (
      <div>
        <h2> Users </h2>

        {loading && <div>Loading...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <span>
                <strong>ID:</strong>
                {user.uid}
              </span>
              <br />
              <span>
                <strong>Email:</strong>
                {user.email}
              </span>
              <br />
              <span>
                <strong>Username:</strong>
                {user.username}
              </span>
              <span>
                <Link to={`${ROUTES.ADMIN}/${user.uid}`}>Details</Link>
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  } // end of render
}

const condition = authUser => {
  return authUser && authUser.roles.includes(ROLES.ADMIN);
};

class UserItemBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      user: null,
      ...props.location.state
    };
  } // end of constructor

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  componentDidMount() {
    if (this.state.user) {
      return;
    }
    this.setState({ loading: true });
    this.props.firebase
      .user(this.props.match.params.id)
      .on("value", snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false
        });
      });
  } // end of component did mount

  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  } // end of component will unmount

  render() {
    const { user, loading } = this.state;
    return (
      <div>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}
        {user && (
          <div>
            <span>
              <strong>ID:</strong> {user.uid}
            </span>
            <span>
              <strong>E-Mail:</strong> {user.email}
            </span>
            <span>
              <strong>Username:</strong> {user.username}
            </span>
            <span>
              <Link
                to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user }
                }}
              >
                {" "}
                Details
              </Link>
            </span>
            <span>
              <button type="button" onClick={this.onSendPasswordResetEmail}>
                Send Password Reset
              </button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);
//export default withAuthorization(condition)(AdminPage);
export default compose(
  withEmailVerification,
  withAuthorization(condition),
  withFirebase
)(AdminPage);
