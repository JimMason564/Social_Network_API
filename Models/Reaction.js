const { Schema, Types } = require('mongoose');
const moment = require('moment');

const reactionSchema = new Schema({
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId
    },
    reactionText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default:Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMMM DD, YYYY [,] hh:mm a')
    } 
  },
  {
    toJSON: {
      getters: true,
    },
  }
)

module.exports = reactionSchema;