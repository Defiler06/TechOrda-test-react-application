import mongoose, {Schema} from "mongoose";

const QuestionSchema = new Schema({
    question_description: {
        type: String,
        required: true,
        unique: false
    },
    question_number: {
        type: String,
        required: true,
        unique: true
    },
    answers: [{
        type: Schema.Types.Mixed,
    }],
    image_url: {
        type: String,
        null: true
    }
});

const Question = mongoose.model("Question", QuestionSchema);


export default Question;