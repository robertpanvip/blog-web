<template>
    <div class='article-page' @click="articleClick">
        <div class="user-info">
            <img v-if="data.head_url" :src="data.head_url"/>
            <img v-else src="./../static/img/head.jpg"/>
            <span class="user-name">{{data.name}}</span>
            <span>发布于:{{data.publish_time}}</span>
        </div>
        <h2 class="title">{{data.title}}<span v-if="selected&&index<=4" class="recommend">荐</span></h2>
        <p class="content" v-html="data.preview"></p>
        <div v-if="data.flows"  class="intro">
            <a v-if="selected&&index<=9" class="selected">精选文章</a>
            <a class="do">阅读{{data.flows}}</a>
            <a class="do">评论 {{data.comments.length}}</a>
            <a class="do">收藏 {{data.collections.length}}</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "article-item",
        props: {
            selected:{
              type:Boolean,
              default:false,
            },
            index:{
                type:Number,
                default:0,
            },
            data: {
                type: Object,
                default: () => ({
                    user_name: '',
                    publish_time: '',
                    title: '',
                    content: '',
                    preview: '',
                    comments:[],
                    collections:[],
                })
            }
        },

        data() {
            return {}
        },

        methods: {
            articleClick() {
                this.$emit('item-click', this.data)
            }
        },

        filters: {

        },

        mounted() {

        },


        created() {

        },

    }
</script>

<style scoped>
    .article-page {
        padding: 20px 20px 20px 10px;
        border-bottom: 1px solid #eee;
        font-size: 12px;
        position: relative;
        overflow: hidden;
     /*   background: #f7f7f8;*/
        color: black;
    }

    .article-page:hover {
        background: #FFF;
        border-radius: 5px;
    }

    .user-info {
        line-height: 32px;
        margin-bottom: 15px;
        display: flex;
    }

    .user-info > img {
        width: 32px;
        height: 32px;
        margin-right: 10px;
        border-radius: 50%;
    }

    .title {
        line-height: 1;
        margin-bottom: 15px;
        font-size: 20px;
        display: flex;
    }

    .content {
        color: #666;
        height: 48px;
        line-height: 24px;
        overflow: hidden;
        font-size: 14px;
        text-align: left;
    }

    .intro {
        overflow: hidden;
        line-height: 24px;
        padding-top: 15px;
        text-align: left;
    }

    .intro > .do {
        margin-left: 10px;
        color: #999;
    }

    .user-name {
        color: #333;
        margin-right: 10px;
    }

    .recommend {
        color: #FFF;
        background: #F05F0E;
        border-radius: 2px;
        padding: 2px;
        font-weight: normal;
        margin-left: 5px;
        font-size: 16px;
    }

    .selected {
        font-size: 12px;
        padding: 0 8px;
        line-height: 20px;
        color: #ee5e0f;
        background: #fff;
        border: 1px solid #ee5e0f;
        border-radius: 2px;
        margin-right: 16px;
    }
</style>