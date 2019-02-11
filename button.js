
var magic = function(){
  header= document.getElementById("first");
  if (header.innerText=="Buttons"){
    header.innerText= "This is now changed";
  }
  else{
    header.innerText= "Buttons"
  }
}
var questions= function(){
  L= document.getElementById("qlist");
  for(var i=0;i<20;i++){

  }
}

var writeMAIN = function(){
    var top = document.getElementById("start");
    var q1 = document.createElement("h2");
    q1.innerText = "Which US president is not pictured?";

    var pics = ["images/taft.png", "images/fdr.png", "images/jfk.png"]
    var optionNames= ["John F Kennedy","William Howard Taft","William McKinley"];

    var table = writeTable(optionNames,pics);

    top.after(q1);
    q1.after(table);

    var q2 = document.createElement("h2");
    q2.innerText = "Which country is highlighted on the map?";
    var c = document.createElement("img");
    c.src= "images/africa.svg";
    c.width="400";
    c.height="400";
    var countries = ["Chad", "Sudan", "CAR"];
    var t2 = document.createElement("table");
    var row2 = document.createElement("tr");
    row2.id= "row95";
    for(var i =0;i<3; i++){
        var d = document.createElement("td");
        var but = document.createElement("input");
        but.type="submit";
        but.value= countries[i];
        but.id= but.value;
        but.onclick = "checkRight(['"+but.id+"','"+row2.id+"')"
        d.appendChild(but);
        row2.appendChild(d);
    }
    t2.appendChild(row2);
    table.after(q2);
    q2.after(c);
    c.after(t2);

    var ops= ["Hippopotamus","Komodo Dragon","Cassowary"];
    var pictos = ["images/hippo.jpg","images/komodo.jpg","images/casso.jpg"];
    var table2 = writeTable(ops,pictos);

    var q3= document.createElement("h2");
    q3.innerText="Which animal is fastest?";
    t2.after(q3)
    q3.after(table2);
}

var checkRight = function(clickedID,rowID){
  var row= document.getElementById(rowID);
}

var writeTable= function(optionNames,pics){
  var table = document.createElement("table");
  for(var j = 0; j<2 ;j++){
    var row = document.createElement("tr");
    row.id= "row"+j.toString()+optionNames[0];
    for(var i =0; i<3;i++){
        var ele = document.createElement("td")
        if (j==0) {
          var pic = document.createElement("img");
          pic.src =pics[i];
          pic.height="200";
          pic.width ="200";
          ele.appendChild(pic);
        } else {
          var option = document.createElement("input");
          option.value= optionNames[i];
          option.id= option.value;
          option.onclick= "checkRight(['"+option.value+"','"+row.id+"'])";
          option.type="submit";
          ele.appendChild(option);
        }
        row.appendChild(ele);
    }
    table.appendChild(row);
  }
  return table;
}