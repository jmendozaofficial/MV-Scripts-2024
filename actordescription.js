//-----------------------------------------------------------------------------
// Window_ActorDescription
//
// The window for displaying full status on the status screen.

function Window_ActorDescription() {
    this.initialize.apply(this, arguments);
}

Window_ActorDescription.prototype = Object.create(Window_Selectable.prototype);
Window_ActorDescription.prototype.constructor = Window_ActorDescription;

Window_ActorDescription.prototype.initialize = function() {
    var width = Graphics.boxWidth;
    var height = Graphics.boxHeight;
    Window_Selectable.prototype.initialize.call(this, 0, 0, width, height);
    this._actor = null;
    this.refresh();
    this.activate();
};

Window_ActorDescription.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_ActorDescription.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock1(lineHeight * 0);
        this.drawHorzLine(lineHeight * 1);
        // this.drawBlock2(lineHeight * 2);
        // this.drawHorzLine(lineHeight * 6);
        this.drawBlock3(lineHeight * 7);
        // this.drawHorzLine(lineHeight * 13);
        // this.drawBlock4(lineHeight * 14);
    }
};

Window_ActorDescription.prototype.drawBlock1 = function(y) {
    this.drawActorName(this._actor, 6, y);
    this.drawActorClass(this._actor, 192, y);
    this.drawActorNickname(this._actor, 520, y);
};

Window_ActorDescription.prototype.drawBlock2 = function(y) {
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
    this.drawExpInfo(456, y);
};

Window_ActorDescription.prototype.drawBlock3 = function(y) {
    this.drawEXParameters(48, y);

};

Window_ActorDescription.prototype.drawBlock4 = function(y) {
    this.drawProfile(6, y);
};

Window_ActorDescription.prototype.drawHorzLine = function(y) {
    var lineY = y + this.lineHeight() / 2 - 1;
    this.contents.paintOpacity = 48;
    this.contents.fillRect(0, lineY, this.contentsWidth(), 2, this.lineColor());
    this.contents.paintOpacity = 255;
};

Window_ActorDescription.prototype.lineColor = function() {
    return this.normalColor();
};

Window_ActorDescription.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorLevel(this._actor, x, y + lineHeight * 0);
    this.drawActorIcons(this._actor, x, y + lineHeight * 1);
    this.drawActorHp(this._actor, x, y + lineHeight * 2);
    this.drawActorMp(this._actor, x, y + lineHeight * 3);
};

Window_ActorDescription.prototype.drawEXParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 1; i++) {
        var paramId = i;
        var y2 = y + lineHeight * i;
        this.changeTextColor(this.systemColor());
        var exParamText = ["Literary Knowledge"]
        this.drawText(exParamText[paramId], x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.exparam(paramId), x + 160, y2, 60, 'right');
    }
};

Window_ActorDescription.prototype.drawXParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 10; i++) {
        var paramId = i;
        var y2 = y + lineHeight * i;
        var xParamNames = [
        "Hit Rate", 
        "Evasion Rate", 
        "Critical Hit Rate", 
        "Critical Evasion", 
        "Magic Evasion", 
        "Magic Reflection",
        "Counter Attack", 
        "MHE Regeneration", 
        "MSE Regeneration",
        "AE Regeneration"]
        this.changeTextColor(this.systemColor());
        this.drawText(xParamNames[paramId], x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.xparam(paramId), x + 160, y2, 60, 'right');
    }
}

Window_ActorDescription.prototype.drawSParameters = function(x, y) {
    var lineHeight = this.lineHeight();
    for (var i = 0; i < 10; i++) {
        var paramId = i;
        var y2 = y + lineHeight * i;
        var xParamNames = [
        "Target Rate", 
        "Guard Effect", 
        "Recovery Rate", 
        "Pharmacology", 
        "MSE Cost Rate", 
        "AE Charge Rate",
        "Phys. Damage Rate", 
        "Mag. Damage Rate", 
        "Floor Damage",
        "Experience Rate"]
        this.changeTextColor(this.systemColor());
        this.drawText(xParamNames[paramId], x, y2, 160);
        this.resetTextColor();
        this.drawText(this._actor.xparam(paramId), x + 160, y2, 60, 'right');
    }
}

Window_ActorDescription.prototype.drawExpInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    var expTotal = TextManager.expTotal.format(TextManager.exp);
    var expNext = TextManager.expNext.format(TextManager.level);
    var value1 = this._actor.currentExp();
    var value2 = this._actor.nextRequiredExp();
    if (this._actor.isMaxLevel()) {
        value1 = '-------';
        value2 = '-------';
    }
    this.changeTextColor(this.systemColor());
    this.drawText(expTotal, x, y + lineHeight * 0, 270);
    this.drawText(expNext, x, y + lineHeight * 2, 270);
    this.resetTextColor();
    this.drawText(value1, x, y + lineHeight * 1, 270, 'right');
    this.drawText(value2, x, y + lineHeight * 3, 270, 'right');
};

Window_ActorDescription.prototype.drawEquipments = function(x, y) {
    var equips = this._actor.equips();
    var count = Math.min(equips.length, this.maxEquipmentLines());
    for (var i = 0; i < 11; i++) {
        this.drawItemName(equips[i], x, y + this.lineHeight() * i);
    }
};

Window_ActorDescription.prototype.drawProfile = function(x, y) {
    this.drawTextEx(this._actor.profile(), x, y);
};

Window_ActorDescription.prototype.maxEquipmentLines = function() {
    return 6;
};

function Scene_Description() {
    this.initialize.apply(this, arguments);
}

Scene_Description.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Description.prototype.constructor = Scene_Description;

Scene_Description.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Description.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createActorDescriptionWindow();
};

Scene_Description.prototype.createActorDescriptionWindow = function() {
    this.actorDescWindow = new Window_ActorDescription();
    this.actorDescWindow.setHandler('cancel',   this.popScene.bind(this));
    this.actorDescWindow.setHandler('pagedown', this.nextActor.bind(this));
    this.actorDescWindow.setHandler('pageup',   this.previousActor.bind(this));
    this.actorDescWindow.reserveFaceImages();
    this.addChild(this.actorDescWindow);
};

Scene_Description.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this.refreshActor();
};

Scene_Description.prototype.refreshActor = function() {
    var actor = this.actor();
    this.actorDescWindow.setActor(actor);
};


Scene_Description.prototype.onActorChange = function() {
    this.refreshActor();
    this.actorDescWindow.activate();
};

