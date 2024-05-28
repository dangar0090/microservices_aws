import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Doctor = new Schema({
    doctorname: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registrationNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    client: {
        type: String,
        required: true
    }
});

export default mongoose.model('Doctor', Doctor);