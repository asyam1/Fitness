<template lang="html">
   <div class="container-fluid page">
      <div class="row no-gutters">
        <div class="col-lg-8 ititle">
          <div class="iticon">
            <i class="fa fa-heartbeat fa-1x iticon"></i>
            Your Company
          </div>
        </div>
        <div class="col-lg-4 trmenu">
            <div class="icon-bar">
            <a class="active" :href="profileLink" ><i class="fa fa-1x fa-user"></i></a> 
            <a href="#"><i class="fa fa-1x fa-cog"></i></a> 
            <a :href="his"><i class="fa fa-1x fa-info-circle"></i></a> 
            <a href="/logout"><i class="fa fa-1x fa-sign-out"></i></a>
          </div>
        </div>
      </div>
      <div class="row no-gutters">
        <div class="col-lg-1 sidebar">
            <li class="list"><a href="/home"><i class="fa fa-1x fa-home"></i></a></li>
            <li class="list"><a href="#"><i class="fa fa-1x fa-user"></i></a></li>
        </div>
        <div class="col-lg-6">
          <div class="lgbox">
            <div class="lgbox" :style="style0">
              <dis id="d1" :co=c><iframe width="100%" height="100%" resize="both" src="./acc.html"></iframe></dis>
            </div>
          </div>
        </div>
        <div class="col-lg-5">

          <div class="row no-gutters">
            <div class="col-lg-12">
              <div class="mdbox" :style="style1">
                  <dis id="d1" :co=c><iframe width="100%" height="100%" resize="both" src="./timer.html"></iframe></dis>
              </div>
            </div>
          </div>
          
          <div class="row no-gutters">
            <div class="col">
              <div class="smbox" :style="style1">
                  <dis id="d1" :co=c><iframe width="100%" height="100%" resize="both" src="./StepCounter.html"></iframe></dis>
              </div>
            </div>
          

            <div class="col">
                <div class="smbox" :style="style1">
                  <dis id="d1" :co=c><iframe width="100%" height="100%" resize="both" src="./Calories.html"></iframe></dis>
                </div>
            </div>
          </div>

          <div class="row no-gutters">
            <div class="col">
              <div class="smbox" :style="style1">     
                <dis id="d1" :co=c><iframe width="100%" height="100%" resize="both" src="./Temperature.html"></iframe></dis>
              </div>
            </div>
                  
            <div class="col">
              <div class="smbox" :style="style1">  
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default{
	data:function(){
		return{
			c:'#00ff00',
			style0:{
				margin: '0',
				padding: 0,
				position:'absolute'
			},
      style1:{
        position: 'relative'
      }
		}
	},
	methods:{
		change:function(i){
			document.getElementById(i).addEventListener('click',()=>{
				document.getElementById(i).style.color="#ff0000"
			},false)
			document.getElementById(i).addEventListener('mouseenter',()=>{
				document.getElementById(i).style.color="#ffff00"
			},false)
			document.getElementById(i).addEventListener('mouseleave',()=>{
				document.getElementById(i).style.color="#00ff00"
			},false)
		}
	},
	components:{
		'dis':{
			props:['co','inside'],
			template:"<div style='border-style:solid; display:inline-block; clear:both; width:100%; height:100%; top:0; position:absolute;' :style='{ color:co }'><slot></slot></div>",
		}
	},
	mounted(){
		this.change("d1")
	}
}
</script>