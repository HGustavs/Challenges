// General shader functions for colors between 0..1

// Saturate value between 0..1
function saturate(col)
{
    return Math.max(0,Math.min(1.0,col));
}

// Mod function for 0..X numbers
function mod(n,m)
{
  return ((n % m) + m) % m;
}

// https://github.com/gre/smoothstep/blob/master/index.js
function smoothstep (min, max, value) {
  var x = Math.max(0, Math.min(1.0, (value-min)/(max-min)));
  return x*x*(3 - 2*x);
};

// 256 Color functions

// HSV to RGB
// https://stackoverflow.com/questions/17242144/javascript-convert-hsb-hsv-color-to-rgb-accurately
// input: h in [0,360] and s,v in [0,1] - output: r,g,b in [0,1]
function hsv2rgb(h,s,v) 
{                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [f(5),f(3),f(1)];       
}   

// Lighting with Bias (Saturated/Clamped)
// color: 0..1 strength: 0..1 (saturated) bias:0..1
function light(color,strength,bias)
{
    return Math.max(0,Math.min(1.0,(color/((1.0+bias)-Math.min(1.0,strength)))));
}

// RGB Linear lighting returning hex
function linearColor(R,G,B)
{
    return "#"+
           numberToHex(Math.round(R*255))+
           numberToHex(Math.round(G*255))+
           numberToHex(Math.round(B*255));
}

// RGB Lighting with Bias returning hex
function lightColor(R,G,B,strength,bias)
{
    return "#"+
           numberToHex(light(R*255,strength,bias))+
           numberToHex(light(G*255,strength,bias))+
           numberToHex(light(B*255,strength,bias));
}

// Turn number to hex digit 255 levels
function numberToHex(num)
{
    if(num<16){
        return "0"+new Number(num).toString(16);        
    }else{
        return new Number(num).toString(16);    
    }
}

function hexToNumber(hex)
{
    hex=hex.toUpperCase(hex);
    if(hex.length>1){
        return hexToNumber[0]+(255*hexToNumber[1]);
    }else{
        if(hex=="F") return 15;
        if(hex=="E") return 14;
        if(hex=="D") return 13;
        if(hex=="C") return 12;
        if(hex=="B") return 11;
        if(hex=="A") return 10;
        return parseInt(hex);
    }
}

// Invert hexadecimal color e.g. 000000 or 000 to ffffff or fff
function invertCol(color)
{
    // Long format or short format hex
    var index=0
    if(color[0]=="#"){
        index=1;
    }
    if(color.length<6){
        var r=numberToHex(15-hexToNumber(color[index]));
        var g=numberToHex(15-hexToNumber(color[index+1]));
        var b=numberToHex(15-hexToNumber(color[index+2]));
    }else{

    }
    return "#"+r+g+b;
}

// Random color to hex
function randomColor()
{
    return "#"+numberToHex(Math.floor(Math.random()*255))+numberToHex(Math.floor(Math.random()*255))+numberToHex(Math.floor(Math.random()*255));
}