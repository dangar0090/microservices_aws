import mongoose from "mongoose";
import user from "./user";

const Schema = mongoose.Schema;

let Query = new Schema({
    username: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    prescriptions: {
        type: Array,
    }
});

export default mongoose.model('Query', Query);