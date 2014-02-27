
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

	  var sentences = ["This is a Test to check the ByteCalculator up and test it whether it works correctly.", "A top-secret sentence", "Another sentences for testing"];
	
	  var cryptonator = new LoremImageCryptonator();
	  var images = ['./img/Desert.jpg', './img/thunder.jpg', './img/island.jpg'];
	  var countTest = 0;
	  
	  var cryptoImg;
	  var mode;
	  var channel;
	  
	  beforeEach(function() {
		
		if( countTest < sentences.length ){
		
			var imgLoaded = false;
			
			runs(function(){
				
				var randNum = Math.floor( Math.random() * 3 );
				
				mode =  randNum ? 'slow' : 'fast';
				channel = randNum ? 'red' : (randNum == 2 ? 'green' : 'blue');
				
				var img = new Image();

				img.onload = function(){

				  cryptonator.setImage(img);
				  
				  cryptonator.getCryptoImage({mode:mode,channel: channel, text:sentences[countTest] },function(cimg){
					cryptoImg = cimg;
					imgLoaded = true;
				  });
				  
				  images[countTest] = img;
				  
				};

				img.src=images[countTest];
				
			});
			
			waitsFor(function() {
				return imgLoaded;
			}, "CryptoImage should have been created", 5000); 
			
		}
		
	  });

	  function checkCryptoImg(){
		
		var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cryptoImg);
		var sentence =  sentences[countTest++] ;
		
		expect(text.indexOf(sentence)).not.toEqual( -1 );
		
	  }
	  
	  it("should get sentence out of first Crypto-Image", function() {
		
		checkCryptoImg();
		
	  });
	  
	  
	  it("should get sentence out of second Crypto-Image", function() {
		
		checkCryptoImg();
		
	  });

	  
	  it("should get sentence out of third Crypto-Image", function() {
		
		checkCryptoImg();
		
	  });
	  
	  
	  it("should get sentence out of fourth Crypto-Image without options", function() {
		
		cryptonator.setImage(images[0]);

		cryptonator.getCryptoImage({text:sentences[0] },function(cimg){

			var text = cryptonator.getTextFromCryptoImage(cimg);
			var sentence =  sentences[0] ;

			expect(text.indexOf(sentence)).not.toEqual( -1 );

		});
		
		  
	  });
	  
	  
	});
	

});