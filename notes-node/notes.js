
//console.log(module); shows you a ton of properties 
//module.exports.age = 25; using export property in module object, set age to 25
const fs = require('fs');

var fetchNotes = () => {
    try { //incase this code doesnt work bc theres theres no notes-data since that was the first note
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) { //do this instead...
        return [];
    } 
    
};

var saveNote = (notes) => {
    fs.writeFileSync("notes-data.json", JSON.stringify(notes))

}

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title: title,
        body: body
    };

    //loop thru notes array: if any title in notes array matches the new note title, put it into the dupe notes array
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNote(notes);
        return note; 
    } else { console.log('dupe title')};
};

var getAll = () => {
    console.log("getting all notes");
    return fetchNotes();
};

var read = (title) => {
    console.log("reading note: ", title)
    //fetch notes
    var notes = fetchNotes();
    // console.log(notes);

    //filter out note that needs to be read 
    var filteredNote = notes.filter( (note) => note.title === title);
    //console.log(filteredNote);
    
    //return statement
    return filteredNote[0];
}

var remove = (title) => {
    console.log("removing notes: ", title)
    //fetch notes
    var notes = fetchNotes();
    //filter note, removing one with title of argument
    var filteredNotes = notes.filter((note) => note.title != title);
    //save new notes array 
    saveNote(filteredNotes);

    //if original array is longer than filtered notes array, its TRUE that a note was deleted. otherwise return false
    return notes.length !== filteredNotes.length;
    

}

var logNote = (note) => {
    debugger;
    console.log ("-----");
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}


module.exports = {
    addNote: addNote,
    getAll: getAll,
    remove: remove,
    read: read,
    logNote: logNote
}

