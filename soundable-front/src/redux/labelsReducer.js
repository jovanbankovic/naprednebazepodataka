const initialState = {
    labels: []
}

export const ActionTypes =
{
    SET_LABELS: 'SET_LABELS',
    NEW_LABEL: 'NEW_LABEL',
    EDIT_LABEL: 'EDIT_LABEL',
    DELETE_LABEL: 'DELETE_LABEL'
}

export const ActionCreators = 
{
    setLabels: payload => ({type: ActionTypes.SET_LABELS, payload}),
    newLabel: payload => ({type: ActionTypes.NEW_LABEL, payload}),
    editLabel: payload => ({type: ActionTypes.EDIT_LABEL, payload}),
    deleteLabel: payload => ({type: ActionTypes.DELETE_LABEL, payload})
}

export default function labelsReducer(state=initialState, action)
{
    switch(action.type)
    {
        case ActionTypes.SET_LABELS:
            return {...state, labels: [...action.payload]};
        case ActionTypes.NEW_LABEL:
            return { ...state, labels: [...state.labels, action.payload] }
        case ActionTypes.DELETE_LABEL:
            for(let i = 0; i < state.labels.length; i++)
            {
                if(state.labels[i].name===action.payload.name)
                {
                    state.labels.splice(i, 1);
                    break;
                }
            }
            return {...state, labels: [...state.labels]};
        case ActionTypes.EDIT_LABEL:
            for(let i = 0; i < state.labels.length; i++)
            {
                if(state.labels[i].name===action.payload.name)
                {
                    state.labels[i].name=action.payload.name;
                }
            }
            return {...state, labels: [...state.labels]};     
        default:
            return state;
    }
}