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
				<form id="register-form" action="register.vue" method="post" role="form" style="display: block;">
					<div class="row no-gutters aligninputbox vlineo">
						<div class="col-lg-6 col-centered spacing">
							<div class="form-group">
								<input type="text" class="form-control input-lg" id="fname" name="fname" :value="fn" placeholder="FIRST NAME" required>
							</div>
						</div>
						<div class="col-lg-6 col-centered spacing">
  						<div class="form-group">
  							<input type="text" class="form-control input-lg" id="lname" name="lname" :value="ln" placeholder="LAST NAME" required>
  						</div>
  					</div>
					</div>
          <div class="row no-gutters aligninputbox vlineo">
            <div class="col-lg-6 col-centered spacing">
              <div class="form-group">
                <input type="text" class="form-control input-lg" id="user" name="user" :value="usern" placeholder="USERNAME" required>
              </div>
            </div>
            <div class="col-lg-6 col-centered spacing">
              <div class="form-group">
                <input type="text" class="form-control input-lg" id="email" name="email" :value="em" placeholder="EMAIL" required>
              </div>
            </div>
          </div>
          <div class="row no-gutters aligninputbox vlineo">
            <div class="col-lg-6 col-centered spacing">
              <div class="form-group">
                <input type="password" class="form-control input-lg" id="pass" name="pass" :value="passw" placeholder="PASSWORD" required>
              </div>
            </div>
            <div class="col-lg-6 col-centered spacing">
              <div class="form-group">
                <input type="password" class="form-control input-lg" id="cpass" name="cpass" :value="cpassw" placeholder="CONFIRM PASSWORD" required>
              </div>
            </div>
          </div>
					<div class="row no-gutters aligninputbox vlineo">
            <div class="col-lg-12 col-centered spacing">
              <div class="form-group">
                <select  class="form-control input-lg" id="role" name="role" placeholder='Select Role' required>
									<option value='fitness'>Fitness</option>
									<option value='tracking'>Tracking</option>
								</select>
              </div>
            </div>
          </div>
  				<div class="row no-gutters">
  					<div class="col-lg-12 col-centered">
  						<div class="form-group">
  							<button type="submit" class="form-control btn btn-login">REGISTER</button>
  						</div>
  					</div>
  				</div>
  			</form>
				<div v-show="errors" class="col-lg">
					<ul class="pwdError">
						<li v-show="e1===true">Password must not be less than 6 characters, have 1 capital letter, and 1 number</li>
						<li v-show="e2===true">Passwords do not match</li>
						<li v-show="e3===true">Invalid email</li>
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