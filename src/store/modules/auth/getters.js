export default {
    userId(state) {
        return state.userId
    },
    token(state) {
        return state.token
    },
    isAuthenticated(state) {
        // 如果存在Token，则表示已authed
        // !! 转为值为Boolean
        return !!state.token
    },
    didLogout(state) {
        return state.didAutoLogout;
    }

}