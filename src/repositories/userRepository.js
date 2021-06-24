const User = require('./userSchema');
class UserRepository {

  async list() {
    let users = await User.find({}).select("-password"); 
    return users;
  }

  async create(user) {
    const newUser = new User(user)
    await newUser.save();
    const ret = {...newUser._doc}
    delete ret.password
    return ret;
  }
}

module.exports = UserRepository;