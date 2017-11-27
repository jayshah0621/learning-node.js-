console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
	try {
		var noteString = fs.readFileSync( 'notes-data.json' );
		return JSON.parse( noteString );
	} catch( err ) {
		return [];
	}
}

var saveNote = ( notes ) => {
	fs.writeFileSync( 'notes-data.json', JSON.stringify( notes ) );
};

var addNote = ( title, body ) => {
	var notes 	= fetchNotes(),
		note 	= {
					title,
					body
				},
		duplicateNotes = notes.filter( ( note ) => note.title === title );

	if( duplicateNotes.length === 0 ) {
		notes.push( note );
		saveNote( notes );
		return note;
	}
};

var listNotes = () => {
	console.log( 'Listing all notes.' );
};

var readNote = ( title ) => {
	console.log( 'Reading note: ', title );
}

var removeNote = ( title ) => {
	var notes = fetchNotes(),
		uniqueNotes = notes.filter( ( note ) => note.title !== title ),
		boolNoteFound = notes.length !== uniqueNotes.length;

	if( boolNoteFound ) saveNote(uniqueNotes);

	return boolNoteFound;
}

module.exports = {
	addNote,
	listNotes,
	readNote,
	removeNote
};
