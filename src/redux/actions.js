export const SET_WEATHER_DATA = 'SET_WEATHER_DATA';
export const SET_GRADIENT = 'SET_GRADIENT';
export const SET_ISCEL = 'SET_ISCEL';

export const setWeatherData = weatherData => dispatch => {
    dispatch({
        type: SET_WEATHER_DATA,
        payload: weatherData
    })
}

export const setGradient = gradient => dispatch => {
    dispatch({
        type: SET_GRADIENT,
        payload: gradient
    })
}

export const setCel = isCel => dispatch => {
    dispatch({
        type: SET_ISCEL,
        payload: isCel
    })
}