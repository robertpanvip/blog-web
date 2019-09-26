<template>
    <div class='user-article-page'>
        <ArticleItem v-for=" (article,index) in userDetail.article.detail" :data="article"/>
    </div>
</template>

<script>
    import ArticleItem from './../components/ArticleItem'
    export default {
        name: "user-article",
        components: {
            ArticleItem,
        },
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
    .user-article-page {
        width: 100%;
        height: 100%;
    }
</style>