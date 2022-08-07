//THOUGHT  needs include thoughtText, createdAt, username, reactions

const { Schema, model } = require('mongoose');
const moment = require('moment');


// Schema to create Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createdAt: {
      type: Date,
      default:Date.now,
      get: (createdAtVal) => moment(createdAtVal).format('MMMM DD, YYYY [,] hh:mm a')
    },
    username: [{
      type: String,
      required: true,
    }],
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id:false
  }
);

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
  },
  toJSON: {
    getters: true,
  },
}

);
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reaction.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;