import mongoose from 'mongoose';
import { Password } from '../services/password';

interface UserAttrs {      // for TS
  email: string,
  password: string
}

// An interface that describes the properties that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  updatedAt: string;
}

const userSchema = new mongoose.Schema({       // specific to mongoose, not for TS
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
},
{
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;          // rename _id to id
      delete ret._id;
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.pre('save', async function(done) {   // mongoose doesn't support async way, only support old way call back function, so we get this done argument and call done() at end.
  if (this.isModified('password')) {      // only attemplt hash password when it's modified, not when email is modified.
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();    // all done async work we need do
});

// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };
userSchema.statics.build = (attrs: UserAttrs) => {        // User.build({}) still not working, need give TS information
  return new User(attrs);
};
// const User = mongoose.model('User', userSchema);
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

// const theUser = User.build({    // return userDoc
//   email: 'test@test.com',  
//   password: 'aslegw',
//   updatedAt: '2022/02/02'      // not allowed
// });
// theUser.email
// theUser.password
// theUser.updatedAt     // allowed here

export { User };
