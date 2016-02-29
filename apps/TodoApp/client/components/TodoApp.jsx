import { Component } from 'react';
import ReactMixin from 'react-mixin';

import TodoHeader from './TodoHeader';
import TodoList from './TodoList';

import Tasks from 'TodoApp/collections/Tasks';
import 'TodoApp/client/css/TodoApp.import.css'

@ReactMixin.decorate(ReactMeteorData)
export default class TodoMain extends Component {

  state = {
    hideCompleted: false
  };

  getMeteorData() {
    Meteor.subscribe('tasks');

    let taskFilter = {};

    if (this.state.hideCompleted) {
      taskFilter.checked = {$ne: true};
    }

    const tasks = Tasks.find(taskFilter, {sort: {createdAt: -1}}).fetch();
    const incompleteCount = Tasks.find({checked: {$ne: true}}).count();

    return {
      tasks,
      incompleteCount,
      user: Meteor.user()
    };
  }

  handleToggleHideCompleted = (e) => {
    this.setState({ hideCompleted: e.target.checked });
  };

  render() {
    if (!this.data.tasks) {
      // loading
      return null;
    }

    return (
        <div className="container">
          <TodoHeader
              incompleteCount={this.data.incompleteCount}
              hideCompleted={this.state.hideCompleted}
              toggleHideCompleted={this.handleToggleHideCompleted}
          />
          <TodoList tasks={this.data.tasks} />
        </div>
    );
  }
};
