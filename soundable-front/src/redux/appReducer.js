const initialState = {
    authors: []
}

export const ActionTypes =
{
    SET_AUTHORS: 'SET_AUTHORS',
    NEW_AUTHOR: 'NEW_AUTHOR',
    DELETE_AUTHOR: 'DELETE_AUTHOR',
    EDIT_AUTHOR: 'EDIT_AUTHOR'
}

export const ActionCreators = 
{
    setAuthors: payload => ({type: ActionTypes.SET_AUTHORS, payload}),
    newAuthor: payload =>({type: ActionTypes.NEW_AUTHOR, payload}),
    deleteAuthor: payload => ({type: ActionTypes.DELETE_AUTHOR, payload}),
    editAuthor: payload => ({type: ActionTypes.EDIT_AUTHOR, payload})
}

export default function authorsReducer(state=initialState, action)
{
    switch(action.type)
    {
        case ActionTypes.SET_AUTHORS:
            return {...state, authors: [...action.payload]};
        case ActionTypes.NEW_AUTHOR:
            return { ...state, authors: [...state.authors, action.payload] }
        case ActionTypes.DELETE_AUTHOR:
            for(let i = 0; i < state.authors.length; i++)
            {
                if(state.authors[i].nickname===action.payload.nickname)
                {
                    state.authors.splice(i, 1);
                    break;
                }
            }
            return {...state, authors: [...state.authors]};
        case ActionTypes.EDIT_AUTHOR:
            for(let i = 0; i < state.authors.length; i++)
            {
                if(state.authors[i].nickname===action.payload.nickname)
                {
                    state.authors[i].ages = action.payload.ages;
                }
            }
            return {...state, authors: [...state.authors]};
        default:
            return state;
    }
}