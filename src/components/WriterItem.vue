<template>
    <div class="selected-writer-content">
        <ul>
            <li class="item">
                <img src="./../static/img/noavatar_middle.gif" class="item-img"/>
                <div class="item-cont">
                    <div class="item-cont-title">
                        <h3>作者</h3>
                        <h4>关注</h4>
                    </div>
                    <div class="item-cont-cont">
                        <dl>
                            <dt>334W+</dt>
                            <dd>人气</dd>
                        </dl>
                        <dl>
                            <dt>334W+</dt>
                            <dd>评论</dd>
                        </dl>
                        <dl>
                            <dt>334W+</dt>
                            <dd>点赞</dd>
                        </dl>
                    </div>

                </div>
            </li>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "writer-item",

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
    .selected-writer-content {
        width: 99%;
        box-sizing: border-box;
        padding: 10px 20px;
        border-bottom: 1px solid #EEE;
        background: #FFF;
    }
    .selected-writer-content>ul{
        display: flex;
    }

    .item {
        width: 100%;
        display: flex;
        border-bottom: 1px dotted #EEE;
    }

    .item-img {
        width: 50px;
        height: 50px;
        display: block;
        border-radius: 50%;
    }

    .item-cont-title {
        display: flex;
        align-items:center;
        justify-content: space-around;
    }
    .item-cont-title>h4{
        color: #4285f4;
    }

    .item-cont {
        box-sizing: border-box;
        flex: 1;

    }

    .item-cont-cont {
        display: flex;
        flex-direction: row;
    }
    .item-cont-cont>dl{
        flex:1
    }
</style>