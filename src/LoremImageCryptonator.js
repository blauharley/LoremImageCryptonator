
function LoremImageCryptonator(){

  this._byteCal = new ByteCalculator();
  
}

LoremImageCryptonator.prototype.setImage = function(image){
  
  if(!image || !(image instanceof Image)){
    throw new Error('Argument-Error: @param image not overloaded!');
  }
  
  this._pdata = new PixelData(image);
  
};

LoremImageCryptonator.prototype.getCryptoImage = function(text, callback){
   
  if(!text || (text && text.constructor !== String)){
    throw new Error('Argument-Error: @param text not overloaded!');
  }
  
  this._pdata.getFormatedPixelData(function(rawPixels){
    
    var crypPixels = rawPixels;
    var cryptdata = crypPixels.data;
    
    for(var lindex=0; lindex < text.length; lindex++){
      
      var letter = text[lindex];
      var binary = this._byteCal.decimal2binary( this._byteCal.getBytesFromString(letter)[1] );
      
      for(var pixelPos=lindex*binary.length*4, num=0; pixelPos < (binary.length*4 + lindex*binary.length*4) && pixelPos < cryptdata.length; pixelPos+=4){
        
        var bluePixel = cryptdata[pixelPos+2];
        
        var blueBin = this._byteCal.decimal2binary( bluePixel ).split(''); 
        blueBin[blueBin.length-1] = binary[num++];
        blueBin = blueBin.join('');
        
        var blueDec = this._byteCal.binary2decimal(blueBin);
        cryptdata[pixelPos+2] = blueDec;
        
      }
      
    }
    
    cryptdata[pixelPos+2] = 0;
    cryptdata[pixelPos+6] = 255;
    
    this._pdata2img(crypPixels,callback);
    
  }.bind(this));
  
};

LoremImageCryptonator.prototype.getTextFromCryptoImage = function(cryptimg){
  
  if(!cryptimg || !(cryptimg instanceof Image)){
    throw new Error('Argument-Error: @param cryptimg not overloaded!');
  }
  
  var calText = "";
  var charBits = "";
  var lastBluePixel = -1;
  
  var cryptdata = this._img2pdata(cryptimg);
  
  for(var pixelPos=0, letter=0; pixelPos < cryptdata.data.length; pixelPos+=4){
    
    var bluePixel = cryptdata.data[pixelPos+2];
    
    if( lastBluePixel == 0 && bluePixel == 255 ){
      break;
    }
    
    if( pixelPos % 32 === 0 && pixelPos > 0 ){
	  var decLetter = String.fromCharCode( this._byteCal.binary2decimal(charBits) );
      calText += decLetter; 
      charBits = "";
    }
    
    var blueBin = this._byteCal.decimal2binary( bluePixel ).split(''); 
    charBits += blueBin[blueBin.length-1];
    
    lastBluePixel = bluePixel;
    
  }
  
  return calText;
  
};



LoremImageCryptonator.prototype._pdata2img = function(pdata,callback){
  
  var imgcan = document.createElement('canvas');
  
  imgcan.width = this._pdata.getImgWidth();
  imgcan.height = this._pdata.getImgHeight();
  
  imgcan.getContext('2d').putImageData(pdata, 0,0);
    
  var img = new Image();

  img.onload = function(){
    callback(img);
  };
  
  img.src = imgcan.toDataURL('image/png');
  
  
};

LoremImageCryptonator.prototype._img2pdata = function(img){
  
  var imgcan = document.createElement('canvas');
  
  imgcan.width = img.width;
  imgcan.height = img.height;
  
  imgcan.getContext('2d').drawImage(img, 0,0);
    
  return imgcan.getContext('2d').getImageData(0,0,imgcan.width,imgcan.height);
  
};
