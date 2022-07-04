import { createStore } from 'vuex'
import contactModule from '@/store/modules/contact.module.js'
import userModule from '@/store/modules/user.module.js'

const store = createStore({
  strict: true,

  modules: {
    contactModule,
    userModule
  },
})

export default store
