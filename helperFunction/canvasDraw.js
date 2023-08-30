//------------------------------------=======############==========----------------------------------------
//                                   Math Functions for Line Geometry
//------------------------------------=======############==========----------------------------------------

// line intercect math by Paul Bourke http://paulbourke.net/geometry/pointlineplane/
// Determine the intersection point of two line segments
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

function drawLine(x1,y1,x2,y2,width,color)
{
    c.strokeStyle=color;
    c.globalAlpha=1.0;
    c.lineWidth=width;

    c.beginPath();
    c.moveTo(x1,y1);
    c.lineTo(x2,y2);
    c.stroke();

    c.lineWidth=1.0;
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

function drawGrid()
{
    // Draw spatial hash grid
    c.globalAlpha=0.5;
    c.strokeStyle="#080";
    c.beginPath();
    for(var i=0;i<cheight;i+=gridsize){
            c.moveTo(0,i);
            c.lineTo(cwidth,i);
    }
    for(var i=0;i<cwidth;i+=gridsize){
            c.moveTo(i,0);
            c.lineTo(i,cheight);
    }
    c.stroke();
}

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
