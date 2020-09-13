import * as mongoose from 'mongoose';

const ChildCommentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true
    },
    parentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'comments'
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
}, {
    timestamps: true
})

const ChildComment = mongoose.model("childComments", ChildCommentSchema)

export default ChildComment;