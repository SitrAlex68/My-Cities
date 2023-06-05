const initialState = {users:[],crnt_usr:""};

function UserReducer(state=initialState,action){
    let nextState;
    switch(action.type){
        case'add_user':
            nextState = {...state,
            users: [...state.users, action.value]
        };
        return nextState;
        
        case'crnt_user':
            nextState = {...state,
            crnt_usr:action.value 
        };
        return nextState;

        default:
             return state;
    }
}

export default UserReducer;