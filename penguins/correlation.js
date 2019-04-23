corr("crafty-penguin-300px.png","bookworm-penguin-300px.png",true);

function corr(peng1,peng2,first){
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
    if(first){
      circles(r,mixed);
    }
    else{
      drawLine(r,mixed);
    }
  },
function(err){
  console.log(err);
});
}

function drawLine(r,grades){
  var height = 500;
  var width = 1400;
  var margins={left:30,right:30,top:30,bot:30};
  var svg = d3.select("svg");
  var xScale = d3.scaleLinear()
                 .domain([0,42])
                 .range([margins.left,width-margins.right]);
  var yScale = d3.scaleLinear()
                 .domain([0,1])
                 .range([height-margins.top,margins.bot]);
  var first = grades.map(function(d){return d[0];});
  var second = grades.map(function(d){return d[1];});
  svg.selectAll("circle#fir")
     .data(first)
     .attr("cy",function(d){return yScale(d);})
     .transition();

  svg.selectAll("circle#sec")
     .data(second)
     .attr("cy",function(d){return yScale(d)})
     .transition();

  var liner = d3.line()
                .x(function(d){return d.x})
                .y(function(d){return d.y});
  //try 2
  var y1 = d3.mean([d3.mean(first),d3.mean(second)]);
  var y2 = y1+r*42/100;
  var points = [{x:xScale(0),y:yScale(y1)},{x:xScale(42),y:yScale(y2)}];
  console.log(svg.select("path.fit_line"));
  svg.select("path.fit_line")
     .attr("d",liner(points))
     .transition();

}

function graph(){
  var height = 500;
  var width = 1400;

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

function circles(corr_coef,daters){
  var height = 500;
  var width = 1400;
  var margins={left:30,right:30,top:30,bot:30};
  var svg = d3.select("svg");
  var xScale = d3.scaleLinear()
                 .domain([0,42])
                 .range([margins.left,width-margins.right]);
  var yScale = d3.scaleLinear()
                 .domain([0,1])
                 .range([height-margins.top,margins.bot]);
  var first = daters.map(function(d){return d[0];});
  var second = daters.map(function(d){return d[1];});
  svg.selectAll("circle")
     .data(first)
     .enter()
     .append("circle")
     .attr("cx",function(d,i){return xScale(i);})
     .attr("cy",function(d){return yScale(d);})
     .attr("r",3)
     .attr("id","fir")
     .attr("fill","blue");

  svg.selectAll("circle#none")
     .data(second)
     .enter()
     .append("circle")
     .attr("cx",function(d,i){return xScale(i);})
     .attr("cy",function(d){return yScale(d);})
     .attr("r",3)
     .attr("id","sec")
     .attr("fill","red");

  var liner = d3.line()
                .x(function(d){return d.x})
                .y(function(d){return d.y});

  //try 2
  var y1 = d3.mean([d3.mean(first),d3.mean(second)]);
  var y2 = y1+corr_coef*42/100;
  var points = [{x:xScale(0),y:yScale(y1)},{x:xScale(42),y:yScale(y2)}];
  console.log(points);

  svg.append("path")
     .attr("d",liner(points))
     .attr("stroke","orange")
     .attr("stroke-width",3)
     .attr("class","fit_line");
}
