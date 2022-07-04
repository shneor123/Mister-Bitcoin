'use strict'

import { utils } from './utils.service.js'
import { DbService } from './db-service.js'

const KEY = 'contacts'

export default {
  query,
  get,
  remove,
  save,
  getEmptyContact,
}

async function query() {
  let contacts = await DbService.query(KEY)
  if (!contacts || !contacts.length) {
    contacts = _createDefaultContacts()
    await DbService.insert(KEY, contacts)
  }
  return contacts
}

async function get(id) {
  const contact = await DbService.get(KEY, id)
  if (!contact) {
    throw new Error('Unknown Contact')
  }
  return contact
}

function remove(id) {
  return DbService.delete(KEY, id)
}

function save(contact) {
  if (contact._id) return DbService.put(KEY, contact)
  else {
    contact.imgUrl = `https://robohash.org/${contact.name}`
    return DbService.post(KEY, contact)
  }
}

function getEmptyContact() {
  return {
    "name": '',
    "email": '',
    "phone": '',
    "imgUrl": ''
  }
}

function _createDefaultContacts() {
  return [
    _createContact("Ochoa Hyde", "ochoahyde@renovize.com", "+1 (968) 593-3824"),
    _createContact("Hallie Mclean", "halliemclean@renovize.com", "+1 (948) 464-2888"),
    _createContact("Parsons Norris", "parsonsnorris@renovize.com", "+1 (958) 502-3495"),
    _createContact("Rachel Lowe", "rachellowe@renovize.com", "+1 (911) 475-2312"),
    _createContact("Dominique Soto", "dominiquesoto@renovize.com", "+1 (807) 551-3258"),
    _createContact("Shana Pope", "shanapope@renovize.com", "+1 (970) 527-3082"),
    _createContact("Faulkner Flores", "faulknerflores@renovize.com", "+1 (952) 501-2678")
]
}

function _createContact(name, email, phone) {
  return {
    "_id": utils.getRandomId,
    name,
    email,
    phone,
    imgUrl: `https://robohash.org/${name}`
  }
}
