/*
*	Copyright (C) 2014 Franz Josef Brünner
*	
*	This program is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.

*   You should have received a copy of the GNU General Public License
*   along with this program.  If not, see <http://www.gnu.org/licenses/>.

*   Dieses Programm ist Freie Software: Sie können es unter den Bedingungen
*   der GNU General Public License, wie von der Free Software Foundation,
*   Version 3 der Lizenz oder (nach Ihrer Wahl) jeder neueren
*   veröffentlichten Version, weiterverbreiten und/oder modifizieren.

*   Dieses Programm wird in der Hoffnung, dass es nützlich sein wird, aber
*   OHNE JEDE GEWÄHRLEISTUNG, bereitgestellt; sogar ohne die implizite
*   Gewährleistung der MARKTFÄHIGKEIT oder EIGNUNG FÜR EINEN BESTIMMTEN ZWECK.
*   Siehe die GNU General Public License für weitere Details.

*   Sie sollten eine Kopie der GNU General Public License zusammen mit diesem
*   Programm erhalten haben. Wenn nicht, siehe <http://www.gnu.org/licenses/>.
	
*/


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



function ByteCalculator(){}

ByteCalculator.prototype.getStringFromBytes = function(bytes) {
    var chars = [];
    for(var i = 0; i < bytes.length;) {
        chars.push(((bytes[i++] & 0xff) << 8) | (bytes[i++] & 0xff));
    }
    return String.fromCharCode.apply(null, chars);
};

ByteCalculator.prototype.getBytesFromString = function(str) {
    var bytes = [];
    for(var i = 0; i < str.length; i++) {
        var char = str.charCodeAt(i);
        bytes.push(char >>> 8, char & 0xFF);
    }
    return bytes;
};

ByteCalculator.prototype.decimal2binary = function(decimal){ 

  var binary = decimal.toString('2'); 
  return this._padString(binary);
  
};

ByteCalculator.prototype.binary2decimal = function(binary){
  
  var sum = 0;
  var bLetters = this._padString(String(binary)).split('').reverse();
  bLetters.forEach(function(letter,index){
     if(letter === '1'){
        sum += Math.pow(2,index);
     }
  });
  
  return sum;
  
};

ByteCalculator.prototype._padString = function(str){
  return new Array(Math.abs(9-(str.length))).join('0').concat(str);
};


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
  
  if(arguments[0] instanceof Image || arguments[0].nodeName === 'IMG'){
	cryptimg = arguments[0];
  }
  else if(arguments[1] instanceof Image || arguments[1].nodeName === 'IMG'){
	cryptimg = arguments[1];
  }
  
  if( !(cryptimg instanceof Image) && cryptimg.nodeName !== 'IMG' ){
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