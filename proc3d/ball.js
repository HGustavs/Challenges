function generate(vertices,polygons)
{

    vertices.push([0,0,-160,1.0]);
    var zp=-160;
    for(var m=(3.14)/10;m<3.14;m+=(3.14/10)){
        zp+=40;
        var radius=Math.sin(Math.acos(Math.abs(zp)/160))*160;
        for(var v=0;v<6.28;v+=(6.28/16)){
          vertices.push([Math.sin(v)*radius,Math.cos(v)*radius,zp,1.0]);
        }        
    }

    // Triangles
    for(var i=0;i<16;i++){
      polygons.push({faces:[[((i+1)%16)+1,0,i+1]],edges:[[0,0,0]],poly:[]});
    }
    
    // Quad
    for(var i=0;i<16;i++){
      polygons.push({faces:[[((i+1)%16)+1,i+1,i+17],[((i+1)%16)+1,i+17,((i+1)%16)+17]],edges:[[0,0,0],[0,0,0]],poly:[]});
      polygons.push({faces:[[((i+1)%16)+17,((i+1))+16,i+33],[i+33,((i+1)%16)+33,((i+1)%16)+17]],edges:[[0,0,0],[0,0,0]],poly:[]});
      polygons.push({faces:[[((i+1)%16)+33,((i+1))+32,i+49],[i+49,((i+1)%16)+49,((i+1)%16)+33]],edges:[[0,0,0],[0,0,0]],poly:[]});
      polygons.push({faces:[[((i+1)%16)+49,((i+1))+48,i+65],[i+65,((i+1)%16)+65,((i+1)%16)+49]],edges:[[0,0,0],[0,0,0]],poly:[]});
      polygons.push({faces:[[((i+1)%16)+65,((i+1))+64,i+81],[i+81,((i+1)%16)+81,((i+1)%16)+65]],edges:[[0,0,0],[0,0,0]],poly:[]});
      
      // console.log(i+33,((i+1)%16)+33,((i+1)%16)+17);
    }

}