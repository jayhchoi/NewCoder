const mongoose = require('mongoose')
const { Schema } = mongoose

const postSchema = new Schema({
  // Required
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // One-to-one relationship
  },
  text: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  tag: {
    type: String,
    required: true,
    default: '기타'
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      // Required
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      created: {
        type: Date,
        default: Date.now
      }
    }
  ]
})

module.exports = Post = mongoose.model('Post', postSchema)
