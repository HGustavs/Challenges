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
