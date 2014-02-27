LoremImageCryptonator
=====================

Short-Description: A JavaScript-package to insert some text into an image (*.jpg, *.png, *.gif) and extract some text from an image (Crypto-image).

<h3>Supported Options:</h3>
The options below are
<ul>

	<li>Necessary Options</li>
	<ul>
		<li>Text: String that should be inserted into a image.</li>
	</ul>
	
	<li>Optional Options:</li>
	<ul>
		<li>Mode: 'fast' and 'slow'. When mode 'fast' is selected each sign is put into a whole pixel. It's faster than 'slow' because 'slow' puts each bit of each sign into the LSB (least significant bit) so when 'slow' is selected each signs takes put eight pixel of the image. So 'fast' is faster and consumes less memory or alters less pixels of the image but depending on the text-size there is a chance that a user might see that some image-sections look different in comparison with other sections. (Standard: 'slow')</li>
		<li>channel: 'red', 'green', 'blue' and 'alpha'. Text-signs can be put into red, green, blue or alpha channel of each pixel. The alpha-channel is recommended because it's not likely that you see any difference before and after some text has been inserted. (Standard: 'alpha')</li>
	</ul>
	
</ul>


<h3>Methods</h3>

The package offers following methods:

<b>getCryptoImage</b> is used for inserting some text into an image. 

<blockquote>

	<p>@param <i>opt</i> must be a JSON-Object and contains the options (text, mode and channel)</p>

	<p>@param <i>callback</i> must be a Function-Object that gets called when Crypto-image is ready to be viewed or inserted into HTML-Elements. The callback-function must define one param that represents the Crypto-Image after a successful text-insertion.</p>
	
	<p>@return undefined</p>
	
	<p><b>getCryptoImage( in opt:Object, in callback:Function ) : undefined</b></p>

</blockquote>

<b>getTextFromCryptoImage</b> is used for extracting some text that has been inserted into an image.

<blockquote>

	<p>@param <i>opt (optional)</i> must be a JSON-Object but can be omitted when standard options have been used to insert text into image.</p>
	
	<p>@param <i>cimg</i> must be an Image-Object that some text has been inserted into before.</p>
	
	<p>@return String that represents the inserted Text</p>
	
	<p><b>getTextFromCryptoImage( in opt:Object, in cimg:Image ) : String</b></p>

</blockquote>