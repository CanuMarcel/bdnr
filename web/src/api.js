import axios from 'axios'

class API {
  constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:8000',
            headers: { 'Content-Type': 'application/json' },
        })
  }
  async getActivities(userId){
      return await this.instance.get(`activities/${userId}`)
  }
  async getUsers() {
      return await this.instance.get(`users`)
  }

  async createUser(data) {
    return await this.instance.post(
        `users`,
        data,
    )
  }
}

export const api = new API()