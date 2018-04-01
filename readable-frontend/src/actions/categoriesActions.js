import axios from 'axios'
import { ROOT_URL, AUTH_HEADERS} from '../utils/common'

import { FETCH_CATEGORIES } from './actionTypes'

export function fetchCategories(){
    const request = axios.get(`${ROOT_URL}/categories`,AUTH_HEADERS);

    return (dispatch) => {
        request.then(({data}) => {            
            dispatch({ type:FETCH_CATEGORIES, payload: data.categories})
        })           
    }    
}