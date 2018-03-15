
//REQUIRE require allows you to user the already build modules (either by you, someone else. or nodejs)
const fs = require('fs');
const os = require('os');
const _ = require('lodash');
const yargs = require('yargs')
const notes = require('./notes.js')

const titleObjects = {
    describe: "Title of note",
    demand: true, //tells yards the title is required for add command to work
    alias: 't' //can use t instead of title
};

const bodyOptions = {
    describe: "Contents of new note",
    demand: true,
    alias: "b"
};

const argv = yargs
    .command('add', 'Add a new note', {
        title: titleObjects,
        body: bodyOptions
    })
    .command('list', 'List all previosly created notes')
    .command('read', 'Read a note', {
        title: titleObjects
    })
    .command('remove', 'Delete a note', {
        title: titleObjects
    })
    .help()
    .argv //the nice yargs formatted version of argv
var command = argv._[0];

if (command === "add") {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('note created');
        notes.logNote(note);
    } else {
        console.log('note title taken')
    }

} else if (command === "list") {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    })

} else if (command === "read") {
    var note = notes.read(argv.title); //stores return value of read function (which will be note title and body)
    if (note) {
        console.log("note read");
        notes.logNote(note);
    } else {
        console.log('no note by that title could be found');
    }

} else if (command === "remove") {
    var noteRemoved = notes.remove(argv.title); //will be true or false based on returned value of remove function (t or f)
    var message = noteRemoved ? 'Note was removed' : "No note was removed, could not find note with specified title";
    console.log(message);
} else {
    console.log("command not recognized");
}