function generate(vertices,polygons)
{
    for(var v=0;v<6.28;v+=(6.28/5)){
      vertices.push([Math.sin(v)*80,-100,objp+(Math.cos(v)*80),1.0]);
    }      
    for(var v=0;v<6.28;v+=(6.28/5)){
      vertices.push([Math.sin(v+(6.28/10))*110,-80,objp+(Math.cos(v+(6.28/10))*110),1.0]);
    }      
    for(var v=0;v<6.28;v+=(6.28/10)){
      vertices.push([Math.sin(v+(6.28/20))*140,-60,objp+(Math.cos(v+(6.28/20))*140),1.0]);
    }   
    for(var v=0;v<6.28;v+=(6.28/10)){
      vertices.push([Math.sin(v+(6.28/10))*100,0,objp+(Math.cos(v+(6.28/10))*100),1.0]);
    }
    vertices.push([0,90,0,1.0]);

    // Generate Pentagon
    polygons.push({edges:[0,1,2,3,4],faces:[[3,1,2],[3,4,1],[4,0,1]]});

    for(var i=0;i<5;i++){
      polygons.push({edges:[(i+1)%5,i,i+5],faces:[[(i+1)%5,i,i+5]]});
      polygons.push({edges:[i+5,i,10+(i*2)],faces:[[i+5,i,10+(i*2)]]});
      polygons.push({edges:[(i+1)%5,i+5,11+(i*2)],faces:[[(i+1)%5,i+5,11+(i*2)]]});
      polygons.push({edges:[(i*2)+10,(i*2)+11,i+5],faces:[[(i*2)+10,(i*2)+11,i+5]]});
      polygons.push({edges:[(i*2)+11,10+(((i*2)+2)%10),(i+1)%5],faces:[[(i*2)+11,10+(((i*2)+2)%10),(i+1)%5]]});
    }

    for(var i=0;i<10;i++){
      polygons.push({edges:[((i+1)%10)+10,i+10,i+20],faces:[[((i+1)%10)+10,i+10,i+20]]});
    }

    for(var i=0;i<10;i++){
      polygons.push({edges:[((i+1)%10)+20,((i+1)%10)+10,i+20,30],faces:[[((i+1)%10)+20,((i+1)%10)+10,i+20],[((i+1)%10)+20,i+20,30]]});
    }

}