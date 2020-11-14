<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="app-nav-bar" title="LSW制作登录页面" left-arrow @click-left="$router.back()" />
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <van-cell-group>
            <van-field v-model="user.mobile" icon-prefix="app" left-icon="shouji" placeholder="请输入手机号" />
            <van-field v-model="user.code" clearable icon-prefix="app" left-icon="yanzhengma" placeholder="请输入验证码">
                <template #button>
                    <van-button class="send-btn" size="mini" round>发送验证码</van-button>
                </template>
            </van-field>
        </van-cell-group>
        <div class="login-btn-wrap">
            <van-button class="login-btn" type="info" block @click=onLogin>登录</van-button>
        </div>
        <!-- /登录表单 -->
    </div>
</template>

<script>
    import {
        login
    } from '@/api/user.js'
    import {
        Toast
    } from 'vant'
    export default {
        name: 'LoginIndex',
        components: {},
        props: {},
        data() {
            return {
                user: {
                    mobile: '13911111111', // 手机号
                    code: '246810' // 验证码
                }

            }
        },
        computed: {},
        watch: {},
        methods: {
            async onLogin() {
                Toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0, // 持续时间，0表示持续展示不停止
                })
                try {
                    const res = await login(this.user)
                    console.log(res)
                    Toast.success("登录成功")
                } catch (error) {
                    console.log('失败', error)
                    Toast.fail("手机号或者验证码错误")
                }

            }
        },
        created() {},
        mounted() {},
    }
</script>
<style lang='less' scoped>
    //@import url(); 引入公共css类
    .login-container {
        .send-btn {
            width: 76px;
            height: 23px;
            background-color: #ededed;

            .van-button__text {
                font-size: 11px;
                color: #666666;
            }
        }

        .login-btn-wrap {
            padding: 26px 16px;

            .login-btn {
                background-color: #6db4fb;
                border: none;

                .van-button__text {
                    font-size: 15px;
                }
            }
        }
    }
</style>