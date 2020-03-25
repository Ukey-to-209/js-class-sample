function requestAjax(reqP){
    console.log(reqP);
    setTimeout(reqP.success(), 100000);
}

/**
 * スーパークラス.
 */
var Model = function(){
    console.log("Model",this);
    this.model    = null;
    this.reqParam = null;
    this.baseUrl  = "ss/ss/ss";
};
Model.prototype.request = function(){
    requestAjax(this.reqParam);
};
Model.prototype.getModel = function(){
    return this.model;
};
Model.prototype.isRequestComp = function(){
    return (this.model!==null);
}
Model.prototype.success = function(){
    this.model = "baseModel";
    console.log("suc",this.model);
};



/**
 * コンテントクラス.
 */
var Content = function(){
    console.log("Content",this);
    Model.call(this);
    this.addUrl = "/add";
};
// 継承させる.
Content.prototype = Object.create(Model.prototype);
Content.prototype.constructor = Content;
Content.prototype.createParam = function(){
    this.reqParam = {
        "url": this.baseUrl + this.addUrl,
        "success": this.success.bind(this),
    };
};
Content.prototype.success = function(){
    this.model = "ContentModel";
    console.log("Content:suc",this);
};


/**
 * User モデルクラス.
 */
var UserModel = function(){
    console.log("UserModel",this);
    Model.call(this);
    this.addUrl = "/user";
};
// 継承させる.
UserModel.prototype = Object.create(Model.prototype);
UserModel.prototype.constructor = UserModel;
UserModel.prototype.createParam = function(){
    this.reqParam = {
        "url": this.baseUrl + this.addUrl,
        "success": this.success.bind(this),
    };
};





var RequestController = function(){
    this.index = 0;
    this.tickId = -1;
    this.firstObj = [
        new Content(),
        new UserModel(),
    ];
    this.init();
};
RequestController.prototype.init = function(){
    this.tickId = setInterval( this.tick.bind(this), 1000 );
    this.request();
};
RequestController.prototype.tick = function(){
    if (this.firstObj[this.index].isRequestComp()){
        this.index++;
        this.request();
        if ( this.index === this.firstObj.length - 1 ){
            console.log("終了！！！");
            clearInterval(this.tickId);
        }
    }
};
RequestController.prototype.request = function(){
    this.firstObj[this.index].createParam();
    this.firstObj[this.index].request();
};

let p = new RequestController();
