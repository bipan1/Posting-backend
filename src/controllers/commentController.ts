import Comment from "../models/comment.model";
import { Request, Response } from 'express'
import CommentI from "../interfaces/comment.interface";
import Post from "../models/post.model";
import ChildComment from "../models/childComment.model";


export default class CommentController {

    saveComment = async (req: Request, res: Response) => {
        try {
            const data = req.body
            const { postId } = data
            const userId = req.user.id;
            const comment: CommentI = data
            const c: CommentI = {
                text: comment.text,
                user : userId,
            }
            
            const dbData = await Comment.create(c)
            const commentId = dbData._id
            const newPost = await Post.update({_id: req.body.postId}, { $push: { comments: [commentId] } })
            const out = {
                newPost,
                dbData
            }
            res.send({data : out, message : "Commented Sucessfully", status : 1})
        } catch (error) {
            console.log(error.message)
            res.send({data : null, message : "Couldn't comment", status : 0})
        }
    }

    saveChildComment = async (req: Request, res: Response) => {
        try {
            const userId = req.user.id;
            const data = {
                user : userId,
                parentId : req.body.parentId,
                text : req.body.childComment
            };

            const dbData = await ChildComment.create(data);
            const childCommentId = dbData._id;
            const newComment = await Comment.update({_id: req.body.parentId}, { $push: { childComments: [childCommentId] } })

            res.send({data : dbData, message : "Commented Sucessfully", status : 1})
        }
        catch {
            res.send({data : null, message : "Couldn't comment", status : 0})
        }
    }

    getChildComments = async (req: Request, res: Response) => {
        try{
            const parentId = req.body.parentId;

            const dbData = await ChildComment.find({parentId : parentId}).populate("user",  "username");
            res.send({data : dbData, message : "Fetched Sucessfully", status : 1})
        } catch {
            res.send({data : null, message : "Couldn't Fetch Nested Comments", status : 0})
        }
    }
    
}