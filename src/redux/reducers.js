import { SET_WEATHER_DATA, SET_GRADIENT, SET_ISCEL } from "./actions";

const initialState = {
    gradient: ['#fff', '#fff'],
    isCel: true,
    weatherData: {},
}

function homeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_WEATHER_DATA:
            return { ...state, weatherData: action.payload };

        case SET_GRADIENT:
            return { ...state, gradient: action.payload };

        case SET_ISCEL:
            return { ...state, isCel: action.payload };

        default:
            return state
    }
}

export default homeReducer;