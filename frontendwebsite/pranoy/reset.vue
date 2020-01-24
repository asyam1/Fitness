<template>
  	<div class="container-fluid page">
  		<div class="row rheight no-gutters vline">
  			<div class="col-lg-7 title">
  				<i class="fa fa-heartbeat fa-3x titleicon"></i>
  				Your Company
  			</div>
  			<div class="col-lg-5 register">
  				<div class="row no-gutters spacing">
  					<div style="text-align: center" class="col-lg-12 col-centered">
  						<i class="fa fa-user fa-5x userfa"></i>
  					</div>
  				</div>
				<form id="register-form" action="reset.vue" method="post" role="form" style="display: block;">
					<div class="row no-gutters aligninputbox vlineo">
						<div class="col-lg-12 col-centered spacing">
                            <div class="form-group">
                                <input type="text" class="form-control input-lg" id="pass" name="pass" :value="ps" placeholder="PASSWORD" required>
                            </div>
                        </div>
                        <div class="col-lg-12 col-centered spacing">
                            <div class="form-group">
                                <input type="text" class="form-control input-lg" id="cpass" name="cpass" :value="cps" placeholder="CONFIRM PASSWORD" required>
                            </div>
                        </div>
						<input type="hidden" id="id" name="id" value={{ id }}>
					</div>
  				<div class="row no-gutters">
  					<div class="col-lg-12 col-centered">
  						<div class="form-group">
  							<button type="submit" class="form-control btn btn-login">RESET</button>
  						</div>
  					</div>
  				</div>
  			</form>
			<div v-show="errors" class="col-lg">
				<ul>
					<li v-show="e1===true">Password must be less than 6 vharacters, have 1 capital letter, and 1 number</li>
					<li v-show="e2===true">Passwords do not match</li>
				</ul>
			</div>
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