import mongoose from 'mongoose';

const mess_rebatesSchema = new mongoose.Schema({
    student_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Student',
    },
    from : {
        type : Date,
        required : true,
    },
    to : {
        type : Date,
        required : true,
    },
    reason : {
        type : String,
        required :true
    }
});
module.exports = mongoose.model('MessRebates', mess_rebatesSchema);