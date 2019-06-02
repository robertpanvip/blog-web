<template>
    <div class='person-info-page'>
        <el-carousel height="300px">
            <el-carousel-item v-for="item in 3" :key="item">
                <img v-if="item===1" width="100%" src="./../static/img/bg01.jpg"/>
                <img v-if="item===2" width="100%" src="./../static/img/bg02.jpg"/>
                <img v-if="item===3" width="100%" src="./../static/img/bg03.jpg"/>
            </el-carousel-item>
        </el-carousel>
        <div class="pi-content">
            <div v-if="userInfo.head_url" class="pi-head" :style="{background:'url('+userInfo.head_url+')'}">
                <div class="pi-head-circle"></div>
            </div>
            <div v-else class="pi-head no-head">
                <div class="pi-head-circle"></div>
            </div>
            <div class="pi-head-change" @click="changeHead">修改</div>
            <div class="pi-head-name">
                <div class="pi-head-name-box">
                    <h1>{{userInfo.name}}</h1>
                    <h1 class="follow">关注</h1>
                </div>

                <h4>签名</h4>
            </div>
            <div class="pi-head-name-info">
                <dl>
                    <dt>{{userDetail.article.length}}</dt>
                    <dd>文章</dd>
                </dl>
                <dl>
                    <dt>{{userDetail.flow}}</dt>
                    <dd>人气</dd>
                </dl>
                <dl>
                    <dt>{{userDetail.follow.length}}</dt>
                    <dd>粉丝</dd>
                </dl>
            </div>
            <div class="pi-head-name-introduce">
                简介
            </div>
            <el-tabs class="pi-head-right" v-model="activeName">
                <el-tab-pane label="状态" name="first">
                    <div class="month-group" v-for="(months) in dynamic">
                        <h2>{{months[0]}}</h2>
                        <h3 v-for="item in months[1]"><span style="color: #4285f4">pan </span>发表了新文章 <span>{{item.publish_time}}</span>
                        </h3>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="文章" class="article-tab" name="second">
                    <ArticleItem v-for=" (article,index) in userDetail.article.detail" :data="article"/>
                </el-tab-pane>
                <el-tab-pane label="留言" name="third">
                    留言
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog
                title="上传头像"
                :visible.sync="dialogVisible"
                width="550px"
                :before-close="handleClose">
            <div style="display: flex;justify-content: center;align-items: center;">
                <ImageCopper @preview="preview"/>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="uploadCancel">取 消</el-button>
                <el-button type="primary" @click="upload">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import moment from 'moment'
    import ArticleItem from './../components/ArticleItem'
    import ImageCopper from './../components/ImageCopper'

    export default {
        name: "person-info",
        components: {
            ArticleItem, ImageCopper
        },

        data() {
            return {
                activeName: 'first',
                dialogVisible: false,
                imagePreview: null,
                file: {},
                imgBase64: '',
                userInfo: JSON.parse(localStorage.getItem('userInfo')),
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

        methods: {
            changeHead() {
                this.dialogVisible = true
            },
            handleClose() {
                this.dialogVisible = false;
            },
            preview(base64) {
                this.imgBase64 = base64;
            },
            uploadCancel() {
                this.dialogVisible = false
                this.file = {};
                this.imagePreview = null;
            },
            upload() {
                this.http.post('/user/uploadHead', {user_id: this.userInfo.id, base64: this.imgBase64}).then((data) => {
                    if (data.data && data.data.length !== 0) {

                    }
                    if (data.code != 200) {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, data.msg)
                        });
                    } else {
                        this.$notify({
                            title: '提示',
                            message: this.$createElement('i', {style: 'color: ' + data.code === 200 ? 'blue' : 'red'}, '上传成功')
                        });
                        this.userInfo.head_url=this.imgBase64;
                        localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
                        this.dialogVisible = false
                    }
                });

            }

        },

        filters: {},

        mounted() {
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
    .person-info-page {
        width: 100%;
        height: 100%;
    }

    .pi-content {
        background-color: #c0ccda;
        width: 100%;
        height: calc(100% - 300px);
        position: relative;
    }

    .pi-head {
        position: absolute;
        z-index: 100;
        left: 100px;
        top: -75px;
        width: 150px;
        height: 150px;
        border-radius: 50%;
        box-shadow: 1px 1px 5px yellow;

    }

    .pi-head-circle {
        position: absolute;
        right: 5px;
        bottom: 20px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        box-shadow: 1px 1px 5px #cccccc;
        background-color: yellow;
    }

    .pi-head-name {
        position: absolute;
        z-index: 100;
        left: 130px;
        top: 80px;
    }

    .pi-head-name > .pi-head-name-box {
        display: inline-block;
        color: red;
    }

    .pi-head-name-box > h1 {
        display: inline-block;
    }

    .pi-head-name-box > .follow {
        margin-left: 10px;
        color: #4285f4 !important;
    }

    .pi-head-name-info dt, .pi-head-name-info dd {
        width: 100px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pi-head-name-info {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 170px;
        width: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pi-head-name-introduce {
        position: absolute;
        z-index: 100;
        left: 0;
        top: 250px;
        width: 300px;
        font-size: 16px;
        color: #4285f4;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .pi-head-right {
        padding: 10px;
        width: calc(100% - 430px);
        height: calc(100vh - 350px);
        box-sizing: border-box;
        background-color: whitesmoke;
        border-radius: 2px;
        position: absolute;
        z-index: 100;
        left: 400px;
        top: 20px;
    }

    .article-tab {
        overflow: auto;
        height: 500px;
        box-sizing: border-box;
        padding: 10px;
    }

    .pi-head-change {
        color: #4285f4;
        position: absolute;
        z-index: 100;
        left: 280px;
        top: 30px;
    }

    .no-head {
        background: url("./../static/img/head.jpg");
    }
</style>