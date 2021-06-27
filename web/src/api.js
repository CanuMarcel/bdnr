import axios from 'axios'

class API {
  constructor() {
        this.instance = axios.create({
            baseURL: 'http://localhost:8000',
            headers: { 'Content-Type': 'application/json' },
        })
  }
  async getActivities(userId){
      return await this.instance.get(`${userId}/activities`)
  }

  async getCommentsForActivity(userId, activityId){
      return await this.instance.get(`${userId}/activities/${activityId}/comments`)
  }

  async getUsers() {
      return await this.instance.get(`users`)
  }

  async createActivity(data) {
    return await this.instance.post(
        `activities`,
        data,
    )
  }

  async createComment(userId, activityId, data) {
    return await this.instance.post(
        `${userId}/activities/${activityId}/comments`,
        data,
    )
  }

  async createPoint(userId, activityId, data) {
    return await this.instance.post(
        `${userId}/activities/${activityId}/points`,
        data,
    )
  }

  async createUser(data) {
    return await this.instance.post(
        `users`,
        data,
    )
  }

  async finishActivity(userId, activityId) {
      return await this.instance.post(
        `${userId}/activities/${activityId}/finish`,
    )
  }
}

export const api = new API()