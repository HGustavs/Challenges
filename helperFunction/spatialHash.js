var hashgrid=[];

// Keep track of how to expand spatial area if bucket is empty.
var hashoffs=[
    {x: 0,y: 0, offs: [        ]}, {x:-1,y: 0, offs: [11,22,16]}, {x: 1,y: 0, offs: [14,23,19]},    // 0,1,2
    {x:-1,y:-1, offs: [ 9,10,11]}, {x: 0,y:-1, offs: [16,15,12]}, {x: 1,y:-1, offs: [12,13,14]},    // 3,4,5
    {x:-1,y: 1, offs: [16,17,18]}, {x: 0,y: 1, offs: [18,24,20]}, {x: 1,y: 1, offs: [19,20,21]},    // 6,7,8
    {x:-2,y:-2, offs: [        ]}, {x:-1,y:-2, offs: [        ]}, {x:-2,y:-1, offs: [        ]},    // 9,10,11
    {x: 1,y:-2, offs: [        ]}, {x: 2,y:-2, offs: [        ]}, {x: 2,y:-1, offs: [        ]},    // 12,13,14
    {x: 0,y:-2, offs: [        ]}, {x:-2,y: 1, offs: [        ]}, {x:-2,y: 2, offs: [        ]},    // 15,16,17
    {x:-1,y: 2, offs: [        ]}, {x: 2,y: 1, offs: [        ]}, {x: 1,y: 2, offs: [        ]},    // 18,19,20
    {x: 2,y: 2, offs: [        ]}, {x:-2,y: 0, offs: [        ]}, {x: 2,y: 0, offs: [        ]},    // 21,22,23
    {x: 0,y: 2, offs: [        ]}                                                                   // 24
];

// Define parameters of hash grid array including stride array. 
function clearHash(gridSize,gridMaxX,gridMaxY)
{
    hashgrid=[];
    hashgrid.gridSize=gridSize;
    hashgrid.gridMaxX=gridMaxX;
    hashgrid.gridMaxY=gridMaxY;
    hashgrid.gridXStride=Math.ceil(gridMaxX/gridSize);  
}

// Store data in hash grid
function storeHash(x,y,content)
{
    if(x<0||x>=hashgrid.gridMaxX||y<0||y>=hashgrid.gridMaxY) return false;
    x=Math.floor(x/hashgrid.gridSize);
    y=Math.floor(y/hashgrid.gridSize);

    var index=(y*hashgrid.gridXStride)+x;
    if(hashgrid[index]==null){
        hashgrid[index]=[];
    }
    hashgrid[index].push(content);
}

// Fast Count of entries in hash grid 
// If we only want to process non-empty buckets
function countHash(bucketX,bucketY)
{
    if(bucketX<0||bucketY<0||bucketX>=hashgrid.gridXStride||bucketX>=hashgrid.gridXStride) return -1;

    var index=(bucketY*hashgrid.gridXStride)+bucketX;
    if(hashgrid[index]==null){
        return 0;
    }
    return hashgrid[index].length;
}

// Returns null if outside boundary or if no data was found
function readHash(bucketX,bucketY)
{
    if(bucketX<0||bucketY<0||bucketX>=hashgrid.gridXStride||bucketX>=hashgrid.gridXStride) return null;
    var index=(bucketY*hashgrid.gridXStride)+bucketX;
    if(hashgrid[index]==null){
        return null;
    }
    return hashgrid[index];
}

// Collatehash
function collateHash(bucketX,bucketY)
{
    // Keep track of found entries
    var found=[];
    var queue=[];

    // Process original 9 tiles then process any additional entries
    for(var i=0;i<9;i++){
        var cnt=countHash(bucketX+hashoffs[i].x,bucketY+hashoffs[i].y);
        if(cnt>0){
            var items=readHash(bucketX+hashoffs[i].x,bucketY+hashoffs[i].y)
            for(var item of items){
                found.push(item);
            }
        }else if(cnt==0){
            for(var no of hashoffs[i].offs){
                if(queue.indexOf(no)==-1) queue.push(no);
            }
        }
    }
    console.log(found,queue);
}


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
