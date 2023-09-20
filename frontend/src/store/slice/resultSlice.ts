import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../index.ts";
import axiosConfig from "../../api/axiosConfig.ts";

export const getResults = createAsyncThunk<void, void, {state: RootState }>(
    "result/getResults",
    async(_, {rejectWithValue, dispatch}) => {
        try {
            const response = await axiosConfig.get("/user")

            if(response.status !== 200) {
                throw new Error("Не возможно получить данные, повторите попытку")
            } else {
                dispatch(setUserData(response.data))
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const initialState = {
    results: []
}

const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setUserData(state, action: PayloadAction<any>) {
            const sortedData = action.payload.map((item: any) => {
                if(item.answers !== undefined) {
                    item.answers.sort((a: any, b: any) => a.question_number - b.question_number)
                }

                return item
            })

            state.results = sortedData
        }
    },
    extraReducers: {
        // [sendUserAnswers.pending]: () => {
        //     // state.error = null
        //     console.log("Pending")
        // }
    }
})

export const {setUserData} = resultSlice.actions

export default resultSlice.reducer