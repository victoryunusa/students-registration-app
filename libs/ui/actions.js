import { Template } from 'meteor/templating';
 
import { Students } from '../api/students.js';
 
import './actions.html';
 
Template.student.events({
  
  'click .delete'() {
  	var id = this._id;
   Meteor.call('student.delete', id);
  },

  
});