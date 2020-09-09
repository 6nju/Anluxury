import { ActionTypes } from './ActionTypes'

const initialState = {
    user_login: null,
    cart: null,
    yeu_thich: null,
}

export default (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case ActionTypes.SET_USER_LOGIN: {
            return {
                ...state,
                user_login: payload,
            }
        }
		case ActionTypes.SET_CART: {
            return {
                ...state,
                cart: payload,
            }
        }
		case ActionTypes.SET_YEU_THICH: {
            return {
                ...state,
                yeu_thich: payload,
            }
        }
    }

    return state
}