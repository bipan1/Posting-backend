
import Post from '../models/post.model'
import { Request, Response } from 'express'
import User from "../models/user.model";

export default class PostController {

    post = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const userId = req.user.id;
            data.user = userId;
            const dbData = await Post.create(data);

            let postId = dbData._id
            const newUser = await User.update({_id: userId}, { $push: { posts: [postId] }})

            res.send({data : dbData, message : "Post Created Sucessfully", status : 1})
        } catch (error) {
            res.status(400).send({message : "An error occured", data : null, status : 0})
        }
    }

    get = async (req: Request, res: Response) => {
        let searchString = req.body.string
        try {
            const dbData = await Post.find({content : { $regex: searchString, $options: "i" }})
            .populate("user", 'username')
            .populate({
                path: 'comments',
                populate: [{ path: 'user' , select : 'username'}, {path : "childComments", populate : {path : "user", select : "username"}}],
              })
            res.send({data : dbData, message: "Posts Fetched Sucessfully", status : 1})
        } catch (error) {
            res.status(400).send({data : null, status : 0, message : "An Error Occured"})
        }
    }

    getOwnPosts = async (req: Request, res: Response) => {
        const userId = req.user.id;
        try {
            const dbData = await Post.find({user : userId})
            .populate("user", 'username')
            .populate("comments")
            res.send({data : dbData, message: "Posts Fetched Sucessfully", status : 1})
        } catch (error) {
            res.status(400).send({data : null, status : 0, message : "An Error Occured"})
        }
    }

    getById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params
            
            const dbData = await Post.find({_id: id})
            res.send(dbData)
        } catch (error) {
            res.status(400).send(`Error in GET posts`)
        }
    }

    deletePost = (req : Request, res : Response) => {
        let postId = req.body.postId;

        Post.findByIdAndRemove(postId)
        .then((data) => {
            res.json({
                message : "Post deleted sucessfully",
                data : data,
                status : 1
            })
        })
        .catch(error => {
            res.json({
                message : error,
                data : null,
                status : 0
            })
        }) 
    }

    updatePost = (req : Request, res : Response) => {
        let postId = req.body.postId
    
        let updateData = {
            content : req.body.content
        };
    
        Post.findByIdAndUpdate(postId, {$set : updateData})
        .then((data) => {
            res.json({
                message : "Post is updated sucessfully",
                data : data,
                status : 1
            })
        })
        .catch(error => {
            res.json({
                message : error,
                data : null,
                status : 0
            })
        })
    }

}