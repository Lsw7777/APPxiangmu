import request from "@/request/request.js"

// 用户登录
export const login = data => {
    return request({
        method: 'POST',
        url: '/app/v1_0/authorizations',
        data
    })
}