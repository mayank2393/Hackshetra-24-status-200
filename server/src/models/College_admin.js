import mongoose from 'mongoose';

const collegeAdminSchema = new mongoose.Schema({
    domain_id : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    phone_number : {
        type : String,
        required : true,
    },
    college_name : {
        type : String,
        required : true,
    },
    notification : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Notification',
        }
    ],
    role : {
        type: String,
        enum: ["student", "hostel_admin", "college_admin", "technician"],
        required: true,
    }
});

module.exports = mongoose.model('CollegeAdmin', collegeAdminSchema);