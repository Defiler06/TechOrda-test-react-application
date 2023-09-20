import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import {RootState} from "../index.ts";
import {IQuestion} from "../../interfaces/IQuestion.ts";
import axiosConfig from "../../api/axiosConfig.ts";

export const sendQuestions = createAsyncThunk<void, void, {state: RootState }>(
    "admin/sendQuestions",
    async(_, {rejectWithValue, getState}): Promise<any> => {
        try {
            const {admin} = getState()
            const response = await axiosConfig.post("/question/AddMany", admin)

            if(response.status !== 200) {
                throw new Error("Не возможно отправить вопросы")
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

type InitialState = {
    questions: IQuestion[]
}

const initialState: InitialState = {
    questions: []
}

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        addQuestionHandler(state) {
            const questionObj = {
                question_id: nanoid(),
                question_number: "",
                question_description: "",
                image_url: "",
                answers: []
            }

            state.questions.push(questionObj)
        },
        editQuestionHandler(state, action: PayloadAction<any>) {
            state.questions.map(questionItem => {
                if (questionItem.question_id === action.payload.question_id) {
                    questionItem.question_number = action.payload.question_number
                    questionItem.question_description = action.payload.question_description
                    questionItem.image_url = action.payload.image_url
                    questionItem.answers = action.payload.answers
                }

                return questionItem
            })
        },
        deleteQuestionHandler(state, action: PayloadAction<string>) {
            state.questions = [...state.questions.filter(item => item.question_id !== action.payload)]
        },
        addAnswerHandler(state, action: PayloadAction<any>) {
            const answerObj = {
                answer_id: nanoid(),
                answer_description: "",
                answer_value: "",
                answer_correct: false
            }

            state.questions.map(item => {
                if(item.answers) {
                    if(action.payload === item.question_id) {
                        item.answers.push(answerObj)
                    }
                }

                return item
            })
        },
        editAnswerHandler(state, action: PayloadAction<any>) {
            console.log(action.payload)

            state.questions.map(questionItem => {
                if(questionItem.question_id === action.payload.questionId) {
                    return questionItem.answers?.map(answerItem => {
                        if(answerItem.answer_id === action.payload.answer.answer_id) {
                            answerItem.answer_value = action.payload.answer.answer_value
                            answerItem.answer_description = action.payload.answer.answer_description
                        }

                        return answerItem
                    })
                }

                return questionItem
            })
        },
        deleteAnswerHandler(state, action: PayloadAction<any>) {
            state.questions.map(questionItem => {
                if(questionItem.question_id === action.payload.questionId) {

                    questionItem.answers = questionItem.answers?.filter(answerItem => answerItem.answer_id !== action.payload.answerId)
                }

                return questionItem
            })
        },
        correctAnswerToggle(state, action: PayloadAction<any>) {
            state.questions.map(questionItem => {
                if(questionItem.question_id === action.payload.questionId) {
                    return questionItem.answers?.map(answerItem => {
                        if(answerItem.answer_id === action.payload.answer.answer_id) {
                            answerItem.answer_correct = !answerItem.answer_correct
                        }

                        return answerItem
                    })
                }

                return questionItem
            })
        },
        // sortQuestionsHandler(state) {
        //
        // }
    },
    extraReducers: {
        // [sendUserAnswers.pending]: () => {
        //     // state.error = null
        //     console.log("Pending")
        // },
    }
})

export const {
    addQuestionHandler,
    editQuestionHandler,
    deleteQuestionHandler,
    addAnswerHandler,
    editAnswerHandler,
    deleteAnswerHandler,
    correctAnswerToggle
} = adminSlice.actions

export default adminSlice.reducer