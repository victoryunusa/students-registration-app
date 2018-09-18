import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('students', function tasksPublication() {
    return Students.find();
  });
}

Meteor.methods({
  'student.insert'(data) {
   
   
      // Make sure the user is logged in before inserting a task
      if (! Meteor.userId()) {
        throw new Meteor.Error('not-authorized');
      }
   
      Students.insert(data);
    },

    'student.update'(id, data){

      Students.update(id,{$set: data}

      );

    },

    'student.remove' (id){
      Students.remove(id);
    },

    'student.delete'(id){

       Students.remove(id);

    },
});