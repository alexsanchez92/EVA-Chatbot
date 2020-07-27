<?php
	use MatthiasMullie\Minify;
	use Chewett\UglifyJS\JSUglify;
	use Chewett\UglifyJS\UglifyJSException;

   	require_once('vendor/autoload.php');
   	
	////
	// JS
	////
	$ug = new JSUglify();
	$minifier = new Minify\JS();
	foreach (glob("assets/*.js") as $filename){
		$minifier->add($filename);
		echo $filename.'<br>';
	}
	$minifiedPath = 'comun/js/eva.min.js';
	$minifier->minify($minifiedPath);
	$ug->uglify([$minifiedPath], $minifiedPath);
	echo 'JS minified to '.$minifiedPath.'<br>';

	////
	// CSS
	////
	$minifier = new Minify\CSS();
	foreach (glob("assets/*.css") as $filename){
		$minifier->add($filename);
		echo $filename.'<br>';
	}
	$minifiedPath = 'comun/css/eva.min.css';
	$minifier->minify($minifiedPath);
	echo 'CSS minified to '.$minifiedPath.'<br>';

?>