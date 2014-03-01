LoremImageCryptonator
=====================

General-Description: A JavaScript-package to insert some text into an image (*.jpg, *.png, *.gif) and extract some text from an image (Crypto-image).

<h3>Supported Options:</h3>
The options below are
<ul>

	<li>Necessary Options</li>
	<ul>
		<li><b>text</b>: String that should be inserted into a image.</li>
	</ul>
	
	<li>Optional Options:</li>
	<ul>
		<li><b>mode</b>: 'fast' and 'slow'. When mode 'fast' is selected each sign is put into a whole pixel. It's faster than 'slow' because 'slow' puts each bit of each sign into the LSB (least significant bit) of each pixel successively. When 'slow'-mode is selected each signs takes put eight pixel of the image partly but it has got a very low effect on the image. 
		      So 'fast'-mode is faster and has to alter less pixels of the image but depending on the text-size there is a chance that a user might see that some image-sections look different in comparison with other sections. Furthermore when using 'fast'-mode there can be saved more signs into an image than using 'slow'-mode.(Standard: 'slow')</li>
			<br/>
				Advantages of 'fast'-mode:
			<ul>
				<li>Faster while inserting each sign of some text</li>
				<li>Greater Number of signs can be stored in an image</li>
				<li>Alters less pixels of an image</li>
			</ul>
			
			<br/>
				Advantages of 'slow'-mode:
			<ul>
				<li>Very low effect on each pixel of an image.</li>
				<li>Cryptography is better, LSB of each pixels is altered and not whole pixel as it is the case of 'fast'-mode.</li>
			</ul>
			
			<br/>
			
		<li><b>channel</b>: 'red', 'green', 'blue' and 'alpha'. Text-signs can be put into red-, green-, blue- or alpha-channel of each pixel. It is recommended to use the alpha-channel because it's not likely that you see any visual-difference before and after some text has been inserted. (Standard: 'alpha')</li>
	</ul>
	
</ul>

<h3>Useful Tips:</h3>

For those who want to store large quantities of text always keep in mind that the bigger the image is the more signs can be stored into and in this case the 'fast'-mode is recommended.
<br/>

Szenario-Example when an image-Size of 480x320 size is used:
<ul>
	
	<li>
		'fast'-mode:
		<ul>
			<li>max. Number of signs:  153600 (480x320)</li>
		</ul>
	</li>
	
	<li>
		'slow'-mode:
		<ul>
			<li>max. Number of signs:  19200 ((480x320)/8)</li>
		</ul>
	</li>
	
</ul>

For those who want to mask text in an image the 'slow'-mode plus the channel alpha is recommended as these options are selected by default.


<h3>Methods:</h3>

The package offers following methods:

<b>setImage</b> is used for overloading an image that get used for being inserted some text into. 

<blockquote>

	<p>@param <i>img</i> must be an Image-Object</p>

	<p>@return undefined</p>
	
	<p><b>setImage( in img:Image ) : undefined</b></p>

</blockquote>

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


<h3>Supported Browsers:</h3>
<ul>
	<li>IE9+</li>
	<li>Mozilla Firefox</li>
	<li>Google Chrome</li>
	<li>Safari</li>
	<li>Opera</li>
</ul>

<h3>License:</h3>
GNU: This software can be used and modified freely and without any restrictions. 