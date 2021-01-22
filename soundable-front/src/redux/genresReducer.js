const initialState = {
    genres: []
}

export const ActionTypes =
{
    SET_GENRES: 'SET_GENRES',
    NEW_GENRE: 'NEW_GENRE',
    DELETE_GENRE: 'DELETE_GENRE',
    EDIT_GENRE: 'EDIT_GENRE'
}

export const ActionCreators = 
{
    setGenres: payload => ({type: ActionTypes.SET_GENRES, payload}),
    newGenre: payload =>({type: ActionTypes.NEW_GENRE, payload}),
    deleteGenre: payload => ({type: ActionTypes.DELETE_GENRE, payload}),
    editGenre: payload => ({type: ActionTypes.EDIT_GENRE, payload})
}

export default function genreReducer(state=initialState, action)
{
    switch(action.type)
    {
        case ActionTypes.SET_GENRES:
            return {...state, genres: [...action.payload]};
        case ActionTypes.NEW_GENRE:
            return { ...state, genres: [...state.genres, action.payload] }
        case ActionTypes.DELETE_GENRE:
            for(let i = 0; i < state.genres.length; i++)
            {
                if(state.genres[i].name===action.payload.name)
                {
                    state.genres.splice(i, 1);
                    break;
                }
            }
            return {...state, genres: [...state.genres]};
        case ActionTypes.EDIT_GENRE:
            for(let i = 0; i < state.genres.length; i++)
            {
                if(state.genres[i].name===action.payload.name)
                {
                    state.genres[i].name = action.payload.name;
                }
            }
            return {...state, genres: [...state.genres]};     
        default:
            return state;
    }
}