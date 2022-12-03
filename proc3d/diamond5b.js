function generate(vertices,polygons)
{
    for(var v=0;v<6.28;v+=(6.28/5)){
      vertices.push([Math.sin(v)*80,-100,objp+(Math.cos(v)*80),1.0]);
    }      
    for(var v=0;v<6.28;v+=(6.28/5)){
      vertices.push([Math.sin(v+(6.28/10))*110,-80,objp+(Math.cos(v+(6.28/10))*110),1.0]);
    }
    for(var v=(6.28/10);v<(6.28+(6.28/10));v+=(6.28/5)){
      vertices.push([Math.sin(v+(6.28/10))*110,-80,objp+(Math.cos(v+(6.28/10))*110),1.0]);
    }

    for(var v=(6.28/20);v<(6.28+(6.28/20));v+=(6.28/10)){
      vertices.push([Math.sin(v+(6.28/10))*86,-40,objp+(Math.cos(v+(6.28/10))*86),1.0]);
    }

    vertices.push([0,70,0,1.0]);

    // Generate Pentagon
    polygons.push({faces:[[3,1,2],[3,4,1],[4,0,1]],edges:[[0,1,1],[1,0,0],[1,1,0]],poly:[0,1,2,3,4]});

    // Generate Quads
    for(var i=0;i<5;i++){
      polygons.push({faces:[[i+10,(i*2)+15,(i*2)+16],[(i*2)+16,(i*2)+15,25]],edges:[[1,0,1],[0,1,1]],poly:[i+10,(i*2)+15,(i*2)+16,25]});
      polygons.push({faces:[[(((i+1)%5)*2)+15,((i+1)%5)+5,(i*2)+16],[(((i+1)%5)*2)+15,(i*2)+16,25]],edges:[[1,1,0],[0,1,1]],poly:[(((i+1)%5)*2)+15,((i+1)%5)+5,(i*2)+16,25]}); 
    }
  
    // Generate triangles
    for(var i=0;i<5;i++){
      polygons.push({faces:[[(i+1)%5,i,i+5]],edges:[[1,1,1]]});
      polygons.push({faces:[[(i+1)%5,i+5,i+10]],edges:[[1,1,1]]});
      polygons.push({faces:[[(i+1)%5,i+10,((i+1)%5)+5]],edges:[[1,1,1]]});
      polygons.push({faces:[[i+10,i+5,13+((i+1)*2)]],edges:[[1,1,1]]});
      polygons.push({faces:[[((i+6)%5)+5,i+10,14+((i+1)*2)]],edges:[[1,1,1]]});
    }

}