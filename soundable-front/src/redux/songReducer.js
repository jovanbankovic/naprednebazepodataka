const initialState = {
    songs: []
}

export const ActionTypes =
{
    SET_SONGS: 'SET_SONGS',
    NEW_SONG: 'NEW_SONG',
    EDIT_SONG: 'EDIT_SONG',
    DELETE_SONG: 'DELETE_SONG'
}

export const ActionCreators = 
{
    setSongs: payload => ({type: ActionTypes.SET_SONGS, payload}),
    newSong: payload => ({type: ActionTypes.NEW_SONG, payload}),
    editSong: payload => ({type: ActionTypes.EDIT_SONG, payload}),
    deleteSong: payload => ({type: ActionTypes.DELETE_SONG, payload})
}

export default function songReducer(state=initialState, action)
{
    switch(action.type)
    {
        case ActionTypes.SET_SONGS:
            return {...state, songs: [...action.payload]};
        case ActionTypes.NEW_SONG:
            return { ...state, songs: [...state.songs, action.payload] }
        case ActionTypes.DELETE_SONG:
            for(let i = 0; i < state.songs.length; i++)
            {
                if(state.songs[i].name===action.payload.name)
                {
                    state.songs.splice(i, 1);
                    break;
                }
            }
            return {...state, songs: [...state.songs]};
        case ActionTypes.EDIT_SONG:
            for(let i = 0; i < state.songs.length; i++)
            {
                if(state.songs[i].name===action.payload.name)
                {
                    state.songs[i].name = action.payload.name;
                }
            }
            return {...state, songs: [...state.songs]};   
        default:
            return state;
    }
}