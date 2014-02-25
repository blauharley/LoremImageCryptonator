
function PixelData(img){
  this._init(img);
}

PixelData.prototype.setImgage = function(img){ this._init(img); return this; };

PixelData.prototype.getFormatedPixelData = function(callback){
  
  if(!this._canvasimg){
    throw new Error('Runtime-Error: private varibale _canvasimg not set!');
  }
  
  callback(this._canvasimg.getContext('2d').getImageData(0,0,this._canvasimg.width,this._canvasimg.height));
  
};

PixelData.prototype.getImgWidth = function(){ return this._img.width; };

PixelData.prototype.getImgHeight = function(){ return this._img.height; };

PixelData.prototype._init = function(img){
  if(img){
    this._img = img;
    this._loadImg();
  }
};

PixelData.prototype._loadImg = function(){
  
  this._canvasimg = document.createElement('canvas');
  
  with(this._canvasimg){
    width = this._img.width;
    height = this._img.height;
    getContext('2d').drawImage(this._img, 0,0);
  }
  
};
