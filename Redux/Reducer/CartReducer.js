import {CART} from '../Action/Actiontype';

export default function CartReducer(state=[],action){
    switch(action.type){
        case CART:
            
            if(state.findIndex(item => (item.MyCart.id == action.payload.Cart.id)) != -1 && state.length > 0){
                state[state.findIndex(item => (item.MyCart.id == action.payload.Cart.id))].MyCart = action.payload.Cart;
                return(state);
            }
            // let tempObj = '';
            // state.map(item => {
            //     if(item.MyCart.id ==  action.payload.Cart.id){
            //         tempObj = item; 
            //     }
            // });
            // if(tempObj){
            //     state[state.indexOf(tempObj)].MyCart = action.payload.Cart;
            // }
            else{
                return(
                    [...state,
                         {    
                             MyCart: action.payload.Cart
                         }
                    ]
                 );
            }
            
        default :
            return state
    }
}