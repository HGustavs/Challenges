//------------------------------------=======############==========----------------------------------------
//                                   Math Functions for Line Geometry
//------------------------------------=======############==========----------------------------------------

// line intercect math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
var intersectcount=0;

function intersect(x1,y1,x2,y2,x3,y3,x4,y4) {
  intersectcount++;
	
  // Check if none of the lines are of length 0
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) return false;

  denominator = ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  // Lines are parallel
  if (denominator === 0) return false;

  let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  let ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua <= -0.001 || ua >= 0.999 || ub <= -0.001 || ub >= 0.999) return false;

  // Return a object with the x and y coordinates of the intersection
  let x = x1 + ua * (x2 - x1)
  let y = y1 + ua * (y2 - y1)
  
  return {x:x, y:y}
}

// line intercect math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments - modified to test intersection between line and ray
function intersectRay(p1,p2,p3,p4) {
    testcnt++;

    // Check if none of the lines are of length 0
    if ((p1.x === p2.x && p1.y === p2.y) || (p3.x === p4.x && p3.y === p4.y)) return false;

    denominator = ((p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y));

    // Lines are parallel
    if (denominator === 0) return false;

    let ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
    let ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;

    if (ua < 0 || ua > 1) {
        return false
    }

    // Return a object with the x and y coordinates of the intersection
    let x = p1.x + ua * (p2.x - p1.x);
    let y = p1.y + ua * (p2.y - p1.y);

    return {x:x, y:y}
}

// Inside polygon using even odd rule
function insidePoly(pointlist,pnt)
{
    var cnt=0;
    for(var i=0;i<pointlist.length;i++){
        var p1=pointlist[i];
        var p2=pointlist[(i+1)%pointlist.length];    
        if((pnt.y>=p1.y&&pnt.y<p2.y)||(pnt.y>=p2.y&&pnt.y<p1.y)){
            var dx=p2.x-p1.x;
            var dy=p2.y-p1.y;
            var k=dx/dy;
            var m=p1.x-(k*p1.y);
            if(((k*pnt.y)+m)<=pnt.x) cnt++
        }
    }        
    return cnt%2;
}

// Even odd rule
function inside(xk,yk,path)
{
    console.log(xk,yk);
    drawCross(xk,yk,8,3,"#5d3");

    // Collect segments with Y coordinate around coordinate
    var cnt=0;
    for(var segment of path){
        if(segment.y2>segment.y1&&yk<=segment.y2&&yk>=segment.y1){
            let dx=segment.x2-segment.x1;
            let dy=segment.y2-segment.y1;
            let k=dx/dy;
            let m=segment.x1-(k*segment.y1);
            if(xk>=(k*yk)+m) cnt++;
        }else if(segment.y2<segment.y1&&yk<=segment.y1&&yk>=segment.y2){
            let dx=segment.x1-segment.x2;
            let dy=segment.y1-segment.y2;
            let k=dx/dy;
            let m=segment.x2-(k*segment.y2);
            if(xk>=(k*yk)+m) cnt++;
        }
    }
    if(cnt%2==0) return false;
    return true;
}

//------------------------------------=======############==========----------------------------------------
//                                         Drawing Functions
//------------------------------------=======############==========----------------------------------------

function showRay(segment,color,linewidth)
{
    drawLine(segment.x1,segment.y1,segment.x2,segment.y2,linewidth,color);
}

function drawBox(x1,y1,w,h,opacity,fillcolor)
{
  c.fillStyle=fillcolor;
  c.globalAlpha=opacity;
  c.beginPath();
  c.fillRect(x1,y1,w,h);
  c.fill();  
  c.globalAlpha=1.0;
}

function drawLine(x1,y1,x2,y2,width,color,opacity)
{
    c.strokeStyle=color;
    if(opacity!=0) c.globalAlpha=opacity;
    c.lineWidth=width;

    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.stroke();

    c.lineWidth=1.0;
    c.globalAlpha=1.0;
}

function drawCirc(x1,y1,rad,width,color)
{
      c.strokeStyle=color;
      c.lineWidth=width;
      c.beginPath();
		  c.arc(x1, y1, rad, 0, 2 * Math.PI);
		  c.fill();
      c.lineWidth=1.0; 				
}

function drawCross(xk,yk,radius,thick,color)
{
    c.strokeStyle=color;
    c.lineWidth=thick;
    c.beginPath();
    c.moveTo(xk-radius,yk-radius);
    c.lineTo(xk+radius,yk+radius);
    c.moveTo(xk+radius,yk-radius);
    c.lineTo(xk-radius,yk+radius);
    c.stroke();
    c.lineWidth=1.0;
}

// Draw spatial grid
function drawGrid(gridcolor,gridopacity)
{
    c.globalAlpha=gridopacity;
    c.strokeStyle=gridcolor;
    c.beginPath();
    for(var x=0;x<gridMaxX;x+=gridSize){
        c.moveTo(x,0);
        c.lineTo(x,gridMaxY);
    }
    for(var y=0;y<gridMaxY;y+=gridSize){
        c.moveTo(0,y);
        c.lineTo(gridMaxX,y);
    }
    c.stroke();
    c.globalAlpha=1.0;
}

// Visualize a list of points that form a closed polygon
function drawPointList(pointlist,pointcolor,textcolor,textsize,opacity)
{
    c.textAlign="center";
    c.font = textsize+"px Arial Narrow";
    c.textBaseline="bottom";
    if(opacity<1.0){
        c.globalAlpha=opacity;
    }
    for(point of pointlist){
        c.fillStyle=pointcolor;
        c.beginPath();
        c.arc(point.x,point.y,5,0,Math.PI*2.0);
        c.fill();
        c.fillStyle=textcolor;        
        c.fillText("("+point.x+","+point.y+")", point.x,point.y-5.0);
    }
    c.globalAlpha=1.0;
}

// Draw the polygon outline with a certain color
function drawPolygon(pointlist,color,fillstate)
{
    c.beginPath();
    for(var i=0;i<=pointlist.length;i++){
        if(i==0){
            c.moveTo(pointlist[i].x,pointlist[i].y);
        }else{
            c.lineTo(pointlist[i%pointlist.length].x,pointlist[i%pointlist.length].y);        
        }
    }
    if(fillstate){
        c.fillStyle=color;
        c.fill();
    }else{
        c.strokeStyle=color;    
        c.stroke();
    }
}

// Linear hatching of a box
function drawHatchBox(x1,y1,x2,y2,ang,dist,opacity)
{
    // First two is line other two is ray, length of ray is not important
    // We proceed from x1,y1 until we pass x2,y2

    var poly=[{x:x1,y:y1},{x:x2,y:y1},{x:x2,y:y2},{x:x1,y:y2}];
    drawPolygon(poly,"#000",false);

    var cx=x1;
    var cy=y2;
    var dx=Math.sin(ang)*dist;
    var dy=Math.cos(ang)*dist;
    var cnt=0;
    while(true){
        if(cnt++>100) break;
        var hits=[];
        for(var i=0;i<poly.length;i++){
            var p1=poly[i];
            var p2=poly[(i+1)%poly.length];
            var r1={x:cx,y:cy};
            var r2={x:cx+dx,y:cy+dy};
            var hit=intersectRay(p1,p2,r1,r2);
            if(hit!=false) hits.push(hit);
        }
        if(hits.length>=2) drawLine(hits[0].x,hits[0].y,hits[1].x,hits[1].y,1.5,"#000",opacity);
        if(hits.length==0) break;
        cx+=dy;
        cy+=-dx;
    }

}

// Path is a list of segments not necessarily a polygon
function drawPath(path,linestyle)
{

    c.fillStyle='#000000';
    c.textAlign='center';
    c.textBaseline='middle';

    c.globalAlpha=1.0;

    for(segment of path){
        c.strokeStyle=linestyle;
        c.beginPath();
        c.moveTo(segment.x1,segment.y1);
        c.lineTo(segment.x2,segment.y2);
        c.stroke();

        cx=segment.x1+((segment.x2-segment.x1)*0.5);
        cy=segment.y1+((segment.y2-segment.y1)*0.5);

        c.strokeStyle="#fff";
        c.fillStyle="#000";
        c.lineWidth=3.0;
        c.beginPath();
		    c.arc(cx, cy, 10, 0, 2 * Math.PI);
		    c.fill();
        c.stroke();

        c.fillStyle="#fff";
        c.fillText(segment.id,cx,cy+1);

        c.lineWidth=1.0;      
    }

    c.textAlign='left';    
    for(segment of path){
        c.fillStyle="#64d";
        c.beginPath();
		    c.arc(segment.x1, segment.y1, 4, 0, 2 * Math.PI);
		    c.fill();
        c.stroke();

        c.fillStyle="#000";
        c.fillText("("+Math.round(segment.x1)+","+Math.round(segment.y1)+")",segment.x1+8,segment.y1+1);
        
    }
}
