
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
}

var goAgain = function(){

}

var myMove = function(){
  console.log("CALLED");
  var go=true;
  var strs= ["01","02","03","11","12","13","21","22","23"];
  for(var i=0;i<9;i++){
    var name = "picture"+strs[i];
    var pic= document.getElementById(name);
    console.log(pic.src);
    if((pic.src==="https://mcallisterd.github.io/Lab2/white_back.PNG" && go) || (pic.src==="file:///C:/Users/New%20User/github/Lab2/images/white_back.PNG" && go) ){
        pic.src="images/o.jpg"
        pic.removeAttribute("onclick")
        go= false;
    }
  }
}
