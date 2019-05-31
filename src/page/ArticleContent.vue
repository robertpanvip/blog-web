<template>
    <div class='article-content-page'>
        <div class='article-content-main'>
            <p class="title">{{article.title}}</p>
            <div class="content" v-cloak  v-html="article.content">
            </div>
            <div>
                <span class="meta">路由</span>
                <span class="meta">网关</span>
                <div class="action-btn-group">
                    <span class="action-dian-zan" @click="dian_zan"><img src="./../static/img/like.svg"/>点赞</span>
                    <div>
                        <span class="action-sou-chang"><img src="./../static/img/star.svg"/>收藏</span>
                        <span class="action-share"><img src="./../static/img/share.svg"/>分享</span>
                    </div>
                </div>
            </div>
            <div class="writer">
                <img class="writer-head-img" src="../static/img/head.jpg">
                <div class="writer-info">
                    <span class="writer-name">chellman</span><span class="follow">关注</span><br/>
                    <span class="writer-name-bellow">6篇文章，9W+人气，0粉丝</span>
                </div>
            </div>
            <h2 class="comment-title">评论(850)</h2>
            <div class="comment">
                <img class="head" src="../static/img/head.jpg">
                <div class="text-area-main">
                    <textarea  placeholder="评论或者提问"></textarea>
                    <div class="comment-publish">
                        <span>Ctrl+Enter 发布</span>
                        <div class="comment-publish-btn">
                            <div class="comment-publish-btn-cancel">取消</div>
                            <div class="comment-publish-btn-publish">发布</div>
                        </div>
                    </div>
                </div>

            </div>
            <ul class="comment-list">
                <li>
                    <img class="head" src="../static/img/head.jpg">
                    <div class="content-body">
                        <span class="commenter">有缘人</span>
                        <span>2019-5-27</span>
                        <div>还能在短点吗？？？？？？？还能在短点吗？？？？？？？还能在短点吗？？？？？？？还能在短点吗？？？？？？？还能在短点吗？？？？？？？还能在短点吗？？？？？？？还能在短点吗？？？？？？？还能在短点吗？？？？？？？</div>
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
    export default {
        name: "article-content",

        data() {
            return {
                id: this.$route.query.article_id,
                article: {}
            }
        },

        methods: {
            getData() {
                this.http.get('/article/getById', {id: this.id}).then((data) => {
                    if (data.data) {
                        this.article = data.data;
                    }
                    if (data.code != 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });
                    }
                });


            },
            dian_zan(){
               /* this.http.get('/article/getById', {id: this.id}).then((data) => {
                    if (data.data) {
                        this.article = data.data;
                    }
                    if (data.code != 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });
                    }
                });*/
            }

        },

        filters: {},
        mounted() {


        },

        created() {
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
    .article-content-main>.title{
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
    .head{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .text-area-main{
        width: calc(100% - 60px);
    }
    .text-area-main>textarea{
        box-sizing: border-box;
        padding: 10px;
        margin-left: 20px;
        font-size: 16px;
        resize:none;
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
    .comment-list>li{
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
    .commenter-action{
        margin-top: 5px;
    }
    .commenter-action>.dian-zan {
        margin-right: 50px;
        color: #adadad;
        cursor: pointer;
    }
    .commenter-action>.hui-fu {
        color: #adadad;
        cursor: pointer;
    }

    .follow {
        margin-left: 20px;
        font-size: 18px;
        color: #4285f4;
        cursor: pointer;
    }

</style>