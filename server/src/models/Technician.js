import mongoose from 'mongoose';

const technicianSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    password : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    phone_number : {
        type : String,
        required : true,
    },
    profile_picture : {
        type : String,
    },
    Address : {
        type : String,
    },
    category :{
        type : String,
        enum: ["electrician", "plumber","carpentry","internet_service","laundry","mason","mess_staff","sweeper"],
        required : true,
    },
    issue_list : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Issue',
        }
    ],
})

module.exports = mongoose.model('Technician', technicianSchema);