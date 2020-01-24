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
                <a class="active" :href="profileLink">
                    <i class="fa fa-1x fa-user"></i>
                </a>
                <a href="/history">
                    <i class="fa fa-1x fa-info-circle"></i>
                </a>
                <a href="/logout">
                    <i class="fa fa-1x fa-sign-out"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="row no-gutters">
        <div class="col-lg-1 sidebar">
            <li class="list">
                <a href="/home">
                    <i class="fa fa-1x fa-home"></i>
                </a>
            </li>
            <li class="list">
                <a href="#">
                    <i class="fa fa-1x fa-user"></i>
                </a>
            </li>
        </div>
        <div class="col-lg-11">
            <div class="row no-gutters avatarRow">
                <img class="avatar" src="./pranoy/img_avatar.png" alt="Avatar">
            </div>
            <div class="row no-gutters">
                <div class="col-lg-4">
                    <div class="row no-gutters info titlesUinfo">
                        First Name:  <p class="valuesUinfo">{{ firstName }}</p>
                    </div>
                    <div class="row no-gutters info titlesUinfo">
                        Last Name:  <p class="valuesUinfo">{{ lastName }}</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row no-gutters info titlesUinfo">
                        Username:  <p class="valuesUinfo">{{ username }}</p>
                    </div>
                    <div class="row no-gutters info titlesUinfo">
                        Password:  <p class="valuesUinfo">{{ password }}</p>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="row no-gutters info titlesUinfo">
                        Email:  <p class="valuesUinfo">{{ email }}</p>
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
        return{}
    }
}
</script>