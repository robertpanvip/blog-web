<template>
    <div>
        <div class="model" v-show="model" @click="model = false">
            <div class="model-show">
                <img :src="modelSrc" alt="">
            </div>
        </div>
        <p>预览</p>
        <div class="show-preview"
             :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
            <div :style="previews.div">
                <img :src="previews.url" :style="previews.img">
            </div>
        </div>
        <div class="cut">
            <vue-cropper ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
                        :info="true" :full="option.full"
                        :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
                        :original="option.original"
                        :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth"
                        :auto-crop-height="option.autoCropHeight" :center-box="option.centerBox"
                        @real-time="realTime" :high="option.high"
                         @img-load="imgLoad"/>
        </div>

        <div class="test-button">
            <label class="btn" for="uploads">上传图片</label>
            <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);"
                   accept="image/png, image/jpeg, image/gif, image/jpg"
                   @change="uploadImg($event, 1)">
            <button @click="changeScale(1)" class="btn">+</button>
            <button @click="changeScale(-1)" class="btn">-</button>
            <button @click="rotateLeft" class="btn">左旋</button>
            <button @click="rotateRight" class="btn">右旋</button>
          <!--  <a @click="down('base64')" class="btn">download(base64)</a>-->
           <!-- <a @click="down('blob')" class="btn">download(blob)</a>-->
            <!--<div style="display:block; width: 100%;">
                <label class="c-item">
                    <p>输出图片格式</p>
                    <label>jpg
                        <input type="radio" name="type" value="jpeg" v-model="option.outputType">
                    </label>
                    <label>png
                        <input type="radio" name="type" value="png" v-model="option.outputType">
                    </label>
                    <label>webp
                        <input type="radio" name="type" value="webp" v-model="option.outputType">
                    </label>
                </label>
            </div>-->
        </div>
    </div>
</template>

<script>
    import {VueCropper} from 'vue-cropper'
    export default {
        name: 'image-copper',
        components: {
            VueCropper,
        },
        data() {
            return {
                model: false,
                modelSrc: '',
                crap: false,
                previews: {},
                lists: [
                    {
                        img: ''
                    },
                ],
                option: {
                    img: '',
                    size: 1,
                    full: false,
                    outputType: 'jpg',
                    canMove: true,
                    fixedBox: true,
                    original: false,
                    canMoveBox: true,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 150,
                    autoCropHeight: 150,
                    centerBox: false,
                    high: true
                },
                show: true
            }
        },
        methods: {
            changeScale(num) {
                num = num || 1;
                this.$refs.cropper.changeScale(num)
            },
            rotateLeft() {
                this.$refs.cropper.rotateLeft()
            },
            rotateRight() {
                this.$refs.cropper.rotateRight()
            },
            finish(type) {
                // 输出
                // let test = window.open('about:blank')
                // test.document.body.innerHTML = '图片生成中..'
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        console.log(data);
                        let img = window.URL.createObjectURL(data)
                        this.model = true
                        this.modelSrc = img
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.model = true
                        this.modelSrc = data
                    })
                }
            },
            // 实时预览函数
            realTime(data) {
                this.previews = data;
              /*  console.log(data)*/
                this.$refs.cropper.getCropData((data) => {
                   // this.downImg = data
                    if(data.length>30000){
                        this.option.high=false
                    }

                    this.$emit('preview',data)
                })
            },
            down(type) {
                let aLink = document.createElement('a')
                aLink.download = 'demo'
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        this.downImg = window.URL.createObjectURL(data)
                        aLink.href = window.URL.createObjectURL(data)
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.downImg = data
                        aLink.href = data
                        aLink.click()
                    })
                }
            },

            uploadImg(e, num) {
                //上传图片
                // this.option.img
                let file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                let reader = new FileReader()
                reader.onload = (e) => {
                    let data
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    if (num === 1) {
                        this.option.img = data
                    } else if (num === 2) {
                        this.example2.img = data
                    }
                }
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                reader.readAsArrayBuffer(file)
            },
            imgLoad(msg) {
                console.log(msg)
            }
        },

    }
</script>

<style scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .cut {
        width: 500px;
        height: 500px;
        margin: 30px auto;
    }
    .test-button {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
    }

    .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin:20px 10px 0px 0px;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background: #50bfff;
        border: 1px solid #50bfff;
        transition: all .2s ease;
        text-decoration: none;
        user-select: none;
    }

    .show-info h2 {
        line-height: 50px;
    }
    .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
    }

    .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }

    .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-size: 20px 20px;
        background: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%) 0px 0px, 10px 10px;
    }

    @keyframes slide {
        0%  {
            background-position: 0 0;
        }
        100% {
            background-position: -100% 0;
        }
    }

    .show-preview {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        border: 1px solid #ccc;
        box-shadow: 1px 1px 5px yellow;
    }
</style>