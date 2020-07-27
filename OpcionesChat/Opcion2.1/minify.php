<?php
	use MatthiasMullie\Minify;
	use Chewett\UglifyJS\JSUglify;
	use Chewett\UglifyJS\UglifyJSException;

   	require_once('C:\xampp\htdocs\cb\vendor/autoload.php');
   	
	////
	// JS
	////
	foreach (glob("assets/*.js") as $filename){
		//Código de la lib Chewett\UglifyJS\JSUglify
		$ug = new JSUglify();
		$name = pathinfo($filename, PATHINFO_FILENAME);
		$minifiedPath = 'comun/js/'.$name.'.min.js';
		$ug->uglify([$filename], $minifiedPath);

		/*
		// Código de la lib MatthiasMullie\Minify
		$minifier = new Minify\JS($filename);
		$name = pathinfo($filename, PATHINFO_FILENAME);
		$minifiedPath = 'assets/min/'.$name.'.min.js';
		$minifier->minify($minifiedPath);
		*/
		echo $filename.' minified to '.$minifiedPath.'<br>';
	}
	////
	// CSS
	////
	foreach (glob("assets/*.css") as $filename){
		$minifier = new Minify\CSS($filename);
		$name = pathinfo($filename, PATHINFO_FILENAME);

		$minifiedPath = 'comun/css/'.$name.'.min.css';
		$minifier->minify($minifiedPath);

		echo $filename.' minified to '.$minifiedPath.'<br>';
	}

	/*
	$sourcePath = '/path/to/source/css/file.js';
	$minifier = new Minify\JS($sourcePath);

	// we can even add another file, they'll then be
	// joined in 1 output file
	$sourcePath2 = '/path/to/second/source/css/file.js';
	$minifier->add($sourcePath2);

	// or we can just add plain js
	$js = 'var test = 1';
	$minifier->add($js);

	// save minified file to disk
	$minifiedPath = '/path/to/minified/js/file.js';
	$minifier->minify($minifiedPath);

	////
	// CSS
	////
	$sourcePath = '/path/to/source/css/file.css';
	$minifier = new Minify\CSS($sourcePath);

	// we can even add another file, they'll then be
	// joined in 1 output file
	$sourcePath2 = '/path/to/second/source/css/file.css';
	$minifier->add($sourcePath2);

	// or we can just add plain CSS
	$css = 'body { color: #000000; }';
	$minifier->add($css);

	// save minified file to disk
	$minifiedPath = '/path/to/minified/css/file.css';
	$minifier->minify($minifiedPath);*/

?>