<template>
    <div class='index-page'>
        <div class="index-page-main">
            <div class="left" >
                <ArticleItem  @item-click="articleItemClick" v-for=" (articles,index) in articles" :data="articles" :index="index" :selected="true"/>
            </div>
            <div class="right">
                <div class="write"><a class="want-write" @click="write">快去写文章</a><span class="want-write-location">记录自己的技术轨迹</span></div>
                <div class="selected-writer">
                    <div class="title">
                        <h3>推荐作者</h3>
                        <h4>更多</h4>
                    </div>
                    <Writer v-for="writer in writers" :data="writer" @refresh="getWriterData"/>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ArticleItem from './ArticleItem';
    import Writer from './WriterItem'
    export default {
        name: "index",
        components:{
            ArticleItem,Writer,
        },

        data() {
            return {
                articles:[],
                writers:[],
                isLogin:JSON.parse(localStorage.getItem('isLogin')),
                userInfo :JSON.parse(localStorage.getItem('userInfo'))||{},
                content:{
                    data:null,
                    hidden:true,
                }
            }
        },

        methods: {
            write(){
                this.$router.push({name: this.isLogin?'editor':'sign'})
            },
            articleItemClick(data){
               console.log(data)
                this.$router.push({name:'article',query:{article_id:data.id}})
            },
            getWriterData(){
                this.http.get('/user/allPerson', {user_id:this.userInfo.id}).then((data) => {
                    if(data.data&&data.data.length!==0){
                        this.writers=data.data;
                    }
                    if(data.code!=200){
                        this.$notify({title: '提示', message: this.$createElement('i', {style: 'color: '+data.code===200?'blue':'red'}, data.msg)});
                    }
                });
            },
            getListData(){
                this.http.get('/article/listAll', {}).then((data) => {
                    if(data.data&&data.data.length!==0){
                        this.articles=data.data;
                    }
                    if(data.code!=200){
                        this.$notify({title: '提示', message: this.$createElement('i', {style: 'color: '+data.code===200?'blue':'red'}, data.msg)});
                    }
                });
            }

        },

        filters: {},

        mounted(){
           this.getListData()
            this.getWriterData()
        },

        created() {

        },

    }
</script>

<style scoped>
    .index-page{
        width: 100%;
        height: calc(100% - 60px);
        overflow: scroll;
    }
    .index-page-main{
        width: 1200px;
        min-height: 100%;
        margin: 0 auto;
        display: flex;
        background-color: #f7f7f8;
    }

    .left {
        margin:  2% 0 2% 2%;
        width: 70%;
        height: 100%;
    }

    .right {
        margin: 2%;
        width: 30%;
        height: 100%;
    }

    .write {
        margin-bottom: 20px;
        height: 20px;
        padding: 12px 25px;
        position: relative;
        background: #FFF;
        border: 1px solid #EEE;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 16px;
    }
    .want-write:before{
        display: block;
        content: '';
        width: 33px;
        height: 22px;
        background: url(../static/img/32s.png) no-repeat 5px center
    }
    .want-write {
        display: flex;

        padding-right: 10px;
        margin-right: 10px;
    }

    .want-write-location {
        border-left: 1px solid #999;
        padding-left: 10px;
        font-size: 12px;
        color: #999;
    }

    .selected-writer {
        width: 100%;
        height: 500px;
    }
    .selected-writer>.title{
        display: flex;
        justify-content: space-between;
        align-items: center;;
        margin-bottom: 10px;
    }
    .selected-writer>.title>h3{
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .selected-writer>.title>h3:before{
        content: '';
        display: inline-block;
        width: 5px;
        margin-right: 5px;
        height: 1.17em;
        background: #4285f4;
    }


</style>