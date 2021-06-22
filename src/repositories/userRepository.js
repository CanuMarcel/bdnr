const User = require('./userSchema');
const mongoose = require('mongoose');

class UserRepository {

  async list() {
    return await User.find({}); 
  }

  async create() {
    const newUser = new User({name:'alex'})
    return await newUser.save();
  }
}

module.exports = UserRepository;