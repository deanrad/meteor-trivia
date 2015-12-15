import { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class TodoApp extends Component {
  static propTypes = {
    children: PropTypes.any.isRequired
  }

  render() {
    return (
      <div>
        <Helmet
          title="Todo App"
          meta={[
            { name: 'description', content: 'This is a Todo application!' }
          ]}
        />
        {this.props.children}
      </div>
    );
  }
}
