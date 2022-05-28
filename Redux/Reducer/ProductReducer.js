import {Products} from '../Action/Actiontype';

export default function ProductReducer(state={},action){
    switch(action.type){
        case Products:
            return(
                {
                    MyProduct:action.payload.product
                }
            )
        default :
            return state
    }
}