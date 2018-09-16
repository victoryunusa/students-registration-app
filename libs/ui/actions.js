import { Template } from 'meteor/templating';
 
import { Students } from '../api/students.js';
 
import './actions.html';
 
Template.student.events({
  'click .toggle-checked'() {
    // Set the checked property to the opposite of its current value
    Students.update(this._id, {
      $set: { checked: ! this.checked },
    });
  },
  'click .delete'() {
    Students.remove(this._id);
  },

  'click .update-student'() {
  
    console.log(this.firstName);
    // Students.remove(this._id);
  },
});