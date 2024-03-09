import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    domain_id : {
        type : String ,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
        trim : true,
    },
    hostel : {
        type : String,
        required : true,
    },
    room_number : {
        type : String,
        required : true,
    },
    phone_number : {
        type : String,
        required : true,
    },
    profile_picture : {
        type : String,
    },
    issue_list : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Issue',
        }
    ],
    notification : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Notification',
        }
    ],
    mess_bill : {
        type : Number,
    },
    mess_rebates : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'MessRebates',
        }
    ],
    role : {
        type : String,
        enum: ["student", "hostel_admin", "college_admin","technician"],
        required : true,
    }
})


module.exports = mongoose.model('Student', studentSchema);