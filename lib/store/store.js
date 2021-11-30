import { configureStore } from "@reduxjs/toolkit";
import SessionReducers from "./session";
export default configureStore({
    reducer: {
        session: SessionReducers
    }
});