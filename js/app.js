
function Population (geneLength, goal, size) {
  this.members = [];
  this.geneLength = geneLength;
  this.goal = goal;
  this.generationNumber = 0;
  while (size --) {
    var gene = new Gene();
    gene.random(this.geneLength);
    this.members.push(gene);
  }
}

Population.prototype.display = function () {
  var data = document.getElementById("data");
  data.innerHTML = "";
  data.innerHTML += ("<h2>Generation: " + this.generationNumber + "</h2>");
  data.innerHTML += ("<ul>");
  for (var i = 0; i < this.members.length; i ++) {
    data.innerHTML += ("<li>" + this.members[i].code + " (" + this.members[i].cost + ")");
  }
  data.innerHTML += ("</ul>");
};

Population.prototype.sort = function () {
  this.members.sort(function (a, b) {
    return b.cost - a.cost;
  });
};

Population.prototype.generation = function () {
  for (var i = 0; i < this.members.length; i ++) {
    this.members[i].calcCost(this.goal);
  }
  this.sort();
  this.display();
  var children = this.members[0].mate(this.members[1]);
  children[0].mutate(0.1);
  children[1].mutate(0.1);
  this.members.splice(this.members.length - 2, 2, children[0], children[1]);
  for (i = 0; i < this.members.length; i ++) {
    if (this.members[i].code == this.goal) {
      this.sort();
      this.display();
      return true;
    }
  }
  this.generationNumber ++;
};

function Gene (code) {
  //think this if is if code is given through birth or randomly generated
  if (code) this.code = code;
  else this.code = [];
  this.cost = 0;
}


Gene.prototype.random = function (length) {
  while (length --) {
    this.code.push(Math.random().toFixed(3));
  }
};

Gene.prototype.mutate = function (chance) {
  if (Math.random() > chance) return;
  
  var upOrDown = Math.random() <= 0.5 ? -1 : 1;
  var index = Math.floor(Math.random() * this.code.length);
  // upOrDown moves the mutate character up or down 1
  // can use to mutate up or down by a certain stepsize
  var newMutate = (parseFloat(this.code[index]) + parseFloat(upOrDown*0.01)).toFixed(3);
  if (newMutate >= 1) {
    newMutate = 1;
  } else if (newMutate <= 0) {
    newMutate = 0;
  }
  var newGene = [];
  for (i = 0; i < this.code.length; i ++) {
    if (i === index) newGene.push(newMutate);
    else newGene.push(this.code[i]);
  }
  this.code = newGene;
};

Gene.prototype.mate = function(gene) {
  var pivot = Math.round(this.code.length/2) -1;

  var child1 = this.code.slice(0, pivot).concat(gene.code.slice(pivot));
  var child2 = gene.code.slice(0, pivot).concat(this.code.slice(pivot));
  
  return [new Gene(child1), new Gene(child2)];
};

Gene.prototype.calcCost = function(compareTo) {
  var score = prompt("rate this gene");
  this.cost = score;
};

var population = new Population(20, 100, 8);
var counter = 0;
var fonts = {
  0: "Poiret One",
  1: "Lobster",
  2: "Shadows Into Light",
  3: "Open Sans",
  4: "Vollkorn",
  5: "Pacifico",
  6: "Orbitron",
  7: "Dancing Script",
  8: "Abril Fatface",
  9: "Bangers"
};
var display = {
  0: "inline",
  1: "inline-block",
  2: "block"
};
var floats = {
  0: "left",
  1: "right",
  2: "none"
}
var advert = document.getElementById("adv-box"),
  header = document.getElementById("header"),
  footer = document.getElementById("footer"),
  article = document.getElementsByTagName("article"),
  h1 = document.getElementsByTagName("h1"),
  main = document.getElementById("main"),
  nav = document.getElementById("nav");


function advertBox () {
  console.log(population);
  var r = Math.floor(population.members[counter].code[0] * 255);
  var g = Math.floor(population.members[counter].code[1] * 255);
  var b = Math.floor(population.members[counter].code[2] * 255);
  var fontSize = Math.floor(population.members[counter].code[3] * 50);
  var fontFamily = fonts[Math.floor(population.members[counter].code[4]*10)];
  var navDisplay = display[Math.floor(population.members[counter].code[5]*3)];
  var navFloat = floats[Math.floor(population.members[counter].code[6]*3)];
  advert.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  header.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  footer.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
  article[0].style.backgroundColor = "rgb(" + (r + 100) + "," + (g + 50) + "," + (b + 100) + ")";
  main.style.fontSize = fontSize + "px";
  advert.style.fontSize = fontSize + "px";
  main.style.fontFamily = fontFamily;
  nav.style.display = navDisplay;
  nav.style.float = navFloat
  counter ++;
  if (counter === 8) {
    counter = 0;
    population.generation();
  }
}

advert.addEventListener("click", function (e) {
  advertBox();
});
