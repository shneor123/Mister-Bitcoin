import userService from '@/services/user.service.js'

export default {
    state: {
        user: null
    },
    getters: {
        user(state) {
            return state.user
        }
    },
    mutations: {
        setUser(state, { user }) {
            state.user = user
        },
    },
    actions: {
        async loadUser({ commit }) {
            const user = await userService.getLoggedinUser()
            if(user) commit({ type: 'setUser' , user })
        },
        async saveUser({ commit }, { user }) {
            const savedUser = await userService.signup(user)
            commit({ type: 'setUser', user: savedUser })
        },
        async addMove({ commit }, { contact, amount }) {
            const updatedUser = await userService.addMove(contact, amount)
            commit({ type: 'setUser', user: updatedUser})
        }
    }
}