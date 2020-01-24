<template>
  	<div class="container-fluid page">
  		<div class="row rheight no-gutters vline">
  			<div class="col-lg-7 title">
  				<i class="fa fa-heartbeat fa-3x titleicon"></i>
  				Your Company
  			</div>
  			<div class="col-lg-5 login">
  				<div class="row no-gutters spacing">
  					<div style="text-align: center" class="col-lg-12 col-centered">
  						<i class="fa fa-user fa-5x userfa"></i>
  					</div>
  				</div>
				<form id="register-form" action="forgotPassword.vue" method="post" role="form" style="display: block;">
					<div class="row no-gutters aligninputbox vlineo">
						<div class="col-lg-12 col-centered ">
              				<div class="form-group spacingfrgtpwd">
                				<input type="text" class="form-control input-lg" id="email" name="email" :value="em" placeholder="EMAIL" required>
              				</div>
            			</div>
					</div>
  					
					<div class="row no-gutters">
  						<div class="col-lg-12 col-centered">
  							<div class="form-group">
  								<button type="submit" class="form-control btn btn-login">Send Email</button>
  							</div>
  						</div>
  					</div>
  				</form>
				<h1 v-if="sent===true">Email sent</h1>
				<h1 v-else-if="sent===false">Email not found</h1>
				<h1 v-else></h1>
  			</div>
  		</div>
  	</div>  
</template>

<script>
export default {
    data: function() {
        return {
        }
    }
}
</script>