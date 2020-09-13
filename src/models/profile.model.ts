import * as mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    phoneNo : {
        type: String,
    },
    address : {
        type: String,
    },
    picture : {
        type : String
    },
    user :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        unique : true
    }
}, {
    timestamps: true
})

const Profile = mongoose.model("profiles", profileSchema)

export default Profile;