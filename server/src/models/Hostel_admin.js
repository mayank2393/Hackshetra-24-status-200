import mongoose from 'mongoose';

const hostelAdminSchema = new mongoose.Schema({
    domain_id : {
        type : String,
        required : true,
        unique : true,
    },
    hostel : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    notification : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Notification',
        }
    ],
    phone_number : {
        type : String,
        required : true,
    },
    role : {
        type: String,
        enum: ["student", "hostel_admin", "college_admin", "technician"],
        required: true,
    }
});

module.exports = mongoose.model('HostelAdmin', hostelAdminSchema);