//-----------------------------------------------------------------------------
// Midnight Circle Scene_Status
// Modified by: Janrae Mendoza aka Tatsumi
// The scene class of the status screen.



function Scene_Status() {
    this.initialize.apply(this, arguments);
}

Scene_Status.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Status.prototype.constructor = Scene_Status;

Scene_Status.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Status.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = ImageManager.loadPicture("Status_Backdrop");
    this.addChild(this._backgroundSprite);
};

Scene_Status.prototype.createProfileBlock = function() {
    this.profileBlock = new Sprite();
    this.profileBlock.bitmap = ImageManager.loadPicture("Profile_Block");
    this.profileBlock.x = -500;
    this.addChild(this.profileBlock);
}

Scene_Status.prototype.createUpperLine = function() {
    this.upperLine = new Sprite();
    this.upperLine.bitmap = ImageManager.loadPicture("UpperLine");
    this.upperLine.x = 2000;
    this.addChild(this.upperLine);
}

Scene_Status.prototype.createLowerLine = function() {
    this.lowerLine = new Sprite();
    this.lowerLine.bitmap = ImageManager.loadPicture("LowerLine");
    this.lowerLine.x = -2000;
    this.addChild(this.lowerLine);
}

Scene_Status.prototype.createActorDescription = function() {
    this.actorDescription = new Sprite();
    
    this.actorDescription.x = -2000;
    this.addChild(this.actorDescription);
}


Scene_Status.prototype.createActorPortrait = function() {
    this.actorPortrait = new Sprite();
    this.actorPortrait.x = 1400;
    this.addChild(this.actorPortrait);
}

Scene_Status.prototype.createActorNameAndAge = function() {
    this.actorNameAndAge = new Sprite();
    this.actorNameAndAge.x = 1400;
    this.addChild(this.actorNameAndAge);
}


Scene_Status.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this._statusWindow = new Window_Status();
    this._statusWindow.opacity = 0;
    this._statusWindow.setHandler('cancel',   this.popScene.bind(this));
    this._statusWindow.setHandler('pagedown', this.nextActor.bind(this));
    this._statusWindow.setHandler('pageup',   this.previousActor.bind(this));
    this._statusWindow.reserveFaceImages();
    this.addWindow(this._statusWindow);

    // add the things we should have in the status screen
    this.createProfileBlock();
    this.createUpperLine();
    this.createLowerLine();
    this.createActorPortrait();
    this.createActorNameAndAge();
    this.createActorDescription();
};

Scene_Status.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this); // update the screen.
    // this is where we animate the whole stuff:
    if (this.profileBlock.x < 0) {
        this.profileBlock.x += 50;
    } 
    if (this.upperLine.x > 0) {
        this.upperLine.x -= 100;
    } else {this.upperLine.x = 0;}
    if (this.lowerLine.x < 0) {
        this.lowerLine.x += 100;
    } else {this.lowerLine.x = 0;}   
    if (this.actorPortrait.x > 0) {
        this.actorPortrait.x -= 50;
    } else {this.actorPortrait.x = 0;}
    if (this.actorNameAndAge.x > 0) {
        this.actorNameAndAge.x -= 40;
    } else {this.actorNameAndAge.x = 0;}    
    if (this.actorDescription.x < 0) {
        this.actorDescription.x += 100;
    } else {this.actorDescription.x = 0;}       
}

Scene_Status.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.refreshActor();
};

Scene_Status.prototype.refreshActor = function() {
    var actor = this.actor();
    this._statusWindow.setActor(actor);
    this.actorPortrait.bitmap = ImageManager.loadPicture(actor._name + "_StatusPortrait");
    this.actorNameAndAge.bitmap = ImageManager.loadPicture(actor._name + "_NameAndAge");
    this.actorDescription.bitmap = ImageManager.loadPicture(actor._name + "_Description");
};

Scene_Status.prototype.onActorChange = function() {
    this.refreshActor();
    this._statusWindow.activate();
    this.profileBlock.x = -500;
    this.upperLine.x = 2000;
    this.lowerLine.x = -2000;
    this.actorDescription.x = -2000;
    this.actorPortrait.x = 1400;
    this.actorNameAndAge.x = 1400;
};
