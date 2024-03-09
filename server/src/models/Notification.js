import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    issue_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Issue',
        required : true,
        unique : true,
    },
    student_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student',
        required : true,
    },
    sent_at : {
        type : Date,
        required : true,
        default : Date.now,
    },
    hostel_admin_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'HostelAdmin',
    },
    college_admin_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'CollegeAdmin',
    }

},{timestamps : true});