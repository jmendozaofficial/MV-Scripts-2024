Scene_Menu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandFrame();
    this.createCommandWindow();
    // this.createGoldWindow();
    this.createStatusWindow();
    this._statusWindow.opacity = 0;
    this._commandWindow.opacity = 0;
    this._frameBottom = new Sprite();
    this.addChild(this._frameBottom);
};

Scene_Menu.prototype.createCommandFrame = function() {
    this.commandFrameLeft = new Sprite();
    this.commandFrameLeft.bitmap = ImageManager.loadPicture("Menu_Frame_Left");
    this.addChildAt(this.commandFrameLeft, 1);
};

Scene_Menu.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);
    this._frameBottom.bitmap = ImageManager.loadPicture("Frame_Down_" + this._commandWindow._index);

}
