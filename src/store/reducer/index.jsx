export const initialState = {
    loading: true,
    movies: [],
    errorMessage: null
};

export const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_SUCCESS":
            return {
                loading: false,
                movies: [...action.payload]
            };
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                loading: false,
                errorMessage: [...action.error]
            };
        default:
            return state;
    }
};