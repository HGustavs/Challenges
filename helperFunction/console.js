 		// -------------------------------------------------------------------------------------------------------
		// --------------------=============######## Console Output Library ########=============--------------------
		// -------------------------------------------------------------------------------------------------------
		//  Copyright HGustavs 
		//
		//        (\ /)
		//        (. .)           
		//       c(")(")        ∴ 
		//--------------------------------------------------------------------------------------------------------

    // Blinking Cursor - character buffer support
    // Timer auto creation

		//------------==========########### Class ###########==========------------
		 
 class Conio {
  
  height = 4;
  width = 40;
  cursX = 0;
  cursY = 0;
  element = "console";
  blink = 0;
  timerref = this;

  buffer = [];

	//--------------------------------------------------------------------------
	// log
	// ---------------
	//  Write one row to console log - scrolling is automatic
	//--------------------------------------------------------------------------

  log(message)
  {
      this.buffer[this.cursY]=message;
      this.cursY++;      
      if(this.cursY>(this.height-1)){
          // Scroll One Line
          this.cursY=this.height-1;
          for(var i=0;i<this.height-1;i++) this.buffer[i]=this.buffer[i+1];
      }
      this.update();
  }

  //--------------------------------------------------------------------------
	// update
	// ---------------
	//  Update console element
	//--------------------------------------------------------------------------

  update()
  {
      // Write Output
      var str="";
      for(var i=0;i<this.height;i++){
          let characters = this.buffer[i].split('');
          for(var j=0;j<this.width;j++){
              if(i==this.cursY&&j==this.cursX&&this.blink==1){
                  str+="°";
              }else if(j<characters.length){
                  str+=characters[j];
              }else{
                  str+=" ";
              }
          }
          str+="\n";
      }
      document.getElementById(this.element).innerHTML=str;  
  }

  //--------------------------------------------------------------------------
	// refreshblink
	// ---------------
	//  Update blink
	//--------------------------------------------------------------------------

  refreshblink()
  {
      if(this.blink==0){
          this.blink=1;
      }else{
          this.blink=0;
      }
      this.update();

      setTimeout(function(){this.refreshblink()}.bind(this) ,1000);
  }

  constructor(width, height,elementid){
      for(var i=0;i<height;i++){
          this.buffer[i]="";
      }
      this.width=width;
      this.height=height;
      this.element=elementid;

      this.refreshblink();
  }

}
