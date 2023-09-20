import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slice/quizSlice.ts";
import adminReducer from  "./slice/adminSlice.ts";
import resultReducer from "./slice/resultSlice.ts";

const store = configureStore({
    reducer: {
        quiz: quizReducer,
        admin: adminReducer,
        result: resultReducer
    }
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;