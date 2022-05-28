import {Search} from './Actiontype';

export function Token(tkn){
    console.log('this is hamza')
    return{
    type:LoginToken,
        payload:{
            login:tkn,
        }
    }
}

