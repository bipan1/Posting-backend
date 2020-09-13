import User from "../models/user.model";
import { Request, Response } from 'express';
// import UserI from "../interfaces/user.interface";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export default class AuthController {

    register = (req : Request, res : Response) => {
        bcrypt.hash(req.body.password, 10, function(err, hashedpass){
            if(err){
                res.json({
                    message : err
                })
            }
            let user = new User({
                username : req.body.username,
                email : req.body.password,
                password : hashedpass,
            })
            user.save()
            .then(user => {
                res.json({
                    message : "User created Sucessfully",
                    data : user,
                    status : 1
                })
            })
            .catch(err => {
                res.json({
                    message : err,
                    data : null,
                    status : 0
                })
            })
        })
    }

    login = (req : Request, res : Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({$or : [{email : username}, {username : username}]})
        .then(user => {
            if(user) {
                bcrypt.compare(password, user.password, function(err, result){
                    if(err){
                        res.json({
                            data : null,
                            status : 0,
                            message : err
                        })
                    }
                    if(result){
                        let token = jwt.sign({name : user.username, id : user.id}, "verySecretKey", {expiresIn : "1h"});
                        res.json({
                            data : token, 
                            message : 'Login Sucessful',
                            status : 1
                        })
                    } else {
                        res.json({
                            data : null, 
                            message : 'Password doesnot match',
                            status : true
                        })
                    }
                })
            } else {
                res.json({
                    data : null,
                    status : false,
                    message : "User not found"
                })
            }
        })
    }
}