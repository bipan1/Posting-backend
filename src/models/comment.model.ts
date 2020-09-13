import * as mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    childComments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "childComments"
        }
    ],
}, {
    timestamps: true
})

const Comment = mongoose.model("comments", CommentSchema)

export default Comment;