<template>
    <div class='article-content-page'>
        <div class='article-content-main'>
            <p class="title">{{article.title}}</p>
            <div class="content" v-cloak v-html="article.content">
            </div>
            <div>
                <span class="meta">路由</span>
                <span class="meta">网关</span>
                <div class="action-btn-group">
                    <span v-if="!liked" class="action-dian-zan action-press" @click="dian_zan">
                        <img src="./../static/img/like_press.svg"/>
                        点赞{{actionInfo.dianZan.length}}
                    </span>
                    <span v-else class="action-dian-zan" @click="dian_zan">
                          <img src="./../static/img/like.svg"/>
                        点赞{{actionInfo.dianZan.length}}
                    </span>
                    <div>
                        <span v-if="!stared" class="action-sou-chang action-press" @click="collection">
                               <img src="./../static/img/star_press.svg"/>
                            收藏{{actionInfo.collection.length}}
                        </span>
                        <span v-else class="action-sou-chang" @click="collection">
                            <img src="./../static/img/star.svg"/>
                            收藏{{actionInfo.collection.length}}
                        </span>
                        <span class="action-share"><img src="./../static/img/share_press.svg"/>分享</span>
                    </div>
                </div>
            </div>
            <div class="writer">
                <img v-if="article.head_url" class="writer-head-img" :src="article.head_url">
                <img v-else class="writer-head-img" src="../static/img/head.jpg">
                <div class="writer-info">
                    <span class="writer-name">{{article.name}}</span><span class="follow" :class="!followed? 'action-press':''" @click="follow">关注</span><br/>
                    <span class="writer-name-bellow">{{actionInfo.userArticle.length}}篇文章，{{actionInfo.userArticle.flow}}人气，{{actionInfo.follow.length}}粉丝</span>
                </div>
            </div>
            <h2 class="comment-title">评论({{actionInfo.comments.length}})</h2>
            <div class="comment">
                <img v-if="info.head_url" class="head"  :src="info.head_url">
                <img v-else class="head" src="../static/img/head.jpg">
                <div class="text-area-main">
                    <textarea v-model="commentContent" placeholder="评论或者提问" @keyup.enter="keyDown"></textarea>
                    <div class="comment-publish">
                        <span>Ctrl+Enter 发布</span>
                        <div class="comment-publish-btn">
                            <div class="comment-publish-btn-cancel">取消</div>
                            <div class="comment-publish-btn-publish" @click="commentPublish">发布</div>
                        </div>
                    </div>
                </div>
            </div>
            <ul class="comment-list">
                <li v-for="item in actionInfo.comments.detail">
                    <img v-if="item.head_url" class="head" :src="item.head_url">
                    <img v-else class="head" src="../static/img/head.jpg">
                    <div class="content-body">
                        <span class="commenter">{{item.name}}</span>
                        <span>{{moment(item.time)}}</span>
                        <span v-if="info.id==article.user_id" @click="deleteComment(item.id)" class="delete">删除</span>
                        <div>{{item.content}}</div>
                        <div class="commenter-action">
                            <span class="dian-zan">点赞</span>
                            <span class="hui-fu">回复</span>
                        </div>
                    </div>

                </li>

            </ul>

        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "article-content",
        data() {
            return {
                id: this.$route.query.article_id,
                info :JSON.parse(localStorage.getItem('userInfo'))||{},
                article: {},
                actionInfo: {
                    userArticle: {},
                    collection: {},
                    comments: {},
                    dianZan: {},
                    follow: {}
                },
                commentContent: ''
            }
        },
        computed: {
            liked() {
                return this.actionInfo.dianZan.detail && this.actionInfo.dianZan.detail.find(item => item.user_id == this.info.id)
            },
            stared() {
                return this.actionInfo.collection.detail && this.actionInfo.collection.detail.find(item => item.user_id == this.info.id)
            },
            followed() {
                return this.actionInfo.follow.detail && this.actionInfo.follow.detail.find(item =>item.user_id == this.info.id)
            },
        },

        methods: {
            moment(date) {
                return moment(date).format('YYYY-MM-DD HH:MM:SS')
            },
            getData() {
                this.http.get('/article/getById', {id: this.id}).then((data) => {
                    if (data.data) {
                        const {userArticle, collection, comments, dianZan, follow} = data.data;
                        this.actionInfo = {userArticle, collection, comments, dianZan, follow};
                        this.article = data.data.article;
                    }
                    if (data.code != 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });
                    }
                });
            },
            keyDown(e){
                if(13 === e.keyCode && e.ctrlKey) {
                    this.commentPublish()
                }
            },
            /**
             * 评论
             */
            commentPublish() {
                this.http.post('/action/addComment', {
                    user_id: this.info.id,
                    article_id: this.id,
                    content: this.commentContent,
                    time: new Date()
                }).then((data) => {
                    if (data.data) {
                        console.log(data)
                    }
                    if (data.code !== 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });

                    }else{
                        this.commentContent='';
                        this.getData()
                    }

                });
            },
            /**
             * 删除评论
             * */
            deleteComment(id){
                this.$confirm('确定删除, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    this.http.get('/action/deleteComment', {
                        id: id,
                    }).then((data) => {
                        if (data.data) {
                            console.log(data)
                        }
                        if (data.code !== 200) {
                            this.$notify({
                                title: '提示',
                                message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                            });

                        }else
                        this.getData()
                    });
                }).catch(()=>{

                });


            },
            /**
             * 关注
             */
            follow() {
                this.http.get('/action/follow', {
                    user_id: this.info.id,
                    follow_user_id: this.article.user_id,
                    time: new Date()
                }).then((data) => {
                    if (data.data) {
                        console.log(data)
                    }
                    if (data.code !== 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });

                    }else
                    this.getData()
                });
            },
            collection() {
                this.http.get('/action/collection', {
                    user_id: this.info.id,
                    article_id: this.id,
                    time: new Date()
                }).then((data) => {
                    if (data.data) {
                        console.log(data)
                    }
                    if (data.code !== 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });

                    }else
                    this.getData()
                });
            },
            dian_zan() {
                this.http.get('/action/dianZan', {
                    user_id: this.info.id,
                    article_id: this.id,
                    time: new Date()
                }).then((data) => {
                    if (data.data) {
                        console.log(data)
                    }
                    if (data.code !== 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });

                    }else
                    this.getData()
                });
            }

        },

        filters: {},
        mounted() {


        },

        created() {
            console.log('------')
            console.log(this)
            this.getData()
            console.log(this.id)
        },

    }
</script>

<style scoped>
    .article-content-page {
        width: 100%;
        height: calc(100% - 60px);
        overflow: auto;
        box-sizing: border-box;
        padding: 30px;
        background-color: #EFDCBA;
    }

    .article-content-main {
        box-sizing: border-box;
        width: 100%;
        padding: 30px;
        min-height: 100vh;
        background-color: whitesmoke;
        border-radius: 2px;
        border: 1px solid #c0ccda;
        overflow: auto;
    }

    .article-content-main > .title {
        color: #075DB3;
        font-size: 20px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    .meta {
        padding: 2px 10px;
        margin-left: 10px;
        height: 30px;
        border-radius: 5px;
        background-color: #cccccc;
        text-align: center;
    }

    .meta:nth-of-type(1) {
        margin-left: 0;
    }

    .action-btn-group {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .action-dian-zan {
        padding: 2px 10px;
        margin-left: 10px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    .action-press {
        color: #1296db;
    }

    .action-sou-chang {
        padding: 2px 10px;
        margin-left: 10px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    .action-share {
        padding: 2px 10px;
        margin-left: 10px;
        height: 40px;
        border-radius: 5px;
        text-align: center;
        cursor: pointer;
    }

    .writer {
        margin-top: 20px;
        border-radius: 10px;
        background-color: #F7F7F8;
        width: 100%;
        height: 200px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        justify-content: left;
    }

    .writer-head-img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #2c3e50;
    }

    .writer-info {
        box-sizing: border-box;
        padding-left: 20px;
        text-align: left;
    }

    .writer-name {
        font-size: 20px;
    }

    .writer-name-bellow {
        color: #9e9e9e;
    }

    .comment {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: left;
        justify-content: left;
        border-bottom: 1px solid #cccccc;
    }

    .head {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .text-area-main {
        width: calc(100% - 60px);
    }

    .text-area-main > textarea {
        box-sizing: border-box;
        padding: 10px;
        margin-left: 20px;
        font-size: 16px;
        resize: none;
        height: 100px;
        width: 100%;
    }

    .comment-publish {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .comment-publish-btn {
        display: flex;
    }

    .comment-publish-btn-publish {
        margin-left: 10px;
        padding: 0 20px;
        border-radius: 2px;
        cursor: pointer;
        line-height: 28px;
        font-size: 12px;
        color: #fff;
        background: #4285f4;
        border: 1px solid #4285f4;
    }

    .comment-publish-btn-publish:hover {
        color: #fff;
        background: #3c78dc;
        border: 1px solid #3c78dc;
    }

    .comment-publish-btn-cancel {
        padding: 0 20px;
        border-radius: 2px;
        cursor: pointer;
        line-height: 28px;
        font-size: 12px;
        background: white;
    }

    .comment-title {
        padding: 10px;
    }

    .comment-list {
        margin-top: 10px;
        border-bottom: 1px solid #cccccc;
    }

    .comment-list > li {
        display: flex;
        align-items: left;
        justify-content: left;
    }

    .content-body {
        padding: 0 20px 20px 20px;
    }

    .commenter {
        font-size: 15px;
        color: red;
        margin-right: 10px;
    }

    .commenter-action {
        margin-top: 5px;
    }

    .commenter-action > .dian-zan {
        margin-right: 50px;
        color: #adadad;
        cursor: pointer;
    }

    .commenter-action > .hui-fu {
        color: #adadad;
        cursor: pointer;
    }

    .follow {
        margin-left: 20px;
        font-size: 18px;
        cursor: pointer;
    }

    .delete {
        margin-left: 50px;
    }
    .delete:hover{
        color: #3c78dc;
    }
</style>