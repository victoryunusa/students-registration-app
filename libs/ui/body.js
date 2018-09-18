import { Meteor } from 'meteor/meteor';

import { Template } from 'meteor/templating';
 
import { Students } from '../api/students.js';

import './actions.js';
import './body.html';

var deleteArray = [];

Template.body.onCreated(function bodyOnCreated() {
  this.state = new ReactiveDict();
  Meteor.subscribe('students');
});
 
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

    const id = target.id.value;

    var data = { firstName, lastName, gender, dateOfBirth, createdAt: new Date(), }
 
    // Insert a task into the collection
    if (id)
    {
    	
      Meteor.call('student.update', id, data);
    } 
    else 
    {
    	Meteor.call('student.insert', data);
    	
    }
 
    // Clear form
    target.firstName.value = '';
    target.lastName.value = '';
    target.gender.value = '';
    target.dateOfBirth.value = '';
    target.id.value = '';
  },

  'click .update-student'(event) {
  	
  	// var id = event.target.id;
  	// var student = Students.findOne({"_id":id});
  	var form = document.querySelector('#myForm');

  	form.id.value = this._id;
  	form.firstName.value = this.firstName;
  	form.lastName.value = this.lastName;
  	form.gender.value = this.gender;
  	form.dateOfBirth.value = this.dateOfBirth;
    // Students.remove(this._id);
  },

  'click .deleteCheckbox' (event){
  	var id = event.target.value;
  	if(event.target.checked){
  		deleteArray.push(id);
  	} else {
  		deleteArray.splice(deleteArray.indexOf(id), 1);
  	}
  },

  'click #deleteStudent' (event){
   	for(var i =0; i<deleteArray.length; i++){
      id = deleteArray[i];
      Meteor.call('student.remove', id);
   	}

    var form = document.querySelector('#myForm');
    form.id.value = "";
    form.firstName.value = "";
    form.lastName.value = "";
    form.gender.value = "";
    form.dateOfBirth.value = "";
  },
});