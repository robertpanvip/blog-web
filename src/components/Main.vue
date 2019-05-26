<template>
    <div class="main-container">
        <header>
            <div class="header-nav">
                <ul class="nav-lef">
                    <li class="logo"></li>
                    <li class="flex-center"><a @click="()=>{this.$router.push({name:'content'})}">首页</a></li>
                    <li class="flex-center"><a href="#">文章</a></li>
                    <li class="flex-center"><a href="#">关注</a></li>
                </ul>
                <ul class="nav-right">
                    <li class="flex-center write"><a @click="write">写文章</a></li>
                    <li class="flex-center search"><a href="#">搜索</a></li>
                    <li class="flex-center"><a @click="()=>{this.$router.push({name:'sign',query:{up:0}})}">登陆</a></li>
                    <li class="flex-center"><a @click="()=>{this.$router.push({name:'sign',query:{up:1}})}">注册</a></li>
                </ul>
            </div>
        </header>
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'main-index',
        props: {
            msg: String
        },
        data(){
            return{

            }
        },
        methods:{
            write(){
                this.http.post('/user/checkLogin', {}).then((data) => {
                    if(data.data){
                        this.$router.push({name:'editor'})
                    }else{
                        this.$router.push({name:'sign'})
                    }
                });
            }
        }
    }
</script>
<style scoped>
    .main-container {
        width: 100%;
        height: 100%;
    }
    .flex-center{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header-nav{
        background: #FFF;
        border-bottom: 1px solid #DDD;
        height: 60px;
        position: relative;
        z-index: 21;
        min-width: 1000px;
        overflow: hidden;
        display: flex;
        justify-content: space-between;
    }
    header {
        width: 100%;
        overflow: auto;
    }

    .logo {
        width: 150px;
        height: 60px;
    }

    .nav-lef {
        display:flex;
        margin-left: 20px;
    }
    .nav-lef>li{
        text-align: center;
        font-size: 16px;
        height: 100%;
        line-height: 100%;
        margin-left: 32px;
    }
    .nav-right {
        display:flex;
        margin-right: 20px;
    }
    .nav-right>li{
        text-align: center;
        font-size: 16px;
        height: 100%;
        line-height: 100%;
        margin-left: 32px;
    }
    .write>a{
        margin-left: 15px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .write>a:before{
        content: '';
        margin-right:5px;
        display: inline-block;
        width: 15px;
        height: 60px;
        background: url(../static/img/32.png) no-repeat left center;
    }
    .search>a{
        margin-left: 15px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search>a:before{
        content: '';
        margin-right:5px;
        display: inline-block;
        width: 15px;
        height: 60px;
        background: url(../static/img/33.png) no-repeat left center;
    }

</style>
