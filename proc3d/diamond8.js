function generate(vertices,polygons)
{
    // Generate first set of vertices
    for(var v=0;v<6.28;v+=(6.28/8)){
        vertices.push([Math.sin(v)*80,-80,objp+(Math.cos(v)*80),1.0]);
    }
    for(var v=(6.28/16);v<6.28+((6.28/16));v+=(6.28/8)){
        vertices.push([Math.sin(v)*120,-70,objp+(Math.cos(v)*120),1.0]);
    }
    for(var v=0;v<6.28;v+=(6.28/16)){
        vertices.push([Math.sin(v)*150,-30,objp+(Math.cos(v)*150),1.0]);
    }
    for(var v=(6.28/16);v<6.28+(6.28/16);v+=(6.28/8)){
        vertices.push([Math.sin(v)*100,20,objp+(Math.cos(v)*100),1.0]);
    }
    vertices.push([0,100,0,1.0]);    

    // Generate Octagons
    // polygons.push({edges:[0,1,2,3,4,5,6,7]});

    // Generate Triangles
    for(var i=0;i<8;i++){
        polygons.push({edges:[(i+1)%8,i,i+8],faces:[[(i+1)%8,i,i+8]]});
    }
    for(var i=0;i<16;i++){
        polygons.push({edges:[i+16,((i+17)%16)+16,Math.floor((i+16)/2)],faces:[[i+16,((i+17)%16)+16,Math.floor((i+16)/2)]]});
        polygons.push({edges:[16+((i+1)%16),i+16,32+Math.floor((i/2))],faces:[[16+((i+1)%16),i+16,32+Math.floor((i/2))]]});
    }

    // Generate Quads
    for(var i=0;i<8;i++){
        polygons.push({edges:[(i+8),16+(((i+1)*2)%16),8+((i+1)%8),(i+1)%8],faces:[[(i+8),16+(((i+1)*2)%16),8+((i+1)%8)],[(i+1)%8,(i+8),8+((i+1)%8)]]});       
        polygons.push({edges:[i+32,40,32+((i+1)%8),16+(((i+1)*2)%16)],faces:[[i+32,32+((i+1)%8),16+(((i+1)*2)%16)],[i+32,40,32+((i+1)%8)]]});
    }
}