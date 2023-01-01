function visualizeHit(cxk,cyk,segment)
{
  if(cxk<0||cyk<0||cxk>=gridx||cyk>=gridy) return false;

  var index=(cyk*gridx)+cxk;
  if(hash[index]==null){
      hash[index]=[];
  }
  pushIfNotPresent(hash[index],segment);
}

function readHit(cxk,cyk,segment)
{
  if(cxk<0||cyk<0||cxk>=gridx||cyk>=gridy) return false;
  
  var index=(cyk*gridx)+cxk;
  if(hash[index]!=null){
      for(segment of hash[index]){
          pushIfNotPresent(found,segment);
      }
  }
  if(showHits) drawBox(cxk*gridsize,cyk*gridsize,gridsize,gridsize,0.1,"#46f");
}

// Ray / Segment Spatial Hashing Bresenham Algorithm
// Itemcall function is called for each 'pixel' and is passed X and Y coordinate
function hashLine(x1,y1,x2,y2,segment,itemcall)
{
    // drawLine(x1,y1,x2,y2,2.0,"#c42");

    var dx=x2-x1;
    var dy=y2-y1;

    if(Math.abs(dx)>=Math.abs(dy)){
        var k=dy/dx;
        var m=y1-(k*x1);

        // Take care of left running lines
        if(x2<x1){
          tmp=x1;
          x1=x2;
          x2=tmp;
        }

        var cnt=Math.ceil(x2/gridsize)-Math.floor(x1/gridsize)+1;
        var xk=Math.floor(x1/gridsize);
        var oldyt=Math.floor(((k*xk*gridsize)+m)/gridsize);
        var ret=0;        
        for(var i=0;i<cnt;i++){
            yk=(k*(xk*gridsize)+m);
            yt=Math.floor(yk/gridsize);
            if(oldyt==yt){
                itemcall(xk,yt,segment);
            }else{
                itemcall(xk,yt,segment);
                itemcall(xk-1,yt,segment);
            }
            oldyt=yt;
            xk++;
        }
    }else{
        var k=dx/dy;
        var m=x1-(k*y1);

        // Take care of left running lines
        if(y2<y1){
          tmp=y1;
          y1=y2;
          y2=tmp;
        }

        var cnt=Math.ceil(y2/gridsize)-Math.floor(y1/gridsize)+1;
        var yk=Math.floor(y1/gridsize);
        var oldxt=Math.floor(((k*yk*gridsize)+m)/gridsize);
        var ret=0;
        for(var i=0;i<cnt;i++){
            xk=(k*(yk*gridsize)+m);
            xt=Math.floor(xk/gridsize);
            if(oldxt==xt){
                itemcall(xt,yk,segment);
            }else{
                itemcall(xt,yk,segment);
                itemcall(xt,yk-1,segment);
            }
            if(ret>0) break;
            oldxt=xt;
            yk++;
        }        
    }
}

// -------------------==============########==============-------------------
// Update of Spatial Hash - Find Which Segments that Intersect with Spatial Hash Cells
// We must make sure that we do not add same value to list again (to avoid double tests).
// Sparse Array?

function pushIfNotPresent(list,item)
{
    for(inner of list){
        if(inner.id==item.id) return false;
    }
    list.push(item);
}
