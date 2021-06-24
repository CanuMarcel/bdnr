import axios from 'axios'

class API {
  constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:3000',
            headers: { 'Content-Type': 'application/json' },
        })
  }

  async getUsers() {
      return this.instance.get(`users`)
  }

  async createUser(data) {
    return this.instance.post(
        `users`,
        data,
    )
  }
}

export const api = new API()