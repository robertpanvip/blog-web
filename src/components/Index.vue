<template>
    <div class='index-page'>
        <div class="index-page-main">
            <div class="left">
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>
                <ArticleItem/>

            </div>
            <div class="right">
                <div class="write"><a class="want-write">快去写文章</a><span class="want-write-location">记录自己的技术轨迹</span></div>
                <div class="selected-writer">
                    <div class="title">
                        <h3>推荐作者</h3>
                        <h4>更多</h4>
                    </div>
                    <Writer/>
                    <Writer/>
                    <Writer/>
                    <Writer/>
                    <Writer/>
                    <Writer/>
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
            ArticleItem,Writer
        },

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
    .index-page{
        width: 100%;
        height: calc(100% - 60px);
        background-color: #f7f7f8;
        overflow: scroll;
    }
    .index-page-main{
        width: 1200px;
        height: 100%;
        margin: 0 auto;
        display: flex;
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