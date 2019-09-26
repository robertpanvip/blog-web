<template>
    <div class='person-info-page'>
        <!--<el-carousel height="300px">
            <el-carousel-item v-for="item in 3" :key="item">
                <img v-if="item===1" width="100%" src="./../static/img/bg01.jpg"/>
                <img v-if="item===2" width="100%" src="./../static/img/bg02.jpg"/>
                <img v-if="item===3" width="100%" src="./../static/img/bg03.jpg"/>
            </el-carousel-item>
        </el-carousel>-->
        <div class="pi-content">
            <div class="pi-content-left">
                <div class="pi-person-box">
                    <div v-if="userInfo.head_url" :class="{'pi-head':true,'no-head':!userInfo.head_url}">
                        <img :src="userInfo.head_url">
                        <div class="pi-head-circle"></div>
                        <button class="option_toggle" @click="changeHead">
                            <svg class="svg_side_icon svg_icon_user" viewBox="0 0 18 18" width="18" height="18">
                                <circle cx="9" cy="7" r="5" stroke="currentColor" stroke-width="2" fill="none"></circle>
                                <path d="M16 15.9A10 10 0 0 0 9 13a10 10 0 0 0-7 3" stroke-linecap="round"
                                      stroke-linejoin="round" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>
                            <span class="inner">切换</span>
                        </button>
                    </div>

                    <div class="pi-head-name">{{userInfo.name}}</div>
                    <button class="pi-follow">关注</button>
                </div>
                <div class="pi-info-box">
                    <div class="channel_info">
                        <div class="item">
                            <div class="num">{{userDetail.article.length}}</div>
                            <div class="text">文章</div>
                        </div>
                        <div class="item">
                            <div class="num">{{userDetail.flow}}</div>
                            <div class="text">人气</div>
                        </div>
                        <div class="item">
                            <div class="num">{{userDetail.follow.length}}</div>
                            <div class="text">粉丝</div>
                        </div>
                    </div>
                </div>
                <div class="user_navigate_list">
                    <div :class="activeClass(1)">
                        <a @click="toRouter('/person/history',1)"  class="navi_link _doki">
                            <svg class="svg_side_icon svg_icon_time" viewBox="0 0 18 18" width="18" height="18">
                            <circle cx="9" cy="9" r="7" stroke="currentColor" stroke-width="2" fill="none"></circle>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5v5h3" stroke="currentColor" stroke-width="2" fill="none"></path>
                            </svg>发布历史</a>
                    </div>
                    <div :class="activeClass(2)">
                        <a @click="toRouter('/person/userArticle',2)" class="navi_link _folder" >
                            <svg class="svg_side_icon svg_icon_folder" viewBox="0 0 18 18" width="18" height="18">
                                <path d="M4 2h1.659a2 2 0 0 1 1.658.882l.7 1.036a2 2 0 0 0 1.657.882H14a2 2 0 0 1 2 2V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"
                                      stroke="currentColor" stroke-width="2" fill="none"></path>
                                <path d="M10 1h5a1 1 0 0 1 0 2h-5a1 1 0 1 1 0-2zM8 12h2a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2zm5 0h2a1 1 0 0 1 0 2h-2a1 1 0 0 1 0-2zM3 12h2a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2z"
                                      fill="currentColor"></path>
                            </svg>
                            文章</a>
                    </div>
                    <div :class="activeClass(3)">
                        <a @click="toRouter('/person/collectionList',3)"  class="navi_link _collect" >
                            <svg class="svg_side_icon svg_icon_collect" viewBox="0 0 18 18" width="18" height="18">
                                <path d="M4.7 11C3.3 9.7 2 8 2 6.1 2 1.3 7.3 1 9 4c1.6-3 7-2.8 7 2"
                                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round" fill="none"></path>
                                <path d="M12 17a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm1-6V9h-2v2H9v2h2v2h2v-2h2v-2h-2z"
                                      fill="currentColor" fill-rule="nonzero"></path>
                            </svg>
                            收藏<span class="mark_dot none" id="sidenav_notice_playlist"></span></a>
                    </div>

                    <div :class="activeClass(4)">
                        <a @click="toRouter('/person/comment',4)" class="navi_link _message" >
                            <svg class="svg_side_icon svg_icon_message" viewBox="0 0 18 18" width="18" height="18">
                                <path d="M3.8 13.4A1.8 1.8 0 0 1 2 11.6V3.8C2 2.8 2.8 2 3.8 2h10.4c1 0 1.8.8 1.8 1.8v7.8a1.8 1.8 0 0 1-1.8 1.8h-6L5.4 16"
                                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round" fill="none"></path>
                                <path d="M6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                      fill="currentColor"></path>
                            </svg>
                            评论</a>
                    </div>
                    <div :class="activeClass(5)">
                        <a @click="toRouter('/person/leaveMessage',5)" class="navi_link _message">
                            <svg class="svg_side_icon svg_icon_message" viewBox="0 0 18 18" width="18" height="18">
                                <path d="M3.8 13.4A1.8 1.8 0 0 1 2 11.6V3.8C2 2.8 2.8 2 3.8 2h10.4c1 0 1.8.8 1.8 1.8v7.8a1.8 1.8 0 0 1-1.8 1.8h-6L5.4 16"
                                      stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                      stroke-linejoin="round" fill="none"></path>
                                <path d="M6.5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                                      fill="currentColor"></path>
                            </svg>
                            留言</a>
                    </div>

                    <div :class="activeClass(6)">
                        <a @click="toRouter('/person/message',6)" class="navi_link _notice">
                            <svg class="svg_side_icon svg_icon_notice" viewBox="0 0 18 18" width="18" height="18">
                                <path d="M14 7v1.6l2.7 3c.2.4.1 1-.2 1.3a.8.8 0 0 1-.5.1H2c-.5 0-.8-.4-.8-.9l.1-.5 2.7-3V7m10 0A5 5 0 0 0 4 7M6 14c.5 1.2 1.7 2 3 2s2.5-.8 3-2"
                                      stroke-linecap="round" stroke-linejoin="round" stroke="currentColor"
                                      stroke-width="2" fill="none"></path>
                            </svg>
                            消息</a>
                    </div>


                </div>

            </div>
            <div  class="pi-content-right">
                <router-view/>
            </div>

            <!--<div v-if="userInfo.head_url" class="pi-head" :style="{background:'url('+userInfo.head_url+')'}">
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
            </el-tabs>-->
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
    import ImageCopper from './../components/ImageCopper'

    export default {
        name: "person-info",
        components: {
            ImageCopper
        },

        data() {
            return {
                active:1,
                dialogVisible: false,
                imagePreview: null,
                file: {},
                imgBase64: '',
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

        },

        methods: {
            activeClass(index){
                return{
                    item:true,
                    current:this.active===index
                }
            },
            toRouter(url,index){
                this.$router.push(url)
                this.active=index
            },
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
                        this.userInfo.head_url = this.imgBase64;
                        localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
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
        height: calc(100% - 61px)
    }

    .pi-content {
        display: flex;
        margin: 40px auto;
        background-color: whitesmoke;
        width: 1200px;
        min-height: calc(100% - 60px);
        position: relative;
    }

    .pi-head {
        position: relative;
        margin: 0 auto;
        width: 80px;
        height: 80px;
        border-radius: 100%;
        box-shadow: 1px 1px 5px yellow;
        background-size: 100% 100% !important;
    }

    .pi-head > img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .pi-head:hover > .option_toggle {
        visibility: visible;
        border-radius: 50%;
        text-align: center;
        outline: none;
    }

    .svg_icon_user {
        display: block;
        width: 18px;
        height: 18px;
        margin: 4px auto;
    }

    .option_toggle {
        visibility: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .6);
        color: #fff;
        border: 0 none;
    }

    .pi-head-circle {
        position: absolute;
        right: -5px;
        bottom: 9px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        box-shadow: 1px 1px 5px #cccccc;
        background-color: yellow;
    }

    .pi-head-name {
        margin: 15px 10px 6px;
        overflow: hidden;
        color: #111;
        font-size: 22px;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
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

    .pi-content-left {
        width: 320px;
        border-radius: 4px;
        background: #f8f8f8;
    }

    .pi-person-box {
        padding-top: 40px;
        width: 320px;
        height: 267px;
        background-image: url('./../static/img/bg_vip@2x.png');
        background-size: 100% auto;
    }

    .pi-follow {
        cursor: pointer;
        display: block;
        width: 160px;
        box-sizing: content-box;
        outline: 0 none;
        margin: 5px auto 10px;
        border: none;
        border-radius: 20px;
        background-color: #e3b54c;
        color: #fff;
        font-size: 14px;
        line-height: 40px;
    }

    .pi-info-box {
        position: relative;
        padding: 20px;
        border-bottom: 1px solid #eee;
    }

    .channel_info {
        user-select: none;
        white-space: nowrap;
    }

    .channel_info .item:before {
        position: absolute;
        top: 12px;
        left: 0;
        width: 1px;
        height: 30px;
        background-color: #eee;
        content: "";
    }

    .channel_info > .item {
        display: inline-block;
        position: relative;
        width: 33%;
        color: #666;
        font-size: 13px;
        text-align: center;
    }

    .channel_info .num {
        color: #111;
        font-family: numFont, PingFangSC-Regular, Tahoma, Microsoft Yahei, sans-serif;
        font-size: 24px;
    }

    .user_navigate_list {
        padding: 20px;
    }

    .user_navigate_list .item {
        display: block;
        color: #666;
        line-height: 42px;
    }

    .user_navigate_list .svg_side_icon {
        display: inline-block;
        position: absolute;
        top: 12px;
        left: 14px;
        width: 18px;
        height: 18px;
        color: #ccc;
    }

    .user_navigate_list .current {
        border-radius: 2px;
        background-color: #fbf2ef;
        color: #ff5c38;
    }

    .user_navigate_list .navi_link {
        display: block;
        position: relative;
        padding-left: 45px;
        color: inherit;
        font-size: 15px;
    }

    .pi-content-right {
        width: 100%;
        height: calc(100vh - 120px);
        overflow: auto;
    }
</style>