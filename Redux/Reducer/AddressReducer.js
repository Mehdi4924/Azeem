import {Address} from '../Action/Actiontype';

export default function AddressReducer(state={},action){
    switch(action.type){
        case Address:
            return(
                {
                    Mylocation:action.payload.location
                }
            )
        default :
            return state
    }
}