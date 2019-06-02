<template>
    <div class="selected-writer-content">
        <ul>
            <li class="item">
                <img v-if="data.head_url" :src="data.head_url" class="item-img"/>
                <img v-else src="./../static/img/head.jpg" class="item-img"/>
                <div class="item-cont">
                    <div class="item-cont-title">
                        <h3>{{data.name}}</h3>
                        <h4 v-if="data.is_follow" style="color:#ccc;cursor: not-allowed;user-select: none; ">关注</h4>
                        <h4 v-else @click="follow">关注</h4>
                    </div>
                    <div class="item-cont-cont">
                        <dl>
                            <dt>{{data.flows}}</dt>
                            <dd>人气</dd>
                        </dl>
                        <dl>
                            <dt>{{data.comments}}</dt>
                            <dd>评论</dd>
                        </dl>
                        <dl>
                            <dt>{{data.thumbs_ups}}</dt>
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
        props:{
            data:{
                type:Object,
                default:()=>({})
            }
        },

        data() {
            return {
                userInfo :JSON.parse(localStorage.getItem('userInfo')),
            }
        },

        methods: {
            /**
             * 关注
             */
            follow() {
                this.http.get('/action/follow', {
                    user_id: this.userInfo.id,
                    follow_user_id: this.data.id,
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
        },

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
        flex:1;
    }
    dt,dd{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>