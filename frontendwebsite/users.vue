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
            <a :href="profileLink" ><i class="fa fa-1x fa-user"></i></a> 
            <a class="active" :href="act"><i class="fa fa-1x fa-cog"></i></a> 
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

      <div class="col">
        <div class="mdbox">
            <form :action="act" method="post">
              <label for="del">Delete User</label>
              <select class="form-control input-lg" name="delus" id="del" placeholder="Select User">
                <option v-for="u in us" :value="u._id">{{ u.fname }} {{ u.lname }}</option>
              </select>
              <button type="submit" value="submit">Delete</button>
            </form>
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
	}
}
</script>