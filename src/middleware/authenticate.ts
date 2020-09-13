import * as jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, "verySecretKey");

        req.user= decode;
        next();
    }

    catch(error){
        res.json({
            message : "Token is not valid",
            data : null,
            status : false
        })
    }
}

export default authenticate;