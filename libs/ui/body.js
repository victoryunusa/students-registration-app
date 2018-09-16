import { Template } from 'meteor/templating';
 
import { Students } from '../api/students.js';

import './actions.js';
import './body.html';
 
Template.body.helpers({
  students() {
      return Students.find({}, { sort: { createdAt: -1 } });
  },
});
 
Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();
 
    // Get value from form element
    const target = event.target;
    const firstName = target.firstName.value;
    const lastName = target.lastName.value;
    const gender = target.gender.value;
    const dateOfBirth = target.dateOfBirth.value;
 
    // Insert a task into the collection
    Students.insert({
      firstName,
      lastName,
      gender,
      dateOfBirth,
      createdAt: new Date(), // current time
    });
 
    // Clear form
    target.firstName.value = '';
    target.lastName.value = '';
    target.gender.value = '';
    target.dateOfBirth.value = '';
  },
});