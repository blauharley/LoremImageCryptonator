describe("BayteCalculator-Tests", function() {

  var calulator = new ByteCalculator();
  var sentence = "This is a Test to check the ByteCalculator up and test it whether it works correctly.";
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
	
	expect(letterBin).toBe( byteWordRep[pos] );
	
  });

  
});