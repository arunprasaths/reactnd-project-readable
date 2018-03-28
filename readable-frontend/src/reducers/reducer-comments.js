import { FETCH_COMMENTS,FETCH_COMMENT, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from '../actions'
import _ from 'lodash'

export default function(state = {}, action){
    switch(action.type){
        case FETCH_COMMENTS:
            return _.mapKeys(action.payload, 'id')
        case ADD_COMMENT:
        case UPDATE_COMMENT:
        case FETCH_COMMENT:
        case VOTE_COMMENT:
             return {...state, [action.payload.id]: action.payload }    
        case DELETE_COMMENT:
             return _.omit(state, action.payload)
        default:
            return state
    }
}