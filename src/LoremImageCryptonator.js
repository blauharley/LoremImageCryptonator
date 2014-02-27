
function LoremImageCryptonator(){

  this._byteCal = new ByteCalculator();
  
}

LoremImageCryptonator.prototype.setImage = function(image){
  
  if(!image || !(image instanceof Image)){
    throw new Error('Argument-Error: @param image not overloaded!');
  }
  
  this._pdata = new PixelData(image);
  
};

LoremImageCryptonator.prototype.getCryptoImage = function(prop, callback){
   
  var text = prop.text || '';
  var opts = this._getOptions(prop.mode, prop.channel);
  
  this._pdata.getFormatedPixelData(function(rawPixels){
    
    var crypPixels = rawPixels;
    var cryptdata = crypPixels.data;
    
    for(var lindex=0; lindex < text.length; lindex++){
      
		var letter = text[lindex];
		var binary = this._byteCal.decimal2binary( this._byteCal.getBytesFromString(letter)[1] );
     
		for(var pixelPos=lindex*binary.length*4, num=0; pixelPos < (binary.length*4 + lindex*binary.length*4) && pixelPos < cryptdata.length; pixelPos+=4){
		
			var pixelChannel = cryptdata[pixelPos+opts.channel];
			
			if( opts.mode == 'slow' ){
			
				var channelBin = this._byteCal.decimal2binary( pixelChannel ).split(''); 
				channelBin[channelBin.length-1] = binary[num++];
				channelBin = channelBin.join('');
			
				var channelDec = this._byteCal.binary2decimal(channelBin);
				cryptdata[pixelPos+opts.channel] = channelDec;
			
			}
			else{
				
				var channelDec = this._byteCal.binary2decimal(binary);
				cryptdata[pixelPos+opts.channel] = channelDec;
				
				break;
				
			}
			
			
		}
		
    }
    
	// set decrypt-break point
	if( opts.mode == 'slow' ){
		cryptdata[pixelPos+opts.channel] = 0; 
		cryptdata[pixelPos+opts.channel+4] = 255;
    }
	else{
		cryptdata[pixelPos+opts.channel+32] = 0;
		cryptdata[pixelPos+opts.channel+64] = 255;
	}
	
    this._pdata2img(crypPixels,callback);
    
  }.bind(this));
  
};

LoremImageCryptonator.prototype.getTextFromCryptoImage = function(prop, cryptimg){
  
  var opts = {};
  if(arguments[0].constructor == Object){
	opts = arguments[0];
  }
  
  opts = this._getOptions(opts.mode, opts.channel);
  
  if(arguments[0] instanceof Image){
	cryptimg = arguments[0];
  }
  else if(arguments[1] instanceof Image){
	cryptimg = arguments[1];
  }
  
  if(!(cryptimg instanceof Image)){
    throw new Error('Argument-Error: @param cryptimg not overloaded!');
  }
  
  var calText = "";
  var charBits = "";
  var lastPixelChannel = -1;
  
  var cryptdata = this._img2pdata(cryptimg);
  var modePace = opts.mode == 'slow' ? 4 : 32;
  
  for(var pixelPos=0, letter=0; pixelPos < cryptdata.data.length; pixelPos+=modePace){
    
    var pixelChannel= cryptdata.data[pixelPos+opts.channel];
    
    if( lastPixelChannel == 0 && pixelChannel == 255 ){
      break;
    }
    
	if( opts.mode == 'slow' ){
	
		if( pixelPos % 32 === 0 && pixelPos > 0 ){
		  var decLetter = String.fromCharCode( this._byteCal.binary2decimal(charBits) );
		  calText += decLetter; 
		  charBits = "";
		}
		
		var blueBin = this._byteCal.decimal2binary( pixelChannel ).split(''); 
		charBits += blueBin[blueBin.length-1];
		
    }
	else{
		
		var decLetter = String.fromCharCode( pixelChannel );
		calText += decLetter; 
		
	}
	
    lastPixelChannel = pixelChannel;
    
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

LoremImageCryptonator.prototype._getOptions = function(mode, channel){
	channel = channel == 'red' ? 0 : (channel == 'green' ? 1 : (channel == 'blue' ? 2 : 3));
	mode = mode || 'slow';
	return { mode: mode, channel: channel };
};