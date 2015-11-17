import { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import style from './css/AdminApp.import.css';

export default class AdminApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div className={style.container}>
        <Link to="/">Back</Link>
        <h1>Admin</h1>
        {this.props.children}
      </div>
    )
  }
}
