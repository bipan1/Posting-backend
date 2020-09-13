import * as mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
}, {
    timestamps: true
})

const Post = mongoose.model("posts", postSchema)

export default Post