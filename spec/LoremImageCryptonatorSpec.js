describe("LoremImageCryptonator-Tests", function() {

  var cryptonator = new LorenImageCryptonator();
  var sentence = "This is a Test to check the LorenImageCryptonator up and test it whether it works correctly.";
  var images = ['../img/desert.jpg', '../img/thunder.jpg', '../img/island.jpg'];
  var countTest = 0;
  
  var cryptoImg;
  var mode;
  var channel;
  
  beforeEach(function() {
    
	var imgLoaded = false;
	
	runs(function(){
		
		var randNum = Math.floor( Math.random() * 3 ) );
		
		mode =  randNum == 1 ? 'slow' : 'fast';
		channel = randNum == 1 ? 'red' : (randNum == 2 ? 'green' : 'blue');
		
		var img = new Image();

		img.onload = function(){

		  cryptonator.setImage(img);
		  
		  cryptonator.getCryptoImage({mode:mode,channel: channel, text:sentence},function(cimg){
			cryptoImg = cimg;
			imgLoaded = true;
		  });
		  
		};

		img.src=images[countTest++];
		
	});
	
	waitsFor(function() {
		return imgLoaded;
	}, "CryptoImage should have been created", 5000); 
  
  });

  
  it("should get sentence out of first Crypto-Image", function() {
	
	var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cryptoImg);
	expect(text).toBe( sentence );
	
  });
  
  
  it("should get sentence out of second Crypto-Image", function() {
	
	var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cryptoImg);
	expect(text).toBe( sentence );
	
  });

  
  it("should get sentence out of third Crypto-Image", function() {
	
	var text = cryptonator.getTextFromCryptoImage({ mode:mode,channel: channel }, cryptoImg);
	expect(text).toBe( sentence );
	
  });
  
  
});