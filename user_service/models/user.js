import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
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
    },
    queries: {
        type: Array,
    }
});

export default mongoose.model('User', User);