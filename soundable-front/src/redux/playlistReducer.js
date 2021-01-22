const initialState = {
    playlists: []
}

export const ActionTypes =
{
    SET_PLAYLISTS: 'SET_PLAYLISTS'
}

export const ActionCreators = 
{
    setPlaylists: payload => ({type: ActionTypes.SET_PLAYLISTS, payload})
}

export default function playlistReducer(state=initialState, action)
{
    switch(action.type)
    {
        case ActionTypes.SET_PLAYLISTS:
            return {...state, playlists: [...action.payload]};
        default:
            return state;
    }
}