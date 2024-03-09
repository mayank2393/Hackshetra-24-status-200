import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    issue_id : {
        type : Number,
        required : true,
        unique : true,
        autoIncrement : true
    },
    is_public : {
        type : Boolean,
        required : true,
        default : false,
    },
    category : {
        type : String,
        required : true,
        enum: ["electrician", "plumber","carpentry","internet_service","laundry","mason","mess_staff","sweeper"]
    },
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    is_resolved : {
        type : Boolean,
        required : true,
        default : false,
    },
    location : {
        type : String,
        required : true,
    },
    notification : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Notification',
        }
    ],
    student : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Student',
        }
    ],
    technician : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Technician',
        }
    ],
    
},{timestamps : true});

module.exports = mongoose.model('Issue', issueSchema);