import mongoose from 'mongoose';
import bcrypt from 'bcrypt'
import config from 'config'

// An interface that describes the properties
// that are required to create a new User
interface Attributes {
  email: string;
  password: string;

}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: Attributes): UserDoc
}

// An interface that describes the properties
// that a User Document Has
export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>

}



const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false,
  }

}, {
  timestamps: true
})


userSchema.pre("save", async function (next) {
  let user = this as UserDoc

  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));

  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;

  return next();
})



userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  const user = this as UserDoc

  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}


userSchema.statics.build = (attrs: Attributes) => {
  return new User(attrs)
}




const User = mongoose.model<UserDoc, UserModel>('user', userSchema)


export default User