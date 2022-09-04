const { Schema, model, Types } = require('mongoose');
const moment = require('moment');
const reactionSchema = require ("./Reaction")


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
      get: createdAtVal => moment(createdAtVal).format('MMMM DD, YYYY [,] hh:mm a')
    },
    username: [{
      type: String,
      required: true,
    }],
    reactions: [
      reactionSchema
    ]
  },
  {
    toJSON: {
      virtuals:true,
      getters: true,
    },
    id:false
  }
);


//Reaction count
thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;