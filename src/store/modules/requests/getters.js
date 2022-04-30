export default {
    // filter 让每一个coach只能看到自己收到的requests
    requests(state, _, _2, rootGetters) {
        const coachId = rootGetters.userId;
        return state.requests.filter(req => req.coachId === coachId);
    },
    hasRequest(_, getters) {
        return getters.requests && getters.requests.length > 0;
    },

}; 