import { defineStore } from 'pinia'
import { usersKey } from '../utils/constants'

const users = JSON.parse(localStorage.getItem(usersKey)) || []

export const useUserStore = defineStore('user', {
  state: {
    users
  },
  actions: {
    async authenticate(username, password) {
      const user = users.find((x) => x.username === username && x.password === password)
      if (!user) {
        throw new Error('Username or password is incorrect')
      }
      return user
    },
    async register(username, password) {
      if (users.find((x) => x.username === username)) {
        throw new Error(`Username "${username}" is already taken`)
      }
      const newUser = { username, password, id: users.length + 1 }
      users.push(newUser)
      localStorage.setItem(usersKey, JSON.stringify(users))
    }
  }
})
