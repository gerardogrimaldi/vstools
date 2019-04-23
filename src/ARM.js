VSTOOLS.ARM = function ( reader ) {

	reader.extend( this );

};

VSTOOLS.ARM.prototype.read = function () {

	var u32 = this.u32;

	var numRooms = this.numRooms = u32();
	var rooms = this.rooms = [];

	// headers
	for ( var i = 0; i < numRooms; ++i ) {

		var room = new VSTOOLS.ARMRoom( this.reader );
		room.header();
		rooms.push( room );

	}

	// graphics
	for ( var i = 0; i < numRooms; ++i ) {

		rooms[ i ].graphics();

	}

	// names
	for ( var i = 0; i < numRooms; ++i ) {

		rooms[ i ].name();

	}

};

VSTOOLS.ARM.prototype.build = function () {

	var object = this.object = new THREE.Object3D();
	var numRooms = this.numRooms;

	for ( var i = 0; i < numRooms; ++i ) {

		var room = this.rooms[ i ];
		room.build();
		object.add( room.mesh );
		object.add( room.lines );

	}

	object.rotation.x = Math.PI;

  	var exporter = new THREE.OBJExporter();

	var objectExportJson = object.toJSON();

	document.getElementById('exportJSON').innerText = exporter.parse(object);

};
