import {IActionProps} from "./types";
import * as actionTypes from "./actionTypes";

export const initialState = {
    userInfo: null
};

export const reducer = (state: any, action: IActionProps): any => {
    switch (action.type) {
        case actionTypes.getLoginUserInfo:
            return {
                ...state,
                userInfo: action.data
            };
        default:
            throw new Error();
    }
};