const { validationResult } = require('express-validator');
const UserRepository = require('../repositories/userRepository');

class UsersController {
  constructor() {
    this.repository = new UserRepository();
  }

  async listUsers(req, res, next) {
    return await this.repository.list()
  }

  async createUser(req, res, next) {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({ errors: errors.array() });
    // }
    // encrypt password
    try {
      return await this.repository.create()
    } catch (e) {
      console.log(e)
      next(e)
    }
    res.json({ok:'hey'})
  }
}

module.exports = UsersController;