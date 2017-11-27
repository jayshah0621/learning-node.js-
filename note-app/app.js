console.log("Starting app.js");

const fs 	= require('fs');
const _ 	= require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const argv 	= yargs.argv;

var command = argv._[0];
console.log(`Performing Operation: ${command}.`);

switch( command ) {
	case 'add':
		var note = notes.addNote( argv.title, argv.body );
		if( note ) console.log( 'Note created succesfully.' );
		else console.log( `${argv.title} already exists.` );
		break;
	case 'list':
		var note = notes.listNotes();
		break;
	case 'read':
		var note = notes.readNote( argv.title );

		if( note ) {
			console.log( `${argv.title} found.` );
			console.log( '--' );
			console.log( `Note Body: ${note.body}` );
		}else {
			console.log( `${argv.title} not found.` );
		}
		break;
	case 'remove':
		var noteRemoved = notes.removeNote( argv.title );
		var msg = noteRemoved ? `${argv.title} removed.` : `${argv.title} not found.`;
		console.log( msg );
		break;
	default:
		console.log('Command not recognized.');
		break;
}
