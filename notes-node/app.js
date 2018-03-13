console.log('Starting app.js');
//REQUIRE require allows you to user the already build modules (either by you, someone else. or nodejs)
const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs')
const notes = require('./notes.js')

const argv = yargs.argv //the nice yargs formatted version of argv
var command = argv._[0];
console.log('Command: ', command);
// console.log('Process: ',process.argv)
console.log('Yargs: ',argv);

if (command==="add") {
   var note = notes.addNote(argv.title, argv.body);
   if (note) {
    console.log('note created');
    notes.logNote(note);
   } else {
    console.log('note title taken')
   }
   
} else if (command==="list") {
    notes.getAll();

} else if (command ==="read"){
    var note = notes.read(argv.title); //stores return value of read function (which will be note title and body)
    if (note) {
        console.log("note read");
        notes.logNote(note);
    } else {
        console.log('no note by that title could be found');
    }
    
} else if (command ==="remove"){
    var noteRemoved = notes.remove(argv.title); //will be true or false based on returned value of remove function (t or f)
    var message = noteRemoved ? 'Note was removed' : "No note was removed, could not find note with specified title";
    console.log(message);
} else {
    console.log("command not recognized");
}