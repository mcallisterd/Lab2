var start = function(){
  var t= document.getElementById("t1");
  for(var i=1;i<4;i++){
      var r= document.createElement("tr");
      for(var j=0; j<3;j++){
        var ID="picture"+j.toString()+i.toString();
        var tableElement= document.createElement("td");
        var picture = document.createElement("img");
        picture.src="images/white_back.PNG";
        picture.id=ID
        picture.setAttribute("onclick","clickered('"+ID+"')");
        picture.width="200";
        picture.height="200";
        tableElement.appendChild(picture);
        r.appendChild(tableElement);
      }
      t.appendChild(r);
  }
}

var clickered = function(ID){
  var clicked= document.getElementById(ID);
  var tab= document.getElementById("t1");
  if(tab.getAttribute("name")=="x"){
    clicked.src="images/x.png";
    tab.setAttribute("name","o");
  }
  else{
    clicked.src="images/o.jpg";
    tab.setAttribute("name","x");
  }
  clicked.onclick=null;
  if(checkWinner(tab)){
    var celebrate= document.createElement("h3");
    celebrate.innerText="Nice job "+tab.getAttribute("name")+", you won!"
    celebrate.id="laster";
    tab.after(celebrate);
    goAgain();
  }
  else if (full()) {
    var celebrate= document.createElement("h3");
    celebrate.innerText="Tie, nobody wins"
    celebrate.id="laster";
    tab.after(celebrate);
    goAgain();
  }
}

var full = function(){
  var table= document.getElementById("t1");
  var pictures= allPictures(table);
  var sources=[];
  for(var i=0;i<pictures.length;i++){
    sources.push(pictures[i].getAttribute("src"));
  }
  if(!sources.includes("images/white_back.PNG")){
    return true;
  }
  return false;
}

var checkWinner = function(tab){
  var p= allPictures(tab);
  var pictures=[];
  for(var i=0;i<p.length;i++){
    pictures.push(p[i].src);
  }
  var ops= [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  for(var i=0;i<ops.length;i++){
    if(triMatch(pictures[ops[i][0]],pictures[ops[i][1]],pictures[ops[i][2]])){
      tab.setAttribute("name",xoro(pictures[ops[i][0]]));
      return true;
    }
  }
  return false;
}

var xoro = function(a){
  if(a=="file:///C:/Users/New%20User/github/Lab2/images/x.png" || a=="images/x.png" || a=="https://mcallisterd.github.io/Lab2/images/x.png"){
    return "X";
  }
  return "O"
}

var triMatch = function(a,b,c){
  if(a==b && b==c && a!="file:///C:/Users/New%20User/github/Lab2/images/white_back.PNG" && a!="https://mcallisterd.github.io/Lab2/images/white_back.PNG"){
    return true;
  }
  return false;
}

var allPictures= function(tableau){
  var pictures=[]
  var k = tableau.children;
  for(var i=0; i<k.length;i++){
    var k2= k[i].children;
    for(var j=0; j<k2.length;j++){
      pictures.push(k2[j].children[0]);
    }
  }
  return pictures;
}

var turnemoff = function(tableau){
  var allP= allPictures(tableau);
  for(var i=0;i<allP.length;i++){
    var sq=allP[i];
    sq.removeAttribute("onclick");
    sq.removeAttribute("id")
  }
}

var goAgain = function(){
  var last= document.getElementById("t1");
  var very= document.getElementById("laster");
  turnemoff(last);
  last.removeAttribute("id");

  var br = document.createElement("hr");
  var tab = document.createElement("table");
  tab.id="t1";
  tab.name="x";

  very.after(br);
  br.after(tab);

  start()
}
