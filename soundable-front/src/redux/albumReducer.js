const initialState = {
    albums: []
}

export const ActionTypes =
{
    SET_ALBUMS: 'SET_ALBUMS',
    NEW_ALBUM: 'NEW_ALBUM',
    DELETE_ALBUM: 'DELETE_ALBUM',
    EDIT_ALBUM: 'EDIT_ALBUM'
}

export const ActionCreators = 
{
    setAlbums: payload => ({type: ActionTypes.SET_ALBUMS, payload}),
    newAlbum: payload =>({type: ActionTypes.NEW_ALBUM, payload}),
    deleteAlbum: payload => ({type: ActionTypes.DELETE_ALBUM, payload}),
    editAlbum: payload => ({type: ActionTypes.EDIT_ALBUM, payload})
}

export default function albumReducer(state=initialState, action)
{
    switch(action.type)
    {
        case ActionTypes.SET_ALBUMS:
            return {...state, albums: [...action.payload]};
        case ActionTypes.NEW_ALBUM:
            return { ...state, albums: [...state.albums, action.payload] }
        case ActionTypes.DELETE_ALBUM:
            for(let i = 0; i < state.albums.length; i++)
            {
                if(state.albums[i].name===action.payload.name)
                {
                    state.albums.splice(i, 1);
                    break;
                }
            }
            return {...state, albums: [...state.albums]};
        case ActionTypes.EDIT_ALBUM:
            for(let i = 0; i < state.albums.length; i++)
            {
                if(state.albums[i].name===action.payload.name)
                {
                    state.albums[i].price = action.payload.price;
                }
            }
            return {...state, albums: [...state.albums]};            
        default:
            return state;
    }
}