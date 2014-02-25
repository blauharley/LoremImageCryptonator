
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