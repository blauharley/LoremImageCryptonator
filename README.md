LoremImageCryptonator
=====================

Short-Description: A JavaScript-package to insert some text into an image (*.jpg, *.png, *.gif) and extract some text from an image (Crypto-image).

<h3>Supported Options:</h3>
The options below are
<ul>

	<li>Necessary Options</li>
	<li>
		<ul>
			<li>Text: String that should be inserted into a image</li>
		</ul>
	</li>
	
	<li>Optional Options:</li>
	<li>
		<ul>
			<li>Mode: 'fast' and 'slow' (Standard: 'slow')</li>
			<li>channel: 'red', 'green', 'blue' and 'alpha' (Standard: 'alpha')</li>
		</ul>
	</li>
	
</ul>


<h3>Methods</h3>

The lib offers following methods:

<b>getCryptoImage</b> is used for inserting some text into an image. <b>getCryptoImage</b> overloads following params:

<blockquote>

	<p>@param <i>opt</i> must be a JSON-Object and contains the options (text, mode and channel)</p>

	<p>@param <i>callback</i> must be a Function-Object that gets called when Crypto-image is ready to be viewed or inserted into HTML-Elements. The callback-function must define one param that represents the Crypto-Image after a successful text-insertion.</p>
	
	<p>@return undefined</p>
	
	<p><b>getCryptoImage( in opt:Object, in callback:Function ) : undefined</b></p>

</blockquote>

<b>getTextFromCryptoImage</b> is used for extracting some text that has been inserted into an image. <b>getTextFromCryptoImage</b> overloads following params:

<blockquote>

	<p>@param <i>opt (optional)</i> must be a JSON-Object but can be omitted when standard options have been used to insert text into image.</p>
	
	<p>@param <i>cimg</i> must be an Image-Object that some text has been inserted into before.</p>
	
	<p>@return String that represents the inserted Text</p>
	
	<p><b>getTextFromCryptoImage( in opt:Object, in cimg:Image ) : String</b></p>

</blockquote>