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
    } catch (error) {
      if(error.name === 'MongoError' && error.code == 11000) {
        res.status(400).json({errors: [{param: 'email', msg: 'Must be unique'}, {param: 'username', msg: 'Must be unique'}]})
      } else {
        next(error);
      }
    }
  }
}

module.exports = UsersController;