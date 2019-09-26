<template>
    <div class='publish-history-page'>
        <div class="month-group" v-for="(months) in dynamic">
            <h2>{{months[0]}}</h2>
            <h3 v-for="item in months[1]"><span style="color: #4285f4">pan </span>发表了新文章 <span>{{item.publish_time}}</span>
            </h3>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'
    export default {
        name: "publish-history",

        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem('userInfo')) || {},
                userDetail: {
                    article: {
                        detail: [],
                        length: 0
                    },
                    follow: {
                        length: 0
                    }
                }
            }
        },
        computed: {
            dynamic() {
                let obj = {};
                this.userDetail.article.detail.map(item => {
                    const month = moment(new Date(item.publish_time)).format("YYYY-MM")
                    if (!obj[month]) obj[month] = [];
                    obj[month].push(item)
                });
                return Object.entries(obj).reverse().map(item => [item[0], item[1].reverse()])
            }
        },
        methods: {},

        filters: {},
        mounted(){
            this.http.get('/user/person', {user_id: this.userInfo.id}).then((data) => {
                if (data.data && data.data.length !== 0) {
                    this.userDetail = data.data;
                }
                if (data.code != 200) {
                    this.$notify({
                        title: '提示',
                        message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                    });
                }
            });
        },

        created() {

        },

    }
</script>

<style scoped>
    .publish-history-page {
        width: 100%;
        height: 100%;
    }
</style>