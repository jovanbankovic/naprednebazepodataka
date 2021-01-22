const initialState = {
    awards: []
}

export const ActionTypes =
{
    SET_AWARDS: 'SET_AWARDS',
    NEW_AWARD: 'NEW_AWARD',
    DELETE_AWARD: 'DELETE_AWARD',
    EDIT_AWARD: 'EDIT_AWARD'
}

export const ActionCreators = 
{
    setAwards: payload => ({type: ActionTypes.SET_AWARDS, payload}),
    newAward: payload =>({type: ActionTypes.NEW_AWARD, payload}),
    deleteAward: payload => ({type: ActionTypes.DELETE_AWARD, payload}),
    editAward: payload => ({type: ActionTypes.EDIT_AWARD, payload})
}

export default function awardsReducer(state=initialState, action)
{
    switch(action.type)
    {
        case ActionTypes.SET_AWARDS:
            return {...state, awards: [...action.payload]};
        case ActionTypes.NEW_AWARD:
            return { ...state, awards: [...state.awards, action.payload] }
        case ActionTypes.DELETE_AWARD:
            for(let i = 0; i < state.awards.length; i++)
            {
                if(state.awards[i].name===action.payload.name)
                {
                    state.awards.splice(i, 1);
                    break;
                }
            }
            return {...state, awards: [...state.awards]};
        case ActionTypes.EDIT_AWARD:
            for(let i = 0; i < state.awards.length; i++)
            {
                if(state.awards[i].name===action.payload.name)
                {
                }
            }
            return {...state, awards: [...state.awards]};     
        default:
            return state;
    }
}