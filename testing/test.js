const {PolyRecognizer, Point} = require('../polyrec.js');
//crea l'istanza del riconoscitore
var recognizer = new PolyRecognizer(true);

//per conteggiare i risultati
var countSI = 0;
var countNO = 0;
var alltime = 0;

const convert = require('xml-js');
const fs = require('fs');
const path = require('path');
const { time } = require('console');
const options = {compact: true, ignoreComment: true, ignoreDoctype: true, alwaysChildren: true, ignoreDescription: true, ignoreInstruction: true};

//funzione che carica l'intero dataset ed eseguo su di esso il riconoscitore 
const getAllFiles = function(dirPath) {
  files = fs.readdirSync(dirPath)
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      getAllFiles(dirPath + "/" + file)
    } else if(fs.statSync(dirPath + "/" + file).isFile()) {
      
      var filename = fs.readFileSync(dirPath + "/" + file, 'utf-8');
      var result = convert.xml2js(filename, options);
      //dove conservare i punti
      var myPoints = new Array();
      //prendo i dati e creo i punti della gesture
      result.Gesture.Point.forEach(element => {
        var xvalue = Number(element._attributes.X);
        var yvalue = Number(element._attributes.Y);
        var point = {X: 0, Y: 0};
        point.X = xvalue;
        point.Y = yvalue;
        myPoints.push(point);
      });
      //creo la relativa polilinea e la aggiungo ai templates   
      //nome della gesture senza il .xml
      var result = recognizer.Recognize(myPoints);      
      alltime = alltime + result.Time;
      var filepath = path.join(__dirname, dirPath, "/", file);
      
      if(filepath.search(result.name) != -1) {
        countSI = countSI + 1;
      } else {
        countNO = countNO + 1;
      }      
      fs.appendFileSync("./test-result", "Result: " + result.Name + ", score: " + result.Score + ", time: " + result.Time + "s   +++    path: " + filepath.slice(22, filepath.length) + "\r\n", function(err) {
        
        if(err) {
          return console.log(err);
        }
      });
      
    } else {
      return;
    }
  })
  return;
}

//prende in input il nome dell'xml e lo processa col riconoscitore
const loadInputGesture = function(file) {
  var xml = fs.readFileSync('../input/s02/fast/' + file, 'utf8'); 
  var result = convert.xml2js(xml, options);
  var myPoints = new Array();
  
  result.Gesture.Point.forEach(element => {
    var xvalue = Number(element._attributes.X);
    var yvalue = Number(element._attributes.Y);
    var point = {X: 0, Y: 0};
    point.X = xvalue;
    point.Y = yvalue;
    myPoints.push(point);
  });
  
  var res = recognizer.Recognize(myPoints);    
  console.log('Result: ' + res.Name + ", score: " + res.Score + ", time: " + res.Time + "ms"); 
}

getAllFiles("../input");
console.log(alltime/4800);
//loadInputGesture('rectangle04.xml');

/* var points = new Array(new Point(0, 0),new Point(1, 0),new Point(2, 1),new Point(3, 2),new Point(3, 3),new Point(2, 2),new Point(0, 0));
var num = recognizer.AddTemplate("mygest", points);

console.log(num);
var r = recognizer.Recognize(points)
console.log(r.Name + ', '  + r.Score) */