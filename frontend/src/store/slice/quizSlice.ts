import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index.ts";
import axiosConfig from "../../api/axiosConfig.ts";
import {IUserAnswers} from "../../interfaces/IUserAnswer.ts";
import {IQuestion} from "../../interfaces/IQuestion.ts";

export const sendUserAnswers = createAsyncThunk<void, void, {state: RootState }>(
    "quiz/sendUserAnswers",
    async(_, {rejectWithValue}) => {
        const userData = JSON.parse(localStorage.getItem("userData")!)

        try {
            const response = await axiosConfig.post("/user", userData)

            if(response.status !== 200) {
                throw new Error("Не возможно отправить данные, повторите попытку")
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

export const fetchQuizData = createAsyncThunk(
    "quiz/fetchQuizData",
    async (_, {rejectWithValue, dispatch}): Promise<any> => {
        try {
            const response = await axiosConfig.get("/question")

            if (response.status !== 200) {
                throw new Error("Не возможно получить вопросы, повторите попытку")
            }

            dispatch(setQuizData(response.data))
            dispatch(getDataFromLocalStorage())
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

type AnswersState = {
    first_name: string,
    last_name: string,
    typewriterScore: number,
    answers: IUserAnswers[]
}

type InitialState = {
    questions_state: IQuestion[],
    answers_state: AnswersState
}

const localData = localStorage.getItem("userData")

const initialState: InitialState = {
    questions_state: [],
    answers_state: localData !== null ? JSON.parse(localData) : {
        first_name: "",
        last_name: "",
        typewriterScore: 0,
        answers: []
    }
}

const quizSlice = createSlice({
    name: "quiz",
    initialState,
    reducers: {
        setQuizData(state, action: PayloadAction<IQuestion[]>) {
            state.questions_state = []
            const sortedData = action.payload.sort((a, b) => +a.question_number - +b.question_number)
            state.questions_state.push(...sortedData)
        },
        setUserFirstName(state, action: PayloadAction<string>) {
            state.answers_state.first_name = action.payload
            setDataToLocalStorage()
        },
        setUserLastName(state, action: PayloadAction<string>) {
            state.answers_state.last_name = action.payload
            setDataToLocalStorage()
        },


        setDataToLocalStorage(state) {
            localStorage.setItem("userData", JSON.stringify(state.answers_state))
        },
        getDataFromLocalStorage(state) {
            const data = localStorage.getItem("userData")

            if(data !== null) {
                state.answers_state = JSON.parse(data)
            } else {
                state.answers_state = {
                    first_name: "",
                    last_name: "",
                    typewriterScore: 0,
                    answers: []
                }
            }
        },


        clearAnswerState(state) {
            state.answers_state.first_name = ""
            state.answers_state.last_name = ""
            state.answers_state.typewriterScore = 0
            state.answers_state.answers = []
        },
        setUserAnswers(state, action: PayloadAction<IUserAnswers>) {
            const index = state.answers_state.answers.findIndex((item) => {
                return item.question_number == action.payload.question_number
            })

            if (index != -1) {
                state.answers_state.answers.map((item) => {
                    if (item.question_number == action.payload.question_number) {
                        item.answer = action.payload.answer
                        item.correct = action.payload.correct
                    }
                })
            } else {
                state.answers_state.answers.push(action.payload)
            }

            setDataToLocalStorage()
        },
        setTypewriterScore(state, action: PayloadAction<number>) {
            state.answers_state.typewriterScore = action.payload
            setDataToLocalStorage()
        }
    },
    extraReducers: {
        // [sendUserAnswers.pending]: () => {
        //     // state.error = null
        //     console.log("Pending")
        // },
        // [sendUserAnswers.fulfilled]: () => {
        //     // state.error = null
        //     console.log("Fulfilled")
        // },
        // [sendUserAnswers.rejected]: () => {
        //     // state.errorState = action.payload
        //     console.log("Rejected")
        // }
    }
})

export const {setQuizData, setUserFirstName, setUserLastName, setDataToLocalStorage, getDataFromLocalStorage, setUserAnswers, setTypewriterScore} = quizSlice.actions

export default quizSlice.reducer








