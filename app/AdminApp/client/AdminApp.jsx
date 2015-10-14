import { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class AdminApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div className="container">
        <Link to="/">Back</Link>
        <h1>Admin</h1>
        {this.props.children}
      </div>
    )
  }
}
