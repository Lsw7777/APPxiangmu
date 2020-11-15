<template>
    <div class="login-container">
        <!-- 导航栏 -->
        <van-nav-bar class="app-nav-bar" title="LSW制作登录页面" left-arrow @click-left="$router.back()" />
        <!-- /导航栏 -->

        <!-- 登录表单 -->
        <van-form @submit="onLogin" :show-error="false" :show-error-message="false" @failed="onFailed" validate-first>
            <van-field v-model="user.mobile" icon-prefix="app" left-icon="shouji" placeholder="请输入手机号"
                :rules="formRules.mobile" />
            <van-field v-model="user.code" clearable icon-prefix="app" left-icon="yanzhengma" placeholder="请输入验证码"
                :rules="formRules.code">
                <template #button>
                    <van-button class="send-btn" size="mini" round>发送验证码</van-button>
                </template>
            </van-field>

            <div class="login-btn-wrap">
                <van-button class="login-btn" type="info" block>登录</van-button>
            </div>
        </van-form>
        <!-- /登录表单 -->
    </div>
</template>

<script>
    import {
        login
    } from '@/api/user.js'

    export default {
        name: 'LoginIndex',
        components: {},
        props: {},
        data() {
            return {
                user: {
                    mobile: '13911111111', // 手机号
                    code: '246810' // 验证码
                },
                formRules: {
                    mobile: [{
                            required: true,
                            message: '请输入手机号'
                        },
                        {
                            pattern: /^1[3|5|7|8|9]\d{9}$/,
                            message: '手机号格式错误'
                        }
                    ],
                    code: [{
                            required: true,
                            message: '请输入验证码'
                        },
                        {
                            pattern: /^\d{6}$/,
                            message: '验证码格式错误'
                        }
                    ]
                },

            }
        },
        computed: {},
        watch: {},
        methods: {
            async onLogin() {
                this.$toast.loading({
                    message: '加载中...',
                    forbidClick: true,
                    duration: 0, // 持续时间，0表示持续展示不停止
                })
                try {
                    const {
                        data
                    } = await login(this.user)
                    // console.log(data)
                    this.$toast.success("登录成功")
                    this.$store.commit('setUser', data.data)
                    // 表示将数据data.data取名为setUser传入store中
                } catch (error) {
                    console.log('失败', error)
                    this.$toast.fail("手机号或者验证码错误")
                }

            },
            onFailed(error) {
                if (error.errors[0]) {
                    this.$toast({
                        message: error.errors[0].message, // 提示消息
                        position: 'top' // 防止手机键盘太高看不见提示消息
                    })
                }
            },

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