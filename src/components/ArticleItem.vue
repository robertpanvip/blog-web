<template>
    <div class='article-page'>
        <div class="user-info">
            <img src="./../static/img/noavatar_middle.gif"/>
            <span class="user-name">slom123</span>
            <span>发布于:4天前</span>
        </div>
        <h2 class="title">Docker实践(八)：Prometheus + Grafana + 钉钉搭建监控告警系统<span class="recommend">荐</span></h2>
        <p class="content">
            环境说明：主机名Docker版本Prometheus版本Nodeexporter版本cAdvisor版本Grafana版本ip地址docker0118.09.22.9.20.18.0v0.32.0v6.1.6172.27.9.71docker0218.09.2/0.18.0v0.32.0/172.27.9.75ubuntu安装详见：Ubuntu16.04.5以lvm
            环境说明：主机名Docker版本Prometheus版本Nodeexporter版本cAdvisor版本Grafana版本ip地址docker0118.09.22.9.20.18.0v0.32.0v6.1.6172.27.9.71docker0218.09.2/0.18.0v0.32.0/172.27.9.75ubuntu安装详见：Ubuntu16.04.5以lvm
        </p>
        <div class="intro">
            <a class="selected">精选文章</a>
            <a class="do">阅读1810</a>
            <a class="do">评论 0</a>
            <a class="do">收藏 5</a>
        </div>
        <button></button>
    </div>
</template>

<script>
    export default {
        name: "article-item",

        data() {
            return {}
        },

        methods: {},

        filters: {},

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
        background: #f7f7f8;
    }
    .article-page:hover {
        background: #FFF;
    }

    .user-info {
        line-height: 32px;
        margin-bottom: 15px;
        display: flex;
    }
    .user-info>img{
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
    .intro>.do{
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