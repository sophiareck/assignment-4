var covidData; //csv name
var size = 2;
var canvasWidth = (size * 630) + 5; //make width a bit larger than needed
var counter = 0; //keep track of which graph to show

var dataCase = function(mrange, fclr, clm) {
  this.maxRange = mrange //y axis range
  this.fillColor = fclr //color
  this.column = clm //which column to use in csv
}

function preload() {
  covidData = loadTable('usa-covid-data.csv', //from https://ourworldindata.org/coronavirus-source-data
    'csv', 'header');
}

function mapData(Case) {
  fill(Case.fillColor); //set color
  for (var i = 0; i < 623; i++) { //go through all 623 rows of data
    let graphCase = map(covidData.getNum(i, Case.column), 0, Case.maxRange, 500, 0); //get numbers from case object's column
    ellipse(((i * size) % canvasWidth) + 5, graphCase + 10, size, size);
  }
}

function setup() {
  createCanvas(canvasWidth, 600);
  textAlign(CENTER);
}

function draw() {
  let newCases = new dataCase(303008, [0, 0, 255], "new_cases"); //create dataCase objects
  let totalCases = new dataCase(43947324, [0, 255, 0], "total_cases");
  let totalDeaths = new dataCase(705225, [255, 0, 0], "total_deaths");

  background(20);
  stroke(255);
  line(0, 510, canvasWidth, 510); //x axis
  line(2, 0, 2, 600); //y axis
  noStroke();

  fill(255); //x axis labels
  textSize(15);
  text("(click to cycle through data)", 100, 590);
  text("MAR '20", 130, 530);
  text("JUN '20", 340, 530);
  text("JAN '21", width / 2 + 70, 530);
  text("APR '21", canvasWidth - 370, 530);
  text("OCT '21", canvasWidth - 50, 530);

  if (counter == 0) { //which graph to show depending on user clicking
    mapData(newCases); //sends dataCase object info to custom function for mapping
    fill(255);
    textSize(15);
    text("0 cases", 30, 510);
    text("150,000 cases", 52, 240);
    text("300,000 cases", 52, 30); //units
    textSize(30);
    text("New COVID Cases Per Day in the USA", width / 2, 580); //title
  } else if (counter == 1) {
    mapData(totalCases);
    fill(255);
    textSize(15);
    text("0 cases", 30, 510);
    text("5 million cases", 52, 450);
    text("20 million cases", 57, 230);
    text("40 million cases", 57, 50);
    textSize(30);
    text("Total COVID Cases in the USA Over Time", width / 2, 580);
  } else if (counter == 2) {
    mapData(totalDeaths);
    fill(255);
    textSize(15);
    text("0 deaths", 30, 510);
    text("100,000 deaths", 55, 455);
    text("350,000 deaths", 55, 240);
    text("700,000 deaths", 55, 30);
    textSize(30);
    text("Total COVID Deaths in the USA Over Time", width / 2, 580);
  } else {
    mapData(newCases); //overlays all graphs to see patterns
    mapData(totalCases);
    mapData(totalDeaths);
    fill(255);
    textSize(30);
    text("Combined Charts for Comparison", width / 2, 570);
    textSize(15);
    text("important note: Y scale for each graph is different. this is just to observe trends", width / 2, 590);
  }
}

function mousePressed() { //increment counter for graph cycling
  if (counter == 3) {
    counter = -1;
  }
  counter += 1;
}
