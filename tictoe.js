
var start = function(){
  //document.getElementById("kill").removeAttribute(onclick);
  var t= document.getElementById("t1");

  for(var i=1;i<4;i++){
      var r= document.createElement("tr");
      for(var j=0; j<3;j++){
        var ID="picture"+j.toString()+i.toString();
        var tableElement= document.createElement("td");
        var picture = document.createElement("img");
        picture.src="images/white_back.PNG";
        picture.id=ID
        var clk="document.getElementById('"+ID+"').setAttribute('src','images/x.png')";
        picture.setAttribute("onclick",clk);
        picture.width="200";
        picture.height="200";
        tableElement.appendChild(picture);
        r.appendChild(tableElement);
      }
      t.appendChild(r);
  }
}

var myMove = function(){
  var go=true;
  var strs= ["01","02","03","11","12","13","21","22","23"];
  for(var i=0;i<9;i++){
    var name = "picture"+strs[i];
    var pic= document.getElementById(name);
    if(pic.src==="https://mcallisterd.github.io/S19DataVis265/white_back.PNG" && go){
        pic.src="o.jpg"
        pic.removeAttribute("onclick")
        go= false;
    }
  }
}
