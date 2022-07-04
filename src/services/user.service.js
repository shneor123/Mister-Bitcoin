'use strict'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export default {
  getEmptyUser,
  getLoggedinUser,
  signup,
  logout,
  addMove
}

function getEmptyUser() {
  return {
    name: '',
    coins: 100,
    moves: [],
  }
}

function getLoggedinUser() {
  const user = sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)
  if (!user) return null
  return JSON.parse(user)
}

function signup(user) {
  _setLoggedinUser(user)
  return Promise.resolve(user)
}

function logout() {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, null)
  return Promise.resolve()
}

function _setLoggedinUser(user) {
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
}

async function addMove(contact, amount) {
  const loggedinUser = getLoggedinUser()
  if(loggedinUser.coins - amount < 0) return Promise.reject('You dont have enough money to make the transfer')
  if(amount <= 0) return Promise.reject('The transfer amount can not be negative')
  const move = _createMove(contact, amount)
  loggedinUser.moves.unshift(move)
  loggedinUser.coins -= amount 
  _setLoggedinUser(loggedinUser)
  return Promise.resolve(loggedinUser)
}

function _createMove(contact, amount) {
  return {
    toId: contact._id,
    to: contact.name,
    at: Date.now(), 
    amount
  }
}
