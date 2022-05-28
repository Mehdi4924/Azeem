import { combineReducers } from 'redux';
import AddressReducer from './AddressReducer';
import CartReducer from './CartReducer';
import ProductReducer from './ProductReducer';
import TokenReducer from './TokenReducer';

const AllReducer = combineReducers({
    Login:TokenReducer,
    Location:AddressReducer,
    Product:ProductReducer,
    CART:CartReducer
})

export default AllReducer; 


