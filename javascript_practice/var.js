/*
Introduction:

This program shows the implementation of variables in javascript. Variables holds values and here I am showing
a function that returns my fullname storing my first name and last name in variables.

*/

var firstName = "Venkatesh";
var lastName = "Devale";

var myAge = 23;

function getFullName(first, last) {
	return first + last;
}


console.log("My name is:" + getFullName(firstName, lastName) + ", my age is 23");