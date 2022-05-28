import {LoginToken} from '../Action/Actiontype';

export default function TokenReducer(state={},action){
    switch(action.type){
        case LoginToken:
            return(
                {
                    MyToken:action.payload.login
                }
            )
        default :
            return state
    }
}