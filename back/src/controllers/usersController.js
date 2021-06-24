const { validationResult } = require('express-validator');
const UserRepository = require('../repositories/userRepository');

class UsersController {
  constructor() {
    this.repository = new UserRepository();
  }

  async listUsers(req, res, next) {
    const users = await this.repository.list()
    res.json(users)
  }

  async createUser(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      errors.array().forEach(e => {if(e.param === 'password') delete e.value})
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const newUser = await this.repository.create(req.body)
      res.json(newUser);
    } catch (e) {
      console.log(e)
      next(e)
    }
  }
}

module.exports = UsersController;