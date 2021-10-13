# PolyRec.js

[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)

### About

PolyRec is a unistroke gesture recognizer suitable for fast prototyping of gesture-based applications. The recognizer uses a nearest neighbor approach, and requires a small number of samples for each class.

The similarity between two gestures is calculated through a three steps procedure:
- firstly, each gesture is approximated to a polyline, in order to extract its main movements;
- then, the two polylines are aligned to obtain an equal number of segments from both of them;
- lastly, the distance is found by summing the contribution of each pair of segments.

This implementation, in JavaScript, for a thesis work, is a prototype developed for scientific purposes and web uses.
A simple demo for the PolyRec recognizer [here](example/demo2/index.html). 
The second demo is a little more complex, it allows you to write Java code through the use of gestures. A small server written in Node.js takes care of compiling and running the code. It's visible here [here](example/demo3/index.html). 
More technical details on PolyRec can be found in the following scientific paper:
V Fuccella, G. Costagliola; Unistroke Gesture Recognition Through Polyline Approximation and Alignment; in Proceedings of CHI 2015; pp. 3351-3354
http://dl.acm.org/citation.cfm?id=2702505 

### Download & Setup

The javascript version can be downloaded as a polyrec.min.js file, a single minimized file to be included in your web applications, for client-side use without server-side processing. 
You can use the dataset provided by default or add more gesture with the function `recognizer.AddTemplate(gesture_name, gesture_points)`.

### Usage: PolyRec.js library

```JavaScript
/*
 * The recognizer takes a boolean as parameter, 
 * 
 * case 1. if the value is true, the recognizer will use the default templates already present;
 * Present gestures: arrow, caret, check, circle, delete mark, left curly bracket, right curly bracket, left square bracket, right square bracket, pigtail, question mark, rectangle, star, triangle, v, x.  
 * 
 * case 2. if the value is false then no gesture is loaded and it is up to the user to insert their gestures.
*/

/*case 1.Create a PolyRecognizer istance with default templates*/
var recognizer = new PolyRecognizer(true)
/*case 2.Create a PolyRecognizer istance without default templates*/
var recognizer = new PolyRecognizer(false)
/* or */
var recognizer = new PolyRecognizer()

/*You can load your own gestures, first create them*/
var triangle = new Gesture('triangle', new Array(new Point(0, 0), new Point(100, 0),  new Point(0, 100), new Point(0,100), new Point(0,0))
var rectangle = new Gesture('rectangle', new Array(new Point(0, 0), new Point(100, 0),  new Point(100, 200), new Point(0,200), new Point(0,0)) 
/* and then add it to recognizer */
recognizer.AddTemplate(triangle)
recognizer.AddTemplate(rectangle)

/* Specify your array of points o catch them with the browser */
var points = new Array(new Point(0, 0),new Point(1, 0),new Point(2, 1),new Point(3, 2),new Point(3, 3),new Point(2, 2),new Point(0, 0));

/*Execute the recognize method to the array of points*/
/* Return a Result object with 3 attributes: Name, Score, Time */
var result = recognizer.Recognize(points);

/*Write result on command line*/
console.log('Result: ' + result.Name + ', score: ' + result.Score + ' in ' + result.Time + 'ms.');
/*Or on your HTML page*/
var result = document.getElementById('result_text');  
result.innerHTML = 'Result: ' + result.Name + ', score: ' + result.Score + ' in ' + result.Time + 'ms.';
```