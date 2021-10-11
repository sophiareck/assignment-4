var covidData; //csv name
var size = 2;
var canvasWidth = (size * 630) + 5;
var counter = 0;

var dataCase = function(mrange, fclr, clm) {
  this.maxRange = mrange
  this.fillColor = fclr
  this.column = clm
}

function preload() {
  covidData = loadTable('usa-covid-data.csv',
    'csv', 'header');
}

function mapData(Case) {
  fill(Case.fillColor);
  for (var i = 0; i < 623; i++) { //go through all 623 rows of data
    let graphCase = map(covidData.getNum(i, Case.column), 0, Case.maxRange, 500, 0);
    ellipse(((i * size) % canvasWidth) + 5, graphCase + 10, size, size);
  }
}

function setup() {
  createCanvas(canvasWidth, 600);
  textAlign(CENTER);
}

function draw() {
  let newCases = new dataCase(303008, [0, 0, 255], "new_cases");
  let totalCases = new dataCase(43947324, [0, 255, 0], "total_cases");
  let totalDeaths = new dataCase(705225, [255, 0, 0], "total_deaths");
  background(20);
  stroke(255);
  line(0, 510, canvasWidth, 510);
  line(2, 0, 2, 600);
  noStroke();
  fill(255);
  textSize(15);
  text("MAR '20", 130, 530);
  text("JUN '20", 340, 530);
  text("JAN '21", width / 2 + 70, 530);
  text("APR '21", canvasWidth - 370, 530);
  text("OCT '21", canvasWidth - 50, 530);
  if (counter == 0) {
    mapData(newCases);
    fill(255);
    textSize(15);
    text("0 cases", 30, 510);
    text("150,000 cases", 52, 240);
    text("300,000 cases", 52, 30);
    textSize(30);
    text("New COVID Cases Per Day in the USA", width / 2, 580);
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
    mapData(newCases);
    mapData(totalCases);
    mapData(totalDeaths);
    fill(255);
    textSize(30);
    text("Combined Charts for Comparison", width / 2, 570);
    textSize(15);
    text("important note: Y scale for each graph is different. this is just to observe trends", width / 2, 590);
  }
}

function mousePressed() {
  if (counter == 3) {
    counter = -1;
  }
  counter += 1;
}
