import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    answers: [
        {
            type: Schema.Types.Mixed,
        }
    ],
    timeStamp: {
        type: Date,
        default: Date.now
    },
    typewriterScore: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model("User", UserSchema);


export default User;