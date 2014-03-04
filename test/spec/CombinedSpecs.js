
describe("All-Tests", function() {


	describe("ByteCalculator-Object-Tests", function() {

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
		
		
	  it("should calculate same decimal as given", function(){
		
		var decimal = Math.floor(Math.random() * 255);
		
		var binary = calulator.decimal2binary(decimal);
		
		expect(decimal).toBe( calulator.binary2decimal(binary) );
		
	  });
	  
	  it("should calculate same binary as given", function(){
		
		var pos = Math.floor(Math.random() * word.length);
		var binary = byteWordRep[pos];
		
		var decimal = calulator.binary2decimal(binary);
		
		expect(binary).toBe( calulator.decimal2binary(decimal) );
		
	  });
	  
	  it("should get same binary out of word", function() {
		
		var pos = Math.floor(Math.random() * word.length);
		var letterBin = calulator.decimal2binary( word[ pos ].charCodeAt() );
		
		expect(letterBin).toEqual( byteWordRep[pos] );
		
	  });
	  
	  

	  
	});


	

	describe("LoremImageCryptonator-Object-Tests", function() {

	  var sentences = ["This is a Test to check the ByteCalculator up and test it whether it works correctly.", "A top-secret sentence", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.   Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.   Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse"];
	
	  var cryptonator = new LoremImageCryptonator();
	  var images = ['./img/thunder.png', './img/island.gif', './img/Desert.jpg'];
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

	  function checkCryptoImgByTestNr(cimg, testnr, mode, channel){
		
		var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cimg);
		var sentence =  sentences[testnr] ;
		
		expect(text.indexOf(sentence)).not.toEqual( -1 );
		
	  }
	  
	  it("should get sentence out of first Crypto-Image", function() {
		
		checkCryptoImgByTestNr(cryptoImg, countTest, mode, channel);
		countTest++;
		
	  });
	  
	  
	  it("should get sentence out of second Crypto-Image", function() {
		
		checkCryptoImgByTestNr(cryptoImg, countTest, mode, channel);
		countTest++;
		
	  });

	  
	  it("should get sentence out of third Crypto-Image", function() {
		
		checkCryptoImgByTestNr(cryptoImg, countTest, mode, channel);
		countTest++;
		
	  });
	  
	  
	  it("should get sentence out of fourth Crypto-Image without options", function() {
		
		cryptonator.setImage(images[0]);

		cryptonator.getCryptoImage({text:sentences[0] },function(cimg){

			checkCryptoImgByTestNr(cimg, 0);
		
		});
		
		  
	  });
	  
	  it("should get text out of HTML-Image", function() {
		
		var img = new Image();

		img.onload = function(){

		  cryptonator.setImage(img);
		  
		  cryptonator.getCryptoImage({mode:mode,channel: channel, text:sentences[2] },function(cimg){
			
			document.body.appendChild(cimg);
			cimg = document.getElementsByTagName('img')[0];
			
			checkCryptoImgByTestNr(cimg, 2, mode, channel);
		
		  });
		  
		};

		img.src='./img/thunder.png';
		
	  });
	  
	  
	});
	

});