import { Request, Response } from 'express'
// import CommentI from "../interfaces/comment.interface";
import Profile from "../models/profile.model";

interface IUpdateData {
    name : string;
    phoneNo : string;
    address : string;
    user : string;
    picture?: any;
}
export default class profileController {
    createProfile = async(req : Request, res : Response) => {
        let profile = new Profile({
            name : req.body.name,
            phoneNo : req.body.phoneNo,
            address : req.body.address,
            user : req.user.id
        })
        if(req.file){
            profile.picture = req.file.path;
        }
        profile.save()
        .then(response => {
            res.json({
                data : response,
                message : "Profile Saved Sucessfully",
                status : 1
            })
        })
        .catch(error => {
            res.json({
                data : null,
                message : "An Error Occured",
                status : 0
            })
        })
    }

    getProfile = async(req : Request, res : Response) => {
        const id = req.user.id
        try {
            const dbData = await Profile.find({user: id})
            res.send({data : dbData, message : "Data recieved sucessfully", status : 1})
        } catch (error) {
            res.status(400).send({message : "Error retrieving data", data : null, status : 0})
        }
    }

    updateProfile = async(req : Request, res : Response) => {
        const profileId = req.body.profileId
        let updateData : IUpdateData = {
            name : req.body.name,
            phoneNo : req.body.phoneNo,
            address : req.body.address,
            user : req.user.id,
        }
        if(req.file){
            updateData.picture = req.file.path;
        }
        try {
            let dbData;
            if(req.file){
                dbData = await Profile.findByIdAndUpdate(profileId, {$set : updateData}, {new : true})
            } else {
                console.log(profileId)
                dbData = await Profile.findByIdAndUpdate(profileId, {name : req.body.name, address : req.body.address, phoneNo : req.body.phoneNo}, {new : true})
            }
            
            res.send({data : dbData, message : "Data recieved sucessfully", status : 1})
        } catch (error) {
            res.status(400).send({message : "Error retrieving data", data : null, status : 0})
        }
    }
}