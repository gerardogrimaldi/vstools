VSTOOLS.SHP = function ( reader ) {

	VSTOOLS.WEP.call( this, reader );

};

VSTOOLS.SHP.prototype = Object.create( VSTOOLS.WEP.prototype );

VSTOOLS.SHP.prototype.read = function () {

	this.header();
	this.data();

};

VSTOOLS.SHP.prototype.header = function () {

	var u8 = this.u8, s8 = this.s8, u16 = this.u16, s16 = this.s16, u32 = this.u32,
		skip = this.skip;

	this.header1(); // inherited from WEP

	this.overlayX = [];
	this.overlayY = [];
	this.width = [];
	this.height = [];

	for ( var i = 0; i < 8; ++i ) {

		this.overlayX.push( u8() );
		this.overlayY.push( u8() );
		this.width.push( u8() );
		this.height.push( u8() );

	}

	skip( 0x24 ); // unknown

	skip( 0x6 ); // collision, not sure about this
	this.menuPositionY = s16();
	skip( 0xc ); // u
	this.shadowRadius = s16();
	this.shadowSizeIncrease = s16();
	this.shadowSizeDecrease = s16();
	skip( 4 );

	this.menuScale = s16();
	skip( 2 );
	this.targetSpherePositionY = s16();
	skip( 8 );

	this.animLBAs = [];
	for ( var i = 0; i < 0xC; ++i ) {

		this.animLBAs.push( u32() );

	}

	this.chainIds = [];
	for ( var i = 0; i < 0xC; ++i ) {

		this.chainIds.push( u16() );

	}

	this.specialLBAs = [];
	for ( var i = 0; i < 4; ++i ) {

		this.specialLBAs.push( u32() );

	}

	skip( 0x20 ); // unknown, more lbas?

	this.magicPtr = u32() + 0xF8;
	skip( 0x18 * 2 ); // TODO whats this?
	this.akaoPtr = u32() + 0xF8;
	this.groupPtr = u32() + 0xF8;
	this.vertexPtr = u32() + 0xF8;
	this.facePtr = u32() + 0xF8;

	// static, unused
	this.bonePtr = 0x138;

};

VSTOOLS.SHP.prototype.data = function () {

	var u16 = this.u16, u32 = this.u32, skip = this.skip;

	// inherited
	this.boneSection();
	this.groupSection();
	this.vertexSection();
	this.faceSection();

	// skip akao
	skip( this.magicPtr - this.akaoPtr );

	// skip magic section
	skip( 4 );
	var length = u32();
	skip( length );

	// inherited
	this.textureSection( 2 ); // 2 palettes

};
