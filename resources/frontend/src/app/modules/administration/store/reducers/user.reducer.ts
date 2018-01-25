// import { User } from "../../models/User";
import * as fromUser from "../actions/user.action";

export interface UserState {
    // data: User,
    data: any,
    loaded: boolean,
    loading: boolean
}

export const initialState = {
    data: null,
    loaded: false,
    loading: false
}

export function reducer(
    state = initialState,
    action: fromUser.UserAction
):UserState {

    switch(action.type) {
        case fromUser.LOAD_USER:{
            return {
                ...state,
                loading: true
            }
        }
        case fromUser.LOAD_USER_SUCCESS:{
            const data = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                data
            }
        }
        case fromUser.LOAD_USER_FAIL:{
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
    }

    return state;
}

export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;
export const getUser = (state: UserState) => state.data;