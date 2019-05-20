<template>
    <div class="sign">
        <div class="main">
            <h4 class="title">
                <div class="normal-title">
                    <a :class="{active:!isLoginUp}" @click="isLoginUp=false">登录</a>
                    <b>·</b>
                    <a id="js-sign-up-btn" :class="{active:isLoginUp}" @click="isLoginUp=true">注册</a>
                </div>
            </h4>

            <div class="js-sign-up-container">
                <form class="new_user" id="new_user" @submit="doSign($event,isLoginUp)" accept-charset="UTF-8"
                      method="post">
                    <input name="utf8" type="hidden" value="✓">
                    <input type="hidden" name="authenticity_token" value="9qP2Rk6oo+llcoOIolNcOnrBWBV0VKUsXLCjy0llIMCQS3QcTltddqXA5WuXi1eHZhKRIR1XuAC2ypD8u4ezzQ==">
                    <div v-if="isLoginUp" class="input-prepend restyle">
                        <input placeholder="你的昵称" type="text" value="" name="user[nickname]" id="user_nickname">
                        <i class="iconfont ic-user"></i>
                    </div>
                    <div class="input-prepend restyle no-radius js-normal">
                        <input type="hidden" value="CN" name="user[mobile_number_country_code]"
                               id="user_mobile_number_country_code">
                        <input placeholder="手机号" type="tel" name="user[mobile_number]" id="user_mobile_number">
                        <i class="iconfont ic-phone-number"></i>
                    </div>
                    <input type="hidden" name="oversea" id="oversea" value="false">
                    <input type="hidden" name="force_user_nonexist" id="force_user_nonexist" value="true">
                    <div style="display: none"
                         class="input-prepend restyle no-radius security-up-code js-security-number hide">
                        <input type="text" name="sms_code" id="sms_code" placeholder="手机验证码">
                        <i class="iconfont ic-verify"></i>
                        <a tabindex="-1" class="btn-up-resend js-send-code-button disable" href="javascript:void(0);"
                           id="send_code">发送验证码</a>
                        <div>
                            <div class="captcha"><input name="captcha[validation][challenge]" autocomplete="off"
                                                        type="hidden" value="fbe7ba5b52745d2812dbd181040cea31"> <input
                                    name="captcha[validation][gt]" autocomplete="off" type="hidden"
                                    value="ec47641997d5292180681a247db3c92e"> <input
                                    name="captcha[validation][validate]"
                                    autocomplete="off" type="hidden"
                                    value=""> <input
                                    name="captcha[validation][seccode]" autocomplete="off" type="hidden" value="">
                                <input
                                        name="captcha[id]" autocomplete="off" type="hidden" value="">
                                <div id="geetest-area" class="geetest"></div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" name="security_number" id="security_number">
                    <div class="input-prepend">
                        <input :placeholder="isLoginUp?'设置密码':'密码'" type="password" name="user[password]"
                               id="user_password">
                        <i class="iconfont ic-password"></i>
                    </div>
                    <input type="submit" name="commit" :value="isLoginUp?'注册':'登录'" class="sign-up-button"
                           id="sign_up_btn"
                           data-disable-with="注册">
                    <p v-if="isLoginUp" class="sign-up-msg">点击 “注册” 即表示您同意并愿意遵守简书<br> <a target="_blank"
                                                                                         href="http://www.jianshu.com/p/c44d171298ce">用户协议</a>
                        和 <a target="_blank" href="http://www.jianshu.com/p/2ov8x3">隐私政策</a> 。</p>
                </form>
                <!-- 更多注册方式 -->
                <div class="more-sign">
                    <h6>社交帐号直接{{isLoginUp?'注册':'登录'}}</h6>
                    <ul>
                        <li><a id="weixin" class="weixin" target="_blank" href="/users/auth/wechat"><i
                                class="iconfont ic-wechat"></i></a></li>
                        <li><a id="qq" class="qq" target="_blank" href="/users/auth/qq_connect"><i
                                class="iconfont ic-qq_connect"></i></a></li>
                    </ul>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "sign-up",

        data() {
            return {
                isLoginUp: false,
            }
        },

        methods: {
            doSign(event, isLoginUp) {
                console.log(event.target);
                this.axios.post('/user/register',{
                    name: 'name',
                    phone:13208190472,
                    password:'15922',
                    email: '583179913@qq.com'
                }).then((data) => {
                    console.log(data)
                    // 处理数据
                });
                event.preventDefault();
            }
        },

        filters: {},
        mounted() {

        },

        created() {
            this.isLoginUp = this.$route.query.up;

        },

    }
</script>

<style scoped>

    .sign {
        height: 100%;
        min-height: 750px;
        text-align: center;
        font-size: 14px;
        background-color: #f1f1f1;
    }

    .sign .main {
        width: 400px;
        margin: 60px auto 0;
        padding: 50px 50px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba(0, 0, 0, .1);
        vertical-align: middle;
        display: inline-block;
    }

    .sign form .restyle {
        margin-bottom: 0;
    }

    .sign form .input-prepend {
        position: relative;
        width: 100%;
    }

    .sign form .restyle input {
        border-bottom: none;
        border-radius: 4px 4px 0 0;
    }

    .sign form .input-prepend i {
        position: absolute;
        top: 14px;
        left: 10px;
        font-size: 18px;
        color: #969696;
    }

    .sign .sign-in-button, .sign .sign-up-button {
        margin-top: 20px;
        width: 100%;
        padding: 9px 18px;
        font-size: 18px;
        border: none;
        border-radius: 25px;
        color: #fff;
        background: #42c02e;
        cursor: pointer;
        outline: none;
        display: block;
        clear: both;
    }

    .iconfont {
        display: block;
        width: 32px;
        height: 32px;
        background-size: 70%, 100% !important;
        background-repeat: no-repeat !important;
    }

    .sign form .input-prepend input {
        width: 100%;
        height: 50px;
        margin-bottom: 0;
        padding: 4px 12px 4px 35px;
        border: 1px solid #c8c8c8;
        border-radius: 0 0 4px 4px;
        background-color: hsla(0, 0%, 71%, .1);
        vertical-align: middle;
    }

    body.reader-black-font input, body.reader-black-font select, body.reader-black-font textarea {
        font-family: -apple-system, SF UI Text, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }

    .sign:before {
        content: "";
        display: inline-block;
        height: 85%;
        vertical-align: middle;
    }

    *, :after, :before {
        box-sizing: border-box;
    }

    .sign .main {
        width: 400px;
        margin: 60px auto 0;
        padding: 50px 50px 30px;
        background-color: #fff;
        border-radius: 4px;
        box-shadow: 0 0 8px rgba(0, 0, 0, .1);
        vertical-align: middle;
        display: inline-block;
    }

    .sign {
        height: 100%;
        min-height: 750px;
        text-align: center;
        font-size: 14px;
        background-color: #f1f1f1;
    }

    body.reader-black-font .main .title, body.reader-black-font .preview .title {
        font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    }

    .sign .reset-title, .sign .title {
        margin: 0 auto 50px;
        padding: 10px;
        font-weight: 400;
        color: #969696;
    }

    .h4, h4 {
        font-size: 18px;
    }

    .h4, .h5, .h6, h4, h5, h6 {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .h1, .h2, .h3, .h4, .h5, .h6, h1, h2, h3, h4, h5, h6 {
        font-family: inherit;
        font-weight: 500;
        line-height: 1.1;
        color: inherit;
    }

    .sign .reset-title a, .sign .title a {
        padding: 10px;
        color: #969696;
    }

    .sign .reset-title b, .sign .title b {
        padding: 10px;
    }

    .sign .reset-title .active, .sign .title .active {
        font-weight: 700;
        color: #ea6f5a;
        border-bottom: 2px solid #ea6f5a;
    }

    .sign .reset-title a, .sign .title a {
        padding: 10px;
        color: #969696;
    }

    .sign .sign-up-msg {
        margin: 10px 0;
        padding: 0;
        text-align: center;
        font-size: 12px;
        line-height: 20px;
        color: #969696;
    }

    .sign .sign-up-msg a, .sign .sign-up-msg a:hover {
        color: #3194d0;
    }

    .sign .more-sign {
        margin-top: 50px;
    }

    .sign .more-sign h6:after, .sign .more-sign h6:before {
        content: "";
        border-top: 1px solid #b5b5b5;
        display: block;
        position: absolute;
        width: 60px;
        top: 5px;
    }

    .sign .more-sign h6:after {
        right: 30px;
    }

    .sign .more-sign h6:after, .sign .more-sign h6:before {
        content: "";
        border-top: 1px solid #b5b5b5;
        display: block;
        position: absolute;
        width: 60px;
        top: 5px;
    }

    .ic-wechat:before {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAChUlEQVRYR72XT26bUBDGZ6idbXODJieosWNva58gzgnqSAWpqzonaHqCpKtKplLcE4ScoO7W2MANkt4g3dYWX/WwHgL8+GtSlvDme7/5HswMTBWvwXdvjCA4J+YTJhqKcBAtCHgCa/bK0B+qSHLZxf2Z1yHGjdw0K24Hw1eOqftltEsB9GfehBl3ZQTlGoAvHVOfF8UUAgjLCbgvElI+Z75YftDtvNhcgM4376TdgsdEx3UAQPS82bLuf9SfsuJzAfqWO2ei93U2j46C6IdjdCeVAUT2Ry08HrK5jP275dMsFzId6M/Wt8z8qQkAAF8dszdVaWUCDGauT0xvmwEg3zG7ejUAy0UTm0uNpdFVJqu8KYoOM7wmAQDWVcVJCXBmeUON8LNJgIB4tDL0RVozy4HKla8INqsyqgEa+P7TQMioB3sATX7/aQhVPdgDGFjrayL+XGRpvef4sjR61/HYBEDnzjtub/FYt/YXQYW9ocWn/qX+LNcmAF42+6g7JFyIAF46+1hzSrgQAdQZOoosz3wemxMigP9j//4xxBxwF8z0rnZWFQIB+uWY3XCgjTngitHpvIJO7aXxohQBnFnrqUZ8I1QB/GHm17V3KAgMCFcro3ebcEB2QLE5kTZkhnDkTUMQvwEeEwULkVi8IibqgHCBoS1E2zxoGk5Ry04Y/lsQdeLjeu5QOrAaeC8Ae2n2LrKcVAKE4/gr3DOTID74AsjftHkUL8HKUixvDixXzPFNnX8oK37ZHKM7SmejdKCs9bsXlqjMF1N6HhCCYV/YwM4rTPJr2WW0e7uzzkoUnk2bx6WPQAqJ/kCESRxEiIFhb1vaXAoK4KNtMAV4mIJ+ANjO+0n9B+MbKjBlBeMNAAAAAElFTkSuQmCC");
    }

    .ic-qq_connect:before {
        content: '';
        display: block;
        width: 32px;
        height: 32px;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACmElEQVRYR+1WS3LaQBTspyhJVTbRDQLFZxtygnAEewfeBE7g5AYcIAv7BMEbxM74BIYTBLYY2fIJAhtXpZDVqYEIRkKSBThh49nOmzf9+r3uGcGBlxz4frwAyMxA7q6WMz35oFrmUWZuuTN8jvalAije1KqEnAJSFcDSLyQwBdgXSHtS6lztCiYWQG58UjGBHxBUMiUmhh7Q3IWVDQDLqo3LaMVZgJBoOuVOO0tsEBMCoCp/JbgOXU6OKGIJsOj/U4vCY6do956KiwVQHNeHEPkYbFJ47hTtr7m7I8v03v3Sk/rgt9uSfVaY1I+Ecrk6A0wfzYe8m+9Ns4BYMRBNpA4T7Dkl+zgOQFBp3LkA3LYAzoRq4sOLpItlC0IqWEaxT0hF7RG4F9AFpE/CzToLKwaKN/U+IJ+zoI5AHPicfwfeFERYFUpuoR5iSKFLSt9//XCR1JK9ACiqDYiq/jRNNcozSLRuy53zaIH6DMS2IIkRJTmAVRH5kpU1Em2n3Gnq8RoDtSpgXGdLxgEFw7iZ2TzPgd7aQFmZZJgE5rfv194aRnctPc4eTVYwNyxT8DMq48KkHmLXM/28m++6Ki7GiBb+/j6ReuAewl60eo/4ZIpvhVgkhhC0QLR0W9dZ2LBipWsQ7WQQitIF9h0Us+JmMCnZ1Q0Ggu3FY6RRGZXdfwVAcBZmgwNlNNtM/4a5/bX4RAbU0ICiWtEKHE29kuvhEkv3/2zKWUclDmEQoi6blLr9tMS7OmeqDLepZPl0pytmIx85mpTt0Ccn858wDtzinziXnv6Ep8j3yil1jhKteJvqo7GF8UlDhI1YaZIjBZDkhVO2G/8EgJ40GFaPxjT4IwYAA+3r8Xu1YB/WYt+C50i4bY4XBg7OwB94iEEwd/67PQAAAABJRU5ErkJggg==");
    }

    .sign .more-sign ul {
        margin-bottom: 10px;
        list-style: none;
    }

    .sign .more-sign ul li {
        margin: 0 5px;
        display: inline-block;
    }

    .sign .more-sign h6 {
        position: relative;
        margin: 0 0 10px;
        font-size: 12px;
        color: #b5b5b5;
    }

    li {
        line-height: 20px;
    }

    .sign .more-sign ul a {
        width: 50px;
        height: 50px;
        line-height: 50px;
        display: block;
    }

    .ic-user {
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAByUlEQVRYR+2W0VECQQyG/1SgViBWIFQguQbUCsQK1ArECtQOsAKhgQt2cFagJWgFccLsMQ6zd8nBzfBCZnjaJfnyJ5scYc9Ge46PA8BWCojIAMAlgONUwh8AC2b+7lrSTgAiYgGfAUwaAs0APDCzAYUsDJCyFgCWfZuZChxVIwxQlmVFROehtICKmUeRuyEAEblP0kd81ndumdlK0mohgI7Z1wFDKoQARES9THLnzOz6dy+k5vvaBgDAifciXAALvFcFDGCbHlDVz6Iohp5yUQWmAB49ZxvnT8xs/9v9FdgEVFWbA6eeQzu37Ilo7NXf7oYUSH0wVNUlER21QajqbwpeRWDDAAlioKozIrrIOVfVDyKaRMdwVwXM8WqyiYg119W/vWDzf87Mq6xFZH3XU8FVYGMDVqo6LYpikXMsIgZlzWqAoc3oApRlaXXflNzWrWW7TCDjFLT+Pqj5lrYW21RoBRCRFwB3nozO+Ssz2zLLWiOAiFhWtv/7sFHdH5vO2gCshjd9RAfwxszZr6gswI4LqIn5LPc8mwCsm997yr52c83M81AJRGSb2e/xZndDkwLWgPbr0+xJ1s927dedA30S5HwdAPauwB8hHKchImQr3wAAAABJRU5ErkJggg==");
    }

    .ic-phone-number {
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABoUlEQVRYR+2XPUscYRSFz9laK21FSwuRYGNAQe9lJRaSKiGlv8AQS3uLoIWiYC2YIggSK9GwzBv9AwHFXsQidqILptk9MrKCyjrufBAIzDRTzHvvfeYwMPchEq4QwhcAowAGk84lPKsDuJC05e577c7xpeIQwk8AUxkHPymTdE1y2cwWn/drCxBF0RrJOUnxG2yTPMkB8h6AAbhpNBrj1Wr1+HGvtgAhhH0A7yStu/vnHMPvS0MIUQviq5ktvAoQRdEZyX4A82a2WgDAdwCfAByY2XQagD8A/uYFANAFoBfAoZlNpgEoYPaTFqkBdmPqAig+ABjLkkBR38AmgNkSoEygTKBMoEygTOC/TOCHpF95f8ckPwIYz5JA3tnP69MtJJIuSd7mpZDUTbInSwKJC0mtVhuuVCozJDfM7CrBMYpfSEIIA5KOSPbFd3ef+NcAbwD8jodKOnX3ocIAOhWTlkGNSNpx95UEgNRicq9msU7FagYgq5p1SXKSHmtes9kc60jNWjpVpJzekFzqWE4fomzp+VtJmfScZF3SOYBvL+n5HaisZzCX6DSiAAAAAElFTkSuQmCC");
    }

    .ic-password {
        width: 27px;
        height: 27px;
        background-size: 68% 86% !important;
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABdElEQVRYR+2X/VHDMAzFpQlgA9oJYIP2ZQFgAtiAdgJgAsIG3QC6QF7YoExARigTiFMu7oVCWoePcNxZ/+QuluWfn21ZVulpJA/NbKKqUxE5abqvzKzMsmzZM5xonw4kz0TkTkRGHf0qEZkDeIyNGw1AciEiF5GBcwDzGN8oAJKzZuYxMYOPK5Hv67AXgKTL/dIOZGbPqjoDUPp/klMzy1X1eGvAMQBflk6LAfBZXLUiLAH4XvhgJH3tT1sN9wBcva8DFEVRqeqRRzCzV1UdAVh3APgJcf+Dpr0CMP4WAEmLmX3w2VYBwE6VY5agDXAL4GbXjEh6+3XwSQD/RwGSntc9zXqO/03z3OFJauWD1JvQL5gm2fh3CPNj7ElqHQA8sTwMMXJrjHO/tALAu6MzEEh9pBNAUiApkBRICiQF/lKB+uESALwI4UC3YKteRbmpiouiKFV1MgSEmT1lWVZXXhuApiq6NLNPXz0/Baaq/npahMfNG7Es4iGkurLMAAAAAElFTkSuQmCC") 49%, 100%;
    }
</style>