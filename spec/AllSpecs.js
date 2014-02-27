
describe("All-Tests", function() {


	describe("BayteCalculator-Tests", function() {

	  var sentence = "This is a Test to check the ByteCalculator up and test it whether it works correctly.";
	  var calulator = new ByteCalculator();
	  var word = '';
	  var byteWordRep;
	  
	  beforeEach(function() {
		word = sentence.split(' ')[ Math.floor(Math.random() * sentence.split(' ').length) ];
		byteWordRep = [];
		word.split('').forEach(function(letter){
			byteWordRep.push( calulator._padString( letter.charCodeAt().toString('2') ) );
		});
	  });

	  it("should get same binary", function() {
		
		var pos = Math.floor(Math.random() * word.length);
		var letterBin = calulator.decimal2binary( word[ pos ].charCodeAt() );
		
		expect(letterBin).toEqual( byteWordRep[pos] );
		
	  });

	  
	});


	

	describe("LoremImageCryptonator-Tests", function() {

	  var sentences = ["This is a Test to check the ByteCalculator up and test it whether it works correctly.", "A top-secret sentence","Another sentences for testing"];
	
	  var cryptonator = new LoremImageCryptonator();
	  var images = ['./img/desert.jpg', './img/thunder.jpg', './img/island.jpg'];
	  var countTest = 0;
	  
	  var cryptoImg;
	  var mode;
	  var channel;
	  
	  beforeEach(function() {
		
		var imgLoaded = false;
		
		runs(function(){
			
			var randNum = Math.floor( Math.random() * 3 );
			
			mode =  randNum == 1 ? 'slow' : 'fast';
			channel = randNum == 1 ? 'red' : (randNum == 2 ? 'green' : 'blue');
			
			var img = new Image();

			img.onload = function(){

			  cryptonator.setImage(img);
			  
			  cryptonator.getCryptoImage({mode:mode,channel: channel, text:sentences[countTest] },function(cimg){
				cryptoImg = cimg;
				imgLoaded = true;
			  });
			  
			};

			img.src=images[countTest];
			
		});
		
		waitsFor(function() {
			return imgLoaded;
		}, "CryptoImage should have been created", 5000); 
	  
	  });

	  
	  it("should get sentence out of first Crypto-Image", function() {
		
		var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cryptoImg);
		var sentence =  sentences[countTest++] ;
		
		expect(text).toEqual( sentence );
		
	  });
	  
	  
	  it("should get sentence out of second Crypto-Image", function() {
		
		var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cryptoImg);
		var sentence =  sentences[countTest++] ;
		
		expect(text).toEqual( sentence );
		
	  });

	  
	  it("should get sentence out of third Crypto-Image", function() {
		
		var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cryptoImg);
		var sentence =  sentences[countTest++] ;
		
		expect(text).toEqual( sentence );

	  });
	  
	  
	});
	

});