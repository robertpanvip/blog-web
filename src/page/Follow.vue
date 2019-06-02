<template>
    <div class='follow-page'>
        <div class="fp-left">
            <h2>关注列表</h2>
            <div class="left-item" :style="{backgroundColor:clicked_follow===follow.follow_user_id?'#ccc':''}" @click="chooseWriter(follow.follow_user_id)" v-for="follow in follows">
                <img v-if="follow.head_url" :src="follow.head_url" class="item-img"/>
                <img v-else src="./../static/img/noavatar_middle.gif" class="item-img"/>
                <span>{{follow.name}}</span>
                <span style="cursor:pointer" @click="cancelFollow(follow.id)">取消关注</span>
            </div>
        </div>
        <div class="fp-right">
            <ArticleItem v-for=" article in follow_articles "  :data="article"/>
        </div>
    </div>
</template>

<script>
    import ArticleItem from './../components/ArticleItem';
    export default {
        name: "follow",
        components:{
            ArticleItem,
        },

        data() {
            return {
                follows:[],
                follow_articles:[],
                clicked_follow:'',
                follow_articles_copy:[],
                userInfo :JSON.parse(localStorage.getItem('userInfo')),
            }
        },

        methods: {
            cancelFollow(id){
                this.http.get('/action/cancelFollow', {id:id}).then((data) => {
                    if(data.code!=200){
                        this.$notify({title: '提示', message: this.$createElement('i', {style: 'color: '+data.code===200?'blue':'red'}, data.msg)});
                    }else{
                        this.$notify({title: '提示', message: this.$createElement('i', {style: 'color: '+data.code===200?'blue':'red'}, '操作成功')});
                        this.getData()
                    }
                });

            },
            chooseWriter(follow_user_id){
                this.clicked_follow=follow_user_id;
                this.follow_articles=this.follow_articles_copy.filter(item=>item.user_id=follow_user_id)

            },
            getData(){
                this.http.get('/action/follows', {user_id:this.userInfo.id}).then((data) => {
                    if(data.data&&data.data.length!==0){
                        this.follows=data.data;
                    }
                    if(data.code!=200){
                        this.$notify({title: '提示', message: this.$createElement('i', {style: 'color: '+data.code===200?'blue':'red'}, data.msg)});
                    }
                });
                this.http.get('/article/listAllFollow', {user_id:this.userInfo.id}).then((data) => {
                    if(data.data&&data.data.length!==0){
                        this.follow_articles=data.data;
                        this.follow_articles_copy=data.data;
                    }
                    if(data.code!=200){
                        this.$notify({title: '提示', message: this.$createElement('i', {style: 'color: '+data.code===200?'blue':'red'}, data.msg)});
                    }
                });
            }
        },

        filters: {

        },
        mounted(){
            this.getData()
        },

        created() {

        },

    }
</script>

<style scoped>
    .follow-page {
        width: 100%;
        height: calc(100% - 60px);
        padding: 10px;
        box-sizing: border-box;
        background-color: #c0c7d1;
        display: flex;
    }

    .fp-left {
        width: 300px;
        height: 100%;
        border-radius: 5px;
        background-color: #f7f7f8;;
        box-sizing: border-box;
        padding: 0 10px;
        overflow: auto;
    }

    .fp-right {
        width: calc(100% - 280px);
        margin-left: 10px;
        height: 100%;
        border-radius: 5px;
        background-color: #f7f7f8;;
        overflow: auto;
        padding: 10px;
        box-sizing: border-box;
    }
    .item-img{
        width: 50px;
        border-radius: 50%;
    }

    .left-item {
        box-sizing: border-box;
        border-bottom: 1px solid #cccccc;
        width: 100%;
        vertical-align: center;
        line-height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        font-size: 16px;
        user-select: none;
    }
    .left-item:nth-of-type(1){
        border-top: 1px solid #cccccc;
    }
</style>