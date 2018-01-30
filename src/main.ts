import RxDB from 'rxdb';
import {RxJsonSchema} from 'rxdb';
import pouchdbAdapterIDB = require("pouchdb-adapter-idb");
import pouchdbAdapterWebSQL = require("pouchdb-adapter-websql");

async function createDB():Promise<void> {
	// RxDB.plugin(pouchdbAdapterWebSQL);
	RxDB.plugin(pouchdbAdapterIDB);

	const db = await RxDB.create({
	  name: 'heroesdb',           // <- name
	  adapter: 'idb',          // <- storage-adapter
	  password: 'sdfsdfsdf',     // <- password (optional)
	});
	console.dir(db);

	const mySchema = {
	  "title": "hero schema",
	  "version": 0,
	  "description": "describes a simple hero",
	  "type": "object",
	  "properties": {
	      "name": {
	          "type": "string",
	          "primary": true
	      },
	      "color": {
	          "type": "string"
	      },
	      "healthpoints": {
	          "type": "number",
	          "min": 0,
	          "max": 100
	      },
	      "secret": {
	          "type": "string",
	          "encrypted": true
	      },
	      "birthyear": {
	          "type": "number",
	          "final": true,
	          "min": 1900,
	          "max": 2050
	      },
	      "skills": {
	          "type": "array",
	          "maxItems": 5,
	          "uniqueItems": true,
	          "item": {
	              "type": "object",
	              "properties": {
	                  "name": {
	                      "type": "string"
	                  },
	                  "damage": {
	                      "type": "number"
	                  }
	              }
	          }
	      }
	  },
	  "required": ["color"]
	} as RxJsonSchema;

	db.collection({
			  name: 'humans',
			  schema: mySchema
			})
  	.then(collection => console.dir(collection));
}

createDB();

