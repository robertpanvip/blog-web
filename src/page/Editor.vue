<template>
    <div class='editor-page'>
        <ul class="editor-title-list">
            <li class="new-art">新建文章</li>
            <li>
                <i class="file-img"></i>
                <div class="editor-setting">
                    <i class="editor-setting-img"></i>
                    <div></div>
                </div>
                <span class="editor-title">2018-5</span>
                <span class="editor-content">2018-5</span>
                <span class="editor-total">字数：0</span>
            </li>
        </ul>
        <div class="editor">
            <input class="title"  value="2018"/>
            <button @click="this.subOk">提交</button>
            <div class="editor-main">

            </div>
        </div>
    </div>
</template>

<script>
    import Editor from 'wangeditor';
    let editor=null;

    export default {
        name: "editor",

        data(){
            return{

            }
        },
        methods:{

            subOk(){
                console.log(editor.txt.html());
            }

        },
        mounted(){
            // 创建编辑器
            editor = new Editor('.editor-main');
            editor.create();
        }
    }
</script>

<style scoped>
    .editor-page {
        width: 100%;
        height: 100%;
        text-align: left;
        display: flex;
    }

    .editor {
        width: calc(100% - 300px);
        height: 100%;
        position: relative;
    }
    .editor>button{
        position: absolute;
        right: 30px;
        top: 57px;
        width: 80px;
        height: 30px;
    }
    .editor>.title{
        width: 100%;
        padding: 0 80px 10px 40px;
        margin-bottom: 0;
        margin-top: 10px;
        border: none;
        font-size: 30px;
        font-weight: 400;
        line-height: 30px;
        -webkit-box-shadow: none;
        box-shadow: none;
        color: #595959;
        background-color: transparent;
        outline: none;
        border-radius: 0;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .editor-title-list {
        width: 300px ;
        height: 100%;
    }
    .editor-title-list>li{
        box-sizing: border-box;
        position: relative;
        height: 90px;
        color: #595959;
        background-color: #ffffff;
        margin-bottom: 0;
        padding: 15px 10px 15px 60px;
        -webkit-box-shadow: 0 0 0 1px #d9d9d9;
        box-shadow: 0 0 0 1px #d9d9d9;
        list-style: none;
        line-height: 60px;
        cursor: pointer;
        user-select: none;
        border-left: 5px solid #ec7259;
    }
    .editor-title-list>li:hover{
        background-color: #e6e6e6;
    }

    .file-img {
        position: absolute;
        box-sizing: border-box;
        top: 30px;
        left: 20px;
        width: 22px;
        color: #595959;
        height: 30px;
        background: url(//cdn2.jianshu.io/writer/static/img/sprite.9d24217.png) no-repeat 0 -25px;
        background-size: 250px;

    }

    .editor-title {
        display: block;
        height: 30px;
        line-height: 30px;
        margin-right: 40px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 18px;
        color: #333;
    }

    .editor-content {
        display: block;
        height: 30px;
        line-height: 30px;
        margin-right: 40px;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #595959;
    }

    .editor-setting {
        float: right;
        font-size: 16px;
        width: 40px;
        text-align: center;
        position: relative;
        min-height: 30px;
        max-height: 50px;
    }

    .editor-setting-img {
        display: inline-block;
        font: normal normal normal 14px/1 FontAwesome;
        font-size: inherit;
        text-rendering: auto;
    }
    .editor-setting-img:before{
        content: "\F013";
    }

    .editor-total {
        position: absolute;
        bottom: 2px;
        left: 5px;
        font-size: 9px;
        line-height: 16px;
        color: #595959;
    }

    .new-art {
        height: 60px !important;
        box-sizing: border-box;
        line-height: 20px!important;
        font-size: 15px !important;
        font-weight: 400 !important;
        padding: 20px 0 20px 25px !important;
        cursor: pointer !important;
        color: #595959 !important;
    }
</style>