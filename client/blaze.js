import { Template } from 'meteor/templating'
import './blaze.html'

Template.blaze.helpers({
  latestOfObservable: () => 2
})
