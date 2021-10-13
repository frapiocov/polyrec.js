//classe Point
function Point(x,y)
{
    this.X = x;
    this.Y = y;
}

//classe Rectangle
function Rectangle(x, y, width, height)
{
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
}

//classe Vector
function Vector(intensity, angle)
{
    this.Intensity = intensity;
    this.Angle = angle;
}

//classe Result
function Result(name, score, ms)
{
	this.Name = name;
	this.Score = Math.round(score * 10000) / 100.0;
	this.Time = ms;
}

//classe Polyline
function Polyline(gesture, indexes)
{
    this.Gesture = gesture; 
    this.Indexes = indexes;
    this.Lengths = CalculateLengthsPoly(gesture.Points, indexes);
}

//classe Gesture
function Gesture(name, points)
{
    this.Name = name;
    this.Points = points;
    this.Centroid = CalculateCentroid(points);
    this.Lengths = CalculateLengths(points);
    this.BoundingBox = CalculateBoundingBox(points);
    this.RotInv = false;
    this.PointersNum = 1;
}

//costanti per il riconoscitore
const DPR_PARAMS = {FParam: 26.0, SParam: 22.0};
const ANGLE_ROTATION_INVARIANT = 45;
const ANGLE_ROTATION_SENSITIVE = 25;
const ANGLE_STEP = 2;
const PHI = 0.5 * ( -1.0 + Math.sqrt(5.0) );
const GAP_COST = 0.4;
const BALANCE = 0.6;
const SLOPE_TRESHOLD = DPR_PARAMS.FParam;

/* PolyRecognizer */
function PolyRecognizer(){
    return new PolyRecognizer(false);
}

/** Funzioni riconoscitore */
function PolyRecognizer(def)
{
    this.DataSet = new Array();

    if(def){
    var gest0 = new Gesture("arrow", new Array( new Point(69,228),new Point(67,228),new Point(70,225),new Point(73,223),new Point(75,222),new Point(80,218),new Point(82,216),new Point(85,214),new Point(92,209),new Point(99,205),new Point(106,201),new Point(114,196),new Point(122,193),new Point(130,188),new Point(138,185),new Point(145,181),new Point(148,180),new Point(154,177),new Point(157,175),new Point(162,173),new Point(164,172),new Point(167,171),new Point(164,170),new Point(161,169),new Point(155,170),new Point(148,170),new Point(144,170),new Point(142,169),new Point(138,169),new Point(133,170),new Point(131,170),new Point(133,170),new Point(139,168),new Point(148,167),new Point(157,163),new Point(169,159),new Point(177,154),new Point(181,153),new Point(186,152),new Point(186,154),new Point(181,159),new Point(171,170),new Point(162,181),new Point(157,189),new Point(155,192),new Point(149,201),new Point(144,205),new Point(142,205)));
    var gest1 = new Gesture("caret", new Array( new Point(73,243),new Point(74,241),new Point(76,237),new Point(77,235),new Point(79,231),new Point(82,224),new Point(83,222),new Point(85,218),new Point(88,210),new Point(92,201),new Point(96,192),new Point(100,181),new Point(104,169),new Point(106,163),new Point(110,152),new Point(111,147),new Point(114,138),new Point(119,127),new Point(121,123),new Point(123,120),new Point(125,119),new Point(128,121),new Point(133,127),new Point(136,135),new Point(143,149),new Point(151,169),new Point(160,188),new Point(167,205),new Point(173,220),new Point(176,232),new Point(178,236),new Point(177,243)));
    var gest2 = new Gesture("check", new Array( new Point(86,195),new Point(88,199),new Point(89,201),new Point(91,205),new Point(95,209),new Point(96,211),new Point(100,217),new Point(102,219),new Point(105,223),new Point(108,227),new Point(110,230),new Point(112,232),new Point(114,234),new Point(114,230),new Point(113,226),new Point(113,222),new Point(115,211),new Point(117,203),new Point(120,190),new Point(124,180),new Point(127,176),new Point(134,165),new Point(142,155),new Point(150,146),new Point(156,141),new Point(159,138),new Point(161,134)));
    var gest3 = new Gesture("circle", new Array( new Point(119,132),new Point(115,133),new Point(112,134),new Point(108,136),new Point(104,138),new Point(98,143),new Point(92,149),new Point(90,153),new Point(88,157),new Point(85,166),new Point(84,175),new Point(85,184),new Point(86,193),new Point(90,202),new Point(95,209),new Point(98,212),new Point(104,217),new Point(116,221),new Point(123,221),new Point(131,219),new Point(136,217),new Point(147,213),new Point(153,208),new Point(156,205),new Point(162,193),new Point(165,181),new Point(163,168),new Point(160,158),new Point(157,154),new Point(148,141),new Point(145,138),new Point(135,130),new Point(133,128),new Point(125,129),new Point(119,131),new Point(114,135)));
    var gest4 = new Gesture("delete_mark", new Array( new Point(115,137),new Point(115,139),new Point(116,142),new Point(117,144),new Point(120,150),new Point(126,158),new Point(129,162),new Point(133,166),new Point(141,174),new Point(149,181),new Point(156,188),new Point(161,193),new Point(163,194),new Point(166,197),new Point(167,199),new Point(167,201),new Point(165,202),new Point(162,202),new Point(157,201),new Point(147,196),new Point(135,194),new Point(122,192),new Point(111,191),new Point(102,195),new Point(97,198),new Point(91,200),new Point(89,201),new Point(92,198),new Point(96,192),new Point(104,185),new Point(112,173),new Point(115,170),new Point(122,161),new Point(125,158),new Point(135,147),new Point(141,141),new Point(146,136)));
    var gest5 = new Gesture("left_curly_brace", new Array( new Point(143,125),new Point(141,125),new Point(139,125),new Point(135,126),new Point(133,126),new Point(131,127),new Point(129,127),new Point(125,129),new Point(123,131),new Point(119,134),new Point(115,137),new Point(112,139),new Point(109,142),new Point(107,145),new Point(106,147),new Point(105,149),new Point(107,150),new Point(110,150),new Point(114,149),new Point(118,150),new Point(122,149),new Point(124,149),new Point(128,151),new Point(132,152),new Point(135,155),new Point(137,158),new Point(138,160),new Point(138,166),new Point(132,175),new Point(127,178),new Point(124,181),new Point(115,187),new Point(111,190),new Point(105,193),new Point(108,191),new Point(111,190),new Point(118,188),new Point(122,187),new Point(129,189),new Point(131,190),new Point(134,196),new Point(133,203),new Point(132,205),new Point(124,218),new Point(120,226),new Point(118,236),new Point(120,245),new Point(125,251),new Point(131,250)));
    var gest6 = new Gesture("left_sq_bracket", new Array( new Point(144,122),new Point(141,122),new Point(139,122),new Point(137,121),new Point(134,121),new Point(131,121),new Point(129,122),new Point(125,122),new Point(122,123),new Point(119,123),new Point(116,123),new Point(114,123),new Point(112,124),new Point(109,123),new Point(107,124),new Point(105,125),new Point(103,128),new Point(103,131),new Point(103,135),new Point(103,141),new Point(104,143),new Point(105,153),new Point(106,159),new Point(106,163),new Point(107,171),new Point(107,174),new Point(108,183),new Point(108,192),new Point(108,199),new Point(108,207),new Point(108,213),new Point(108,219),new Point(108,222),new Point(108,225),new Point(108,227),new Point(110,229),new Point(112,230),new Point(115,231),new Point(121,232),new Point(128,234),new Point(134,234),new Point(139,235),new Point(145,237),new Point(150,236)));
    var gest7 = new Gesture("pigtail", new Array( new Point(65,219),new Point(68,220),new Point(70,221),new Point(73,220),new Point(75,220),new Point(80,220),new Point(84,219),new Point(89,217),new Point(91,216),new Point(94,215),new Point(99,213),new Point(105,211),new Point(108,209),new Point(113,207),new Point(116,205),new Point(122,201),new Point(130,193),new Point(135,190),new Point(141,182),new Point(145,177),new Point(147,175),new Point(151,167),new Point(152,161),new Point(153,159),new Point(152,152),new Point(151,148),new Point(146,142),new Point(142,141),new Point(134,143),new Point(132,145),new Point(123,153),new Point(118,163),new Point(115,175),new Point(115,179),new Point(115,193),new Point(116,198),new Point(119,215),new Point(126,226),new Point(135,233),new Point(147,234),new Point(160,232),new Point(169,228)));
    var gest8 = new Gesture("question_mark", new Array( new Point(99,141),new Point(100,139),new Point(101,137),new Point(103,134),new Point(105,132),new Point(108,129),new Point(111,128),new Point(113,126),new Point(116,124),new Point(119,122),new Point(122,121),new Point(126,120),new Point(130,122),new Point(134,122),new Point(138,124),new Point(141,127),new Point(144,131),new Point(146,133),new Point(149,138),new Point(150,140),new Point(152,144),new Point(152,150),new Point(152,152),new Point(151,156),new Point(149,161),new Point(146,164),new Point(143,166),new Point(136,169),new Point(132,169),new Point(129,169),new Point(126,169),new Point(124,168),new Point(121,167),new Point(119,167),new Point(118,170),new Point(118,173),new Point(118,178),new Point(120,186),new Point(120,188),new Point(121,195),new Point(122,197),new Point(122,201),new Point(122,204),new Point(122,208),new Point(121,210),new Point(121,212)));
    var gest9 = new Gesture("rectangle", new Array( new Point(66,162),new Point(64,165),new Point(64,167),new Point(64,169),new Point(64,172),new Point(64,174),new Point(64,179),new Point(65,182),new Point(65,185),new Point(65,189),new Point(66,192),new Point(66,198),new Point(67,202),new Point(67,205),new Point(67,211),new Point(68,216),new Point(68,219),new Point(68,223),new Point(68,226),new Point(67,228),new Point(67,231),new Point(67,234),new Point(67,237),new Point(67,239),new Point(69,241),new Point(71,240),new Point(74,238),new Point(77,238),new Point(85,237),new Point(93,238),new Point(102,239),new Point(111,237),new Point(122,237),new Point(132,238),new Point(143,239),new Point(153,240),new Point(156,240),new Point(167,241),new Point(176,243),new Point(188,245),new Point(192,245),new Point(199,247),new Point(201,247),new Point(203,246),new Point(203,243),new Point(200,237),new Point(197,229),new Point(196,225),new Point(191,213),new Point(187,199),new Point(183,183),new Point(181,168),new Point(179,157),new Point(178,153),new Point(177,148),new Point(175,147),new Point(173,148),new Point(170,148),new Point(162,146),new Point(151,142),new Point(148,142),new Point(136,140),new Point(133,141),new Point(120,141),new Point(117,141),new Point(101,144),new Point(90,147)));
    var gest10 = new Gesture("right_curly_brace", new Array( new Point(102,139),new Point(105,138),new Point(107,138),new Point(111,138),new Point(113,137),new Point(118,137),new Point(122,137),new Point(127,137),new Point(132,138),new Point(136,140),new Point(139,141),new Point(142,143),new Point(144,145),new Point(145,148),new Point(146,151),new Point(145,154),new Point(144,156),new Point(141,159),new Point(140,161),new Point(136,163),new Point(129,168),new Point(125,171),new Point(121,172),new Point(118,174),new Point(115,175),new Point(113,176),new Point(111,178),new Point(112,180),new Point(115,182),new Point(118,185),new Point(123,188),new Point(130,189),new Point(137,190),new Point(141,191),new Point(147,190),new Point(150,188),new Point(152,187),new Point(151,184),new Point(149,183),new Point(142,183),new Point(134,184),new Point(131,185),new Point(122,191),new Point(117,196),new Point(112,200),new Point(111,202),new Point(110,204),new Point(113,208),new Point(119,211),new Point(123,212),new Point(126,214),new Point(132,219),new Point(136,226),new Point(138,234),new Point(135,241),new Point(128,247),new Point(126,249),new Point(112,255),new Point(103,257),new Point(98,258)));
    var gest11 = new Gesture("right_sq_bracket", new Array( new Point(110,144),new Point(112,146),new Point(115,146),new Point(118,145),new Point(120,145),new Point(124,145),new Point(128,145),new Point(132,145),new Point(136,147),new Point(139,147),new Point(142,150),new Point(145,154),new Point(147,158),new Point(148,164),new Point(148,171),new Point(149,174),new Point(149,181),new Point(149,185),new Point(149,194),new Point(149,206),new Point(149,217),new Point(149,225),new Point(149,227),new Point(151,233),new Point(149,233),new Point(145,231),new Point(137,230),new Point(133,228),new Point(121,226),new Point(108,225),new Point(100,226),new Point(95,227),new Point(92,228)));
    var gest12 = new Gesture("star", new Array( new Point(77,261),new Point(79,259),new Point(80,257),new Point(82,254),new Point(83,251),new Point(85,248),new Point(87,244),new Point(87,242),new Point(88,239),new Point(90,233),new Point(92,226),new Point(95,220),new Point(97,212),new Point(99,206),new Point(101,199),new Point(102,195),new Point(104,184),new Point(105,177),new Point(108,166),new Point(109,158),new Point(113,147),new Point(115,140),new Point(116,137),new Point(118,130),new Point(120,127),new Point(121,124),new Point(123,127),new Point(124,130),new Point(124,133),new Point(127,141),new Point(130,149),new Point(134,159),new Point(136,164),new Point(141,177),new Point(148,193),new Point(155,208),new Point(159,216),new Point(164,224),new Point(165,226),new Point(166,229),new Point(167,231),new Point(167,235),new Point(166,240),new Point(165,245),new Point(163,245),new Point(160,245),new Point(152,239),new Point(140,233),new Point(126,224),new Point(110,211),new Point(92,193),new Point(78,185),new Point(68,181),new Point(59,180),new Point(54,178),new Point(52,178),new Point(53,180),new Point(61,182),new Point(75,184),new Point(95,182),new Point(116,178),new Point(137,176),new Point(155,173),new Point(170,170),new Point(177,169),new Point(182,167),new Point(181,170),new Point(173,178),new Point(171,179),new Point(156,191),new Point(139,205),new Point(121,221),new Point(105,240),new Point(96,254),new Point(90,263),new Point(86,266),new Point(81,269),new Point(81,271)));
    var gest13 = new Gesture("triangle", new Array( new Point(134,138),new Point(133,140),new Point(132,143),new Point(129,147),new Point(128,150),new Point(126,153),new Point(123,157),new Point(121,160),new Point(117,166),new Point(112,172),new Point(106,178),new Point(101,184),new Point(95,190),new Point(90,196),new Point(85,201),new Point(83,203),new Point(80,206),new Point(77,210),new Point(75,212),new Point(73,214),new Point(76,214),new Point(78,213),new Point(82,211),new Point(88,210),new Point(96,208),new Point(106,206),new Point(114,205),new Point(117,205),new Point(129,207),new Point(141,209),new Point(152,212),new Point(156,214),new Point(169,220),new Point(177,222),new Point(185,225),new Point(190,225),new Point(192,225),new Point(192,222),new Point(189,221),new Point(181,215),new Point(179,214),new Point(170,207),new Point(167,204),new Point(159,193),new Point(157,190),new Point(146,175),new Point(138,167),new Point(133,160),new Point(127,156),new Point(124,152)));
    var gest14 = new Gesture("v", new Array( new Point(83,141),new Point(84,143),new Point(85,145),new Point(85,148),new Point(88,153),new Point(89,156),new Point(92,164),new Point(96,174),new Point(100,183),new Point(104,193),new Point(105,198),new Point(107,202),new Point(111,210),new Point(112,214),new Point(114,221),new Point(115,223),new Point(118,233),new Point(119,238),new Point(119,240),new Point(120,243),new Point(121,246),new Point(123,246),new Point(124,243),new Point(125,238),new Point(126,234),new Point(126,230),new Point(129,219),new Point(131,205),new Point(134,191),new Point(138,178),new Point(143,166),new Point(148,157),new Point(152,149),new Point(155,141),new Point(158,135),new Point(159,131),new Point(160,129)));
    var gest15 = new Gesture("x", new Array( new Point(88,150),new Point(87,148),new Point(87,150),new Point(87,152),new Point(88,155),new Point(89,158),new Point(92,163),new Point(93,165),new Point(95,169),new Point(99,175),new Point(104,181),new Point(106,185),new Point(108,188),new Point(113,195),new Point(118,203),new Point(123,209),new Point(127,217),new Point(132,223),new Point(137,231),new Point(140,235),new Point(141,237),new Point(144,239),new Point(146,241),new Point(148,241),new Point(148,238),new Point(147,231),new Point(147,225),new Point(145,216),new Point(143,204),new Point(142,193),new Point(142,189),new Point(142,173),new Point(142,160),new Point(143,147),new Point(144,136),new Point(145,128),new Point(146,126),new Point(146,122),new Point(146,120),new Point(143,120),new Point(140,125),new Point(134,136),new Point(129,147),new Point(121,164),new Point(115,176),new Point(113,180),new Point(106,198),new Point(98,215),new Point(92,228),new Point(88,235),new Point(85,241),new Point(84,238),new Point(84,235),new Point(84,232)));
    
    this.DataSet.push(DouglasPeucker(gest0));
    this.DataSet.push(DouglasPeucker(gest1));
    this.DataSet.push(DouglasPeucker(gest2));
    this.DataSet.push(DouglasPeucker(gest3));
    this.DataSet.push(DouglasPeucker(gest4));
    this.DataSet.push(DouglasPeucker(gest5));
    this.DataSet.push(DouglasPeucker(gest6));
    this.DataSet.push(DouglasPeucker(gest7));
    this.DataSet.push(DouglasPeucker(gest8));
    this.DataSet.push(DouglasPeucker(gest9));
    this.DataSet.push(DouglasPeucker(gest10));
    this.DataSet.push(DouglasPeucker(gest11));
    this.DataSet.push(DouglasPeucker(gest12));
    this.DataSet.push(DouglasPeucker(gest13));
    this.DataSet.push(DouglasPeucker(gest14));
    this.DataSet.push(DouglasPeucker(gest15));
    }

    //Funzione che riconosce la gesture data in input
    this.Recognize = function(points)
    {
        
        var t0 = process.hrtime.bigint();
        var gesture = new Gesture("input", points);
        var u = DouglasPeucker(gesture);

        if(u.Indexes == null || u.Indexes.length < 2) {
            return new Result('Illegal', 0, 0);
        }

        var templateName;
        var asset = Infinity;
        
        for (let i = 0; i < this.DataSet.length; i++) {
            
            var t = this.DataSet[i];

            if(t.Gesture.PointersNum == gesture.PointersNum)
            {
                var alignElements = AlignPolylines(u, t);
                var unknow = alignElements[0];
                var template = alignElements[1];
                var addedAngle = alignElements[2];
                var matches = alignElements[3];

                var penalty = 1 + addedAngle / (addedAngle + matches);
                var bestDist = DistanceAtBestAngle(unknow, template, template.Gesture.RotInv);

                var distance = penalty * bestDist;
                if(distance < asset) {
                    asset = distance;
                    templateName = this.DataSet[i].Gesture.Name;
                }
            }    
        }
        var t1 = process.hrtime.bigint();
        var time = t1-t0;
        var diff = Number(time) / 1000000000.0;

        if(templateName != null) {
            var finalscore = ((2.0 - asset) / 2);
            return new Result(templateName, finalscore, diff);
        } else {
            return new Result('No match', 0, diff);
        }
    }
    
    //Aggiunge una nuova gesture al dataset
    this.AddTemplate = function(name, points)
    {
        var gesture = new Gesture(name, points);
        var polyline = DouglasPeucker(gesture);
        this.DataSet.push(polyline);

		var num = 0;
        var size = this.DataSet.length;
		for (var i = 0; i < size; i++) {
			if (this.DataSet[i].Gesture.Name == name)
				num++;
		}
		return num;
    }
    
    //Cancella le gesture utente inserite
    this.DeleteUserGestures = function()
	{
		this.DataSet.length = new Array();
	}
}
//ritorna la polyline relativa alla gesture
function GetPoly(gesture, indexes) {
    return new Polyline(gesture, indexes);
}
//ritorna il punto nella gesture
function GetPoint(polyline, index)
{
    return polyline.Gesture.Points[polyline.Indexes[index]];
}
//Numero di vertici della gesture
function NumVertexes(polyline)
{
    return polyline.Indexes.length;
}
//Numero di segmenti della gesture
function NumLines(polyline)
{
    return polyline.Indexes.length - 1;
}
function DistanceAtBestAngle(u, t, rInvariant)
{
    var angle = rInvariant ? ANGLE_ROTATION_INVARIANT : ANGLE_ROTATION_SENSITIVE;    
    var a = Deg2Rad(-angle);
    var b = Deg2Rad(angle);
    var treshold = Deg2Rad(ANGLE_STEP);
    
    var uAngle = IndicativeAngle(u.Gesture, !rInvariant);
    var tAngle = IndicativeAngle(t.Gesture, !rInvariant);

    if(!rInvariant){
        uAngle = 0;
        tAngle = 0;
    }
    var vectorsU = CalculateVectors(u);
    var vectorsT = CalculateVectors(t);

    var alpha = (PHI * a) + (1.0 - PHI) * b;
    var beta = (1.0 - PHI) * a + (PHI * b);

    var pathA = DistanceAtAngle(vectorsU, vectorsT, -uAngle + alpha, -tAngle); 
    var pathB = DistanceAtAngle(vectorsU, vectorsT, -uAngle + beta, -tAngle);
    
    if( pathA != Infinity && pathB != Infinity) {
        while( Math.abs(b - a) > treshold) {
            if(pathA < pathB) {
                b = beta;
                beta = alpha;
                pathB = pathA;
                alpha = PHI * a + (1.0 - PHI) * b;
                pathA = DistanceAtAngle(vectorsU, vectorsT, -uAngle + alpha, -tAngle);
            } else {
                a = alpha;
                alpha = beta;
                pathA = pathB;
                beta = (1.0 - PHI) * a + PHI * b;
                pathB = DistanceAtAngle(vectorsU, vectorsT, -uAngle + beta, -tAngle);
            }
        }
        var finalDist = Math.min(pathA, pathB);
        return finalDist;
    } else {
        return Infinity;
    } 
}
/* Funzioni per la polilinea */
//Calcola il valore indicativo dell'angolo
function IndicativeAngle(gesture, sensitive) 
{
    var iAngle = Math.atan2(-(gesture.Centroid.Y - gesture.Points[0].Y), (gesture.Centroid.X - gesture.Points[0].X));
    iAngle = iAngle >= 0 ? iAngle : (2 * Math.PI + iAngle);
    var delta = 0.0;
    if(sensitive) {
        var baseOrientation = (Math.PI / 4.0) * ( Math.floor((iAngle + Math.PI / 8.0) / (Math.PI / 4.0)) );
        delta = baseOrientation + iAngle;
    } else {
        delta = iAngle;
    }
    return delta;
}
function DistanceAtAngle(v1, v2, theta1, theta2)
{
    var cost = 0; 
    for( let i = 0; i < v1.length; i++ ) {
        var diff = VectorDistance(v1[i], v2[i], theta1, theta2);
        cost = cost + diff;
    }
    return cost;
}
//Calcola la proporzione delle lunghezze
function LengthProportion(polyline, first, last, medium) 
{
    var all = LengthStartEnd(polyline.Gesture, polyline.Indexes[first], polyline.Indexes[last]);       
    var toMedian = LengthStartEnd(polyline.Gesture, polyline.Indexes[first], polyline.Indexes[medium] );
    return toMedian / all;
}
//lunghezza tra due nodi
function LengthStartEnd(gesture, start, end) 
{
    return gesture.Lengths[end] - gesture.Lengths[start];
}
//ritorna l'ultimo valore delle distanze
function GetLength(gesture)
{
    return gesture.Lengths[gesture.Lengths.length - 1];
}
//torna la distanza relativa ad un indice
function GetLengthByIndex(gesture, index)
{
    return gesture.Lengths[index];
}
//distanza totale gesture
function EndpointDistance(gesture)
{
    return Distance(gesture.Points[0], gesture.Points[gesture.Points.length - 1]);
}
//Calcola i vettori relativi alla gesture
function CalculateVectors(polyline)
{
    var vectors = new Array();
    for (let i = 0; i < NumLines(polyline); i++) { 
        vectors.push( new Vector(LineIntensity(polyline, i), LineSlope(polyline, i)) );
    }
    vectors.push( new Vector(InvisibleLineIntensity(polyline), InvisibleLineSlope(polyline.Gesture)) );  
    return vectors;    
}
//Calcola il centroide di una serie di punti
function CalculateCentroid(points)
{
	var centroid = new Point(0.0, 0.0);
	for (var i = 0; i < points.length; i++) {
		centroid.X += points[i].X;
		centroid.Y += points[i].Y;
	}
	centroid.X /= points.length;
	centroid.Y /= points.length;
	return centroid;
}
//Calcola il Box della gesture
function CalculateBoundingBox(points)
{
	var minX = +Infinity, 
    maxX = -Infinity, 
    minY = +Infinity, 
    maxY = -Infinity;
	for (var i = 0; i < points.length; i++) {
		minX = Math.min(points[i].X, minX);
		maxX = Math.max(points[i].X, maxX);
        minY = Math.min(points[i].Y, minY);
		maxY = Math.max(points[i].Y, maxY);
	}
	return new Rectangle(minX, minY, maxX - minX, maxY - minY);
}
//Calcola la diagonale
function Diagonal(box)
{ 
    return Math.sqrt( box.Height * box.Height + box.Width * box.Width );
}
//Ritorna la subgesture fra due punti
function PartOf(gesture, from, to)
{
    var sub = gesture.Points.slice(from, to);
    var subgesture = new Gesture(gesture.Name, sub);
    return subgesture;
}
//Calcola la distanza del punto dalla curva
function PointOnCurve(gesture, target)
{
    var referenceLength = GetLength(gesture) * target;
    var tempdist = 0;

    for (let i = 1; i < gesture.Points.length; i++) 
    {
        var current = gesture.Points[i];
        var previous = gesture.Points[i - 1]
        tempdist += Distance(current, previous);
        if(tempdist >= referenceLength)
        {
            return i;
        }
    }
        return gesture.Points.length - 1;
}
/**Intensità della linea */
function LineIntensity(polyline, lineNum)
{
    var len = polyline.Lengths[lineNum + 1] - polyline.Lengths[lineNum];
    var total = polyline.Lengths[NumLines(polyline)] + EndpointDistance(polyline.Gesture);
    return len / total;
}
function InvisibleLineIntensity(polyline)
{
    return EndpointDistance(polyline.Gesture) / ( polyline.Lengths[NumLines(polyline)] + EndpointDistance(polyline.Gesture) );
}
//Calcola l'angolo del segmento rispetto all'asse orizzontale
function LineAngle(first, last)
{
    var xDiff = last.X - first.X;
    var yDiff = first.Y - last.Y;
    var angle = Math.atan2(yDiff, xDiff); 
    return angle >= 0 ? angle : (2 * Math.PI + angle);
}
function InvisibleLineSlope(gesture)
{
    var first = gesture.Points[0];
    var last = gesture.Points[gesture.Points.length - 1];
    return LineAngle(first, last);
}
function LineSlope(polyline, lineNum)
{
    var first = GetPoint(polyline, lineNum);
    var last = GetPoint(polyline, lineNum + 1);
    return LineAngle(first, last);
}
function Angle(p0, p1, c, deg)
{
    var p0c = Math.sqrt(Math.pow(c.X - p0.X, 2) + Math.pow(c.Y - p0.Y, 2));
    var p1c = Math.sqrt(Math.pow(c.X - p1.X, 2) + Math.pow(c.Y - p1.Y, 2));
    var p0p1 = Math.sqrt(Math.pow(p1.X - p0.X, 2) + Math.pow(p1.Y - p0.Y, 2));
    var angle = Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c));
    if (deg) {
        return angle * (180/Math.PI);
    } else {
        return angle;
    }
}
function Mod(a, n)
{
    return a - Math.floor(a / n) * n;
}
function SlopeChange(polyline, index)
{
    if(index <= 0 || index >= polyline.Indexes.length - 1)
    {
        return 0;
    }
    var previous = LineSlope(polyline, index - 1);
    var next = LineSlope(polyline, index);
    var diff = previous - next;
    return Mod(diff + Math.PI, 2*Math.PI) - Math.PI;
}
function LengthAtAngle(polyline, index)
{
    return GetLengthByIndex(polyline.Gesture, polyline.Indexes[index]) / GetLength(polyline.Gesture);
}
//Calcola le lunghezze
function CalculateLengths(points)
{
    var distance = 0.0;
    var lengths = new Array();
    var tempPoint = null;
    lengths.push(distance);
    points.forEach( function(point) {
        if(tempPoint != null){
            distance += Distance(tempPoint, point);
            lengths.push(distance);
        }
        tempPoint = new Point(point.X, point.Y);
    });
    return lengths;
}
//Calcola le lunghezze della polilinea
function CalculateLengthsPoly(points, indexes)
{
    var distance = 0.0;
    var lengths = new Array();
    var tempPoint = null;
    lengths.push(distance);

    indexes.forEach( function(index) {
        var point = points[index];
        if(tempPoint != null){
            distance = distance + Distance(tempPoint, point);
            lengths.push(distance);
        }
        tempPoint = point;
    });
    return lengths;
}
//Distanza tra due punti
function Distance(p1, p2)
{
	var dx = p2.X - p1.X;
	var dy = p2.Y - p1.Y;
	return Math.sqrt(dx * dx + dy * dy);
}
//Calcola la distanza fra 2 vettori
function VectorDistance( v1, v2, r1, r2 ) {
    var x = RotationHorizontal(v1, r1) - RotationHorizontal(v2, r2);
    var y = RotationVertical(v1, r1) - RotationVertical(v2, r2);
    var distance = Math.sqrt( x * x + y * y) / 2;
    return distance;
}
function RotationVertical( vector, rotation ) {
    return vector.Intensity * Math.sin(vector.Angle + rotation);
} 
function RotationHorizontal( vector, rotation ) {
    return vector.Intensity * Math.cos(vector.Angle + rotation);
} 
//Conversione Gradi in Radianti
function Deg2Rad(d) 
{ 
    return (d * Math.PI / 180.0); 
}
/**Funzioni  Needleman-Wunsch due polilinee di input*/
function NeedlemanWunsch(input, template)
{
    var mScore = 0;
    var insertions = 0;
    var deletions = 0;
    var matches = 0;
    var alignment = new Array();
    var lengthA = NumLines(input);
    var lengthB = NumLines(template);
    var mD = new Array(lengthA + 1).fill(0).map(() => new Array(lengthB + 1).fill(0));

    //inizializza la matrice
    for (let i = 0; i <= lengthA; i++) {
        for (let j = 0; j <= lengthB; j++) {
            if (i == 0) {
                mD[i][j] = j * GAP_COST;
                // -j;
            } else if (j == 0) {
                mD[i][j] = i * GAP_COST;
                // -i;
            } else {
                mD[i][j] = 0;
            }
        }
    }
    //riempie le celle della matrice
    for (let i = 1; i <= lengthA; i++ ) {
        for(let j = 1; j <= lengthB; j++ ) {           
            var scoreDiag = mD[i - 1][j - 1] + Similarity(i, j, input, template);
            var scoreLeft = mD[i][j - 1] + GAP_COST;
            var scoreUp = mD[i - 1][j] + GAP_COST;
            mD[i][j] = Math.max(Math.max(scoreDiag, scoreLeft), scoreUp);
        }
    }
    //allinea le due sequenze
    var i = lengthA;
    var j = lengthB;
    mScore = mD[i][j] / (i + j);
    alignment.push(new Point(i,j));
    while (i > 0 && j > 0) {
        if ( mD[i][j] == mD[i - 1][j - 1] + Similarity(i, j, input, template) ) {
            alignment.unshift(new Point(i-1, j-1));      
            matches++;
            i--;
            j--;
            continue;
        } else if (mD[i][j] == mD[i][j - 1] + GAP_COST) {
            alignment.unshift(new Point(-1, j-1));
            insertions++;
            j--;
            continue;
        } else {
            alignment.unshift(new Point(i-1, -1));
            deletions++;
            i--;
            continue;
        }
    }
    //filtra i punti dell'allineamento
    var matchedPoints = new Array();
    alignment.forEach( function(point)
    {
        if(point.X != -1 && point.Y != -1) {
            matchedPoints.push(new Point(point.X, point.Y));
        }
    });

    return [matchedPoints, matches];
}

function Similarity(i, j, input, template )
{
    var weight = 1.0 - (BALANCE * Math.abs(LengthAtAngle(input, i - 1) - LengthAtAngle(template, j - 1))
                + (1 - BALANCE) * AngleDiff(SlopeChange(input, i - 1), SlopeChange(template, j - 1)));
    return weight;
}
//differenza tra 2 angoli
function AngleDiff(angleA, angleB)
{
    var diff = Math.abs(angleA - angleB);
    if (diff > Math.PI) {
        diff = 2 * Math.PI - diff;
    }
    return diff / Math.PI;
}

//funzioni Polyline Aligner
function AlignPolylines(input, template)
{
    var inputvert = new Array();
    var templatevert = new Array();

    var matchelement = NeedlemanWunsch(input, template);
    
    var matched = matchelement[0];
    var matches = matchelement[1] + 2;
    
    var previousX = 0;
    var previousY = 0;
    var addedI = 0;
    var addedT = 0;

    for(let i = 0; i < matched.length; i++) {
        
        var current = matched[i];

        var toInsertX = current.Y - previousY - 1;
        for(let j = 0; j < toInsertX; j++) {
            var distx = LengthProportion(template, previousY, current.Y, previousY + j + 1);
            Insert(input.Gesture, input.Indexes, inputvert, previousX, current.X, distx);
            addedI++;
        }
        
        var toInsertY = current.X - previousX - 1;
        for(let j = 0; j < toInsertY; j++) {
            var disty = LengthProportion(input, previousX, current.X, previousX + j + 1);
            Insert(template.Gesture, template.Indexes, templatevert, previousY, current.Y, disty);            
            addedT++;
        }
        previousX = current.X;
        previousY = current.Y;
    }
    input.Indexes.forEach( index => inputvert.push(index));
    inputvert.sort(function(a, b) {
        return a - b;
    });

    template.Indexes.forEach( index => templatevert.push(index));
    templatevert.sort(function(a, b) {
        return a - b;
    });

    var t = new Polyline(input.Gesture, inputvert);
    var o = new Polyline(template.Gesture, templatevert);

    return [t, o, addedI + addedT, matches];
}

function Insert(gesture, vertexesFrom, vertexesTo, prev, next, dist)
{
    var toAdd = vertexesFrom[prev];
    var sub = PartOf(gesture, vertexesFrom[prev], vertexesFrom[next]);
    toAdd += PointOnCurve(sub, dist);
    vertexesTo.push(toAdd);
}

//Applica l'algoritmo di douglas-peucker per la riduzione di punti
function DouglasPeucker(gesture)
{
    var tolerance = Diagonal(gesture.BoundingBox) / DPR_PARAMS.SParam;
    var vertexes = new Array();
    //Riduzione con tolleranza
    var n = gesture.Points.length;
    //se la gesture ha 2 o meno punti non può essere ridotta
    if(tolerance <= 0 || n < 3 ){
        return;
    }
    var marked = new Array();
    //i vertici da tenere sono marcati con true
    for( let i = 1; i < n - 1; i++ ) {
        marked[i] = false;
    }
    marked[0] = true;
    marked[n -1] = true;
    
    Reduce(gesture.Points, marked, tolerance, 0, n-1);
    
    for(let i = 0; i < n; i++) {
        if(marked[i]){
            vertexes.push(i);
        }
    }

    Fusion2(vertexes, gesture);
    return GetPoly(gesture, vertexes);
}

//rimuove l'angolo più piccolo
function Fusion2(vertexes, gesture)
{
    var smallest = SmallestAngle(vertexes, gesture);
    while(smallest != -1){
        vertexes.splice(smallest, 1);
        smallest = SmallestAngle(vertexes, gesture);
    }
}

//calcola l'indice dell'angolo minore
function SmallestAngle(vertexes, gesture)
{
    if( vertexes.length <= 2 ){
        return -1;
    }
    var min = 0;
    var smallestMeasure = 360.0;
    
    var first = vertexes[0];
    var medium = vertexes[1];
    for(let i = 2; i < vertexes.length; i++ ) {
        var last = vertexes[i];
        var angle = Math.abs( 180 - Angle(gesture.Points[first], gesture.Points[last], gesture.Points[medium], true) );        
        if(angle < smallestMeasure) {
            min =  medium;
            smallestMeasure = angle;
        }
        first = medium;
        medium = last;
    }
    var element = smallestMeasure > SLOPE_TRESHOLD ? -1 : min;
    if(element == -1)
        return -1;
    else    
        return vertexes.indexOf(element);
}
//Riduce il numero di indici
function Reduce(points, marked, tolerance, first, last)
{
    if(last <= first + 1) {
        return;
    }
    var maxDistance = 0.0;
    var indexFarthest = 0;

    var firstPoint = points[first];
    var lastPoint = points[last];
    
    for (let idx = first + 1; idx < last; idx++) {
       
        var current = points[idx];
        var distance = OrthogonalDistance(current, firstPoint, lastPoint);
       
        if (distance > maxDistance) {
            maxDistance = distance;
            indexFarthest = idx;
        }
    }
    if (maxDistance > tolerance) {
        marked[indexFarthest] = true;
        Reduce(points, marked, tolerance, first, indexFarthest);
        Reduce(points, marked, tolerance, indexFarthest, last);
    }
}
//Calcola la distanza ortogonale
function OrthogonalDistance(point, lineStart, lineEnd)
{
    if(lineStart.X == lineEnd.X && lineStart.Y == lineEnd.Y){
        return Distance(lineStart,point);
    }
    var area = Math.abs((1.0 * lineStart.Y * lineEnd.X + 1.0 * lineEnd.Y * point.X + 1.0 * point.Y * lineStart.X
                - 1.0 * lineEnd.Y * lineStart.X - 1.0 * point.Y * lineEnd.X - 1.0 * lineStart.Y * point.X)
                / 2.0);
    var bottom = Math.hypot(lineStart.Y - lineEnd.Y, lineStart.X - lineEnd.X);
    return area / bottom * 2.0;
}

module.exports = {
    PolyRecognizer,
    Point
}