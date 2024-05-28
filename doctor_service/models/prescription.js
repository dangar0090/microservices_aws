import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Prescription = new Schema({
    doctorname: {
        type: String,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },  
    queryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    body: {
        type: String,
        required: true
    }
});

export default mongoose.model('Prescription', Prescription);