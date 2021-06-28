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
    try {
      const newUser = await this.repository.create(req.body)
      res.json(newUser);
    } catch (e) {
      next(e)
    }
  }
}

module.exports = UsersController;