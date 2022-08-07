//USER needs to include username, email, thoughts, friends

const { Schema, model } = require('mongoose');


// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique:true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
    },
    thoughts: [{
      type: Schema.Types,ObjectId,
      ref: 'Thoughts'
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
    },
    id:false
  }
);

userSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;