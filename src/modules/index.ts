import { combineReducers } from "redux";
import auth from "./auth";
import menu from "./menu";

const rootReducer = combineReducers({ auth, menu });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
