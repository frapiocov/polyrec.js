const polyrec = require('../polyrec.js');

var gesture = new Gesture('arrow', new Array( new Point(69,228),new Point(67,228),new Point(70,225),new Point(73,223),new Point(75,222),new Point(80,218),new Point(82,216),new Point(85,214),new Point(92,209),new Point(99,205),new Point(106,201),new Point(114,196),new Point(122,193),new Point(130,188),new Point(138,185),new Point(145,181),new Point(148,180),new Point(154,177),new Point(157,175),new Point(162,173),new Point(164,172),new Point(167,171),new Point(164,170),new Point(161,169),new Point(155,170),new Point(148,170),new Point(144,170),new Point(142,169),new Point(138,169),new Point(133,170),new Point(131,170),new Point(133,170),new Point(139,168),new Point(148,167),new Point(157,163),new Point(169,159),new Point(177,154),new Point(181,153),new Point(186,152),new Point(186,154),new Point(181,159),new Point(171,170),new Point(162,181),new Point(157,189),new Point(155,192),new Point(149,201),new Point(144,205),new Point(142,205)));
var template = new Gesture('check', new Array( new Point(86,195),new Point(88,199),new Point(89,201),new Point(91,205),new Point(95,209),new Point(96,211),new Point(100,217),new Point(102,219),new Point(105,223),new Point(108,227),new Point(110,230),new Point(112,232),new Point(114,234),new Point(114,230),new Point(113,226),new Point(113,222),new Point(115,211),new Point(117,203),new Point(120,190),new Point(124,180),new Point(127,176),new Point(134,165),new Point(142,155),new Point(150,146),new Point(156,141),new Point(159,138),new Point(161,134)));

//test riduttore douglas peucker 
var polyline = DouglasPeucker(gesture);
console.log(polyline);

//test needleman-wunsch
var arrayOfResults = NeedlemanWunsch(gesture, template)
console.log(arrayOfResults[0]) //matched points
console.log("Number of matches: " + arrayOfResults[1]) //matches

//test allineamento
var alignResults = AlignPolylines(gesture, template)
console.log(alignResults[0]) //gesture di input post allineamento
console.log(alignResults[1]) //gesture template post allineamento
console.log("Added points: " + alignResults[2]) //Numero di punti aggiunti
console.log("Matches: " + alignResults[3]) //Matches