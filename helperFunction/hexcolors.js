// Turn number to hex digit
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