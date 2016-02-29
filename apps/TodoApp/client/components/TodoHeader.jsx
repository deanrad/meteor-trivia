import { Component, PropTypes } from 'react';
import { BlazeToReact } from 'meteor/thereactivestack:blazetoreact';

const LoginButtons = BlazeToReact('loginButtons');

export default class TodoHeader extends Component {
  static propTypes = {
    hideCompleted: PropTypes.bool,
    toggleHideCompleted: PropTypes.func.isRequired,
    incompleteCount: PropTypes.number.isRequired
  };

  handleSubmit(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    var text = event.target.text.value;

    // Insert a task into the collection
    Meteor.call('addTask', text);

    // Clear form
    event.target.text.value = '';
  }

  render() {
    let form = null;

    if (Meteor.userId()) {
      form = (
        <form className="newTask" onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="text" placeholder="Type to add new tasks" />
        </form>
      );
    }

    return (
      <header>
        <h1>
          <img src={require('TodoApp/client/img/check.png')} alt="" />
          Todo List ({this.props.incompleteCount})
        </h1>

        <label className="hideCompleted">
          <input type="checkbox" checked={this.props.hideCompleted} onChange={this.props.toggleHideCompleted} />
          Hide Completed Tasks
        </label>

        <LoginButtons />

        {form}
      </header>
    );
  }
}
