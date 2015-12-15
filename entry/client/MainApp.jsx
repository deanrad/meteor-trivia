import { Component } from 'react';
import Helmet from 'react-helmet';

export default class MainApp extends Component {
  render() {
    return (
      <div>
        <Helmet
          meta={[
            { name: 'viewport', content: 'width=device-width, initial-scale=1' }
          ]}
        />
        {this.props.children}
      </div>
    )
  }
}
