corr("crafty-penguin-300px.png","bookworm-penguin-300px.png");

function corr(peng1,peng2){
  //get their data
  d3.json("classData.json").then(function(data){
    var p1Data;
    var p2Data;
    data.forEach(function(d){
      if(d.picture==peng1){
        p1Data=d.final.concat(d.homework).concat(d.test).concat(d.quizes);
      }
      if(d.picture==peng2){
        p2Data=d.final.concat(d.homework).concat(d.test).concat(d.quizes);
      }
    });
    //transform into array
    p1Data= p1Data.map(function(d){return d.grade/d.max});
    p2Data= p2Data.map(function(d){return d.grade/d.max});
    mixed = p1Data.map(function(d,i){return [d,p2Data[i]]});
    //find the correlation
    var muX= d3.mean(p1Data);
    var muY= d3.mean(p2Data);
    var sX=  d3.deviation(p1Data);
    var sY=  d3.deviation(p2Data);
    var r =  1/((p1Data.length - 1)*sX*sY);

    r*=mixed.reduce(function(total,d){
      return total + ( d[0] - muX ) * ( d[1] - muY );
    },0);
    drawLine(r,mixed);
  },
function(err){
  console.log(err);
});
}

function drawLine(r,grades){
  console.log(r,grades);
}

function graph(){
  var height = 700;
  var width = 700;

  var margins={left:30,right:30,top:30,bot:30};
  var svg = d3.select("svg")
              .attr("height",height)
              .attr("width",width);

  var xScale = d3.scaleLinear()
                 .domain([0,42])
                 .range([margins.left,width-margins.right]);
  var yScale = d3.scaleLinear()
                 .domain([0,1])
                 .range([height-margins.top,margins.bot]);
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  svg.append("g")
     .classed("xAxis",true)
     .call(xAxis)
     .attr("transform","translate(0,"+(height-margins.bot)+")");

  svg.append("g")
     .classed("yAxis",true)
     .call(yAxis)
     .attr("transform","translate("+margins.left+",0)");
  getPenguins();
}

function getPenguins(){
  d3.json("classData.json").then(function(data){
    var pictures=[]
    data.forEach(function(d){
      pictures.push(d.picture);
    });

    pictures.forEach(function(d){
      d3.select("body")
        .append("div")
        .append("text")
        .text(function(h){
          var s = d.split("-");
          return s[0]+" "+s[1];
        })
        .append("img")
        .attr("src",d)
        .attr("height",50)
        .attr("width",50)
        .on("click",function(){
          var currentP = d3.selectAll("svg");
          currentP = currentP.nodes()[0].id
          corr(currentP,d);
          d3.select("svg").attr("id",d);
        })
    })
  },
  function(err){
    console.log(err);
})
}
