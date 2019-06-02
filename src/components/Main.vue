<template>
    <div class="main-container">
        <header>
            <div class="header-nav">
                <ul class="nav-lef">
                    <li class="logo"></li>
                    <li class="flex-center"><a :style="{color: clickTab===0?'#4285f4':'#333'}" @click="()=>{this.clickTab=0;this.$router.push({name:'index'})}">首页</a></li>
                    <li class="flex-center"><a :style="{color: clickTab===1?'#4285f4':'#333'}" @click="()=>{this.clickTab=1;this.$router.push({name:'articles'})}">文章</a></li>
                    <li class="flex-center"><a :style="{color: clickTab===2?'#4285f4':'#333'}" @click="()=>{this.clickTab=2;this.$router.push({name:'follow'})}">关注</a></li>
                </ul>
                <ul class="nav-right">
                    <li class="flex-center write"><a @click="write">写文章</a></li>
                    <li class="flex-center search"><a href="#">搜索</a></li>
                    <li v-if="isLogin" class="flex-center person"><a @click="()=>{this.$router.push({name:'person'})}">信息</a></li>
                    <li v-else class="flex-center"><a @click="()=>{this.$router.push({name:'sign',query:{up:0}})}">登陆</a></li>
                    <li v-if="isLogin" class="flex-center"><a @click="exit">退出</a></li>
                    <li v-else class="flex-center"><a @click="()=>{this.$router.push({name:'sign',query:{up:1}})}">注册</a></li>
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
                userInfo :JSON.parse(localStorage.getItem('userInfo'))||{},
                clickTab:0,
                isLogin:false,
            }
        },
        methods:{
            write(){
                this.$router.push({name: this.isLogin?'editor':'sign'})
            },
            exit(){
                this.http.post('/user/exit', {}).then((data) => {
                    localStorage.setItem('isLogin', null);
                    localStorage.setItem('userInfo', null)
                    this.$router.push({name:'sign'})
                });
            }
        },
        created(){
            this.http.post('/user/checkLogin', {}).then((data) => {
                this.isLogin = !!data.data;
                localStorage.setItem('isLogin', this.isLogin+'')
            });
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
        user-select: none;
        cursor: pointer;
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
    .person>a{
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .person>a:before{
        content: '';
        margin-right:10px;
        display: inline-block;
        width: 15px;
        height: 60px;
        background: url(../static/img/person.png) no-repeat left center;
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
