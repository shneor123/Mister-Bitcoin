import contactService from '@/services/contact.service.js'

export default {
  state: {
    contacts: null,
  },
  getters: {
    contacts(state) {
      return state.contacts
    }
  },
  mutations: {
    setContacts(state, { contacts }) {
      state.contacts = contacts
    },
    removeContact(state, { id }) {
      state.contacts = state.contacts.filter((contact) => contact._id !== id)
    },
    saveContact(state, { contact }) {
      const idx = state.contacts.findIndex((currContact) => currContact._id === contact._id)
      if (idx !== -1) state.contacts.splice(idx, 1, contact)
      else state.contacts.push(contact)
    }
  },
  actions: {
    async loadContacts({ commit }) {
      const contacts = await contactService.query()
      commit({ type: 'setContacts', contacts })
    },
    async removeContact({ commit }, { id }) {
      await contactService.remove(id)
      commit({ type: 'removeContact', id })
    },
    async saveContact({ commit }, { contact }) {
      const updatedContact = await contactService.save(contact)
      commit({ type: 'saveContact', contact: updatedContact })
    }
  },
}
