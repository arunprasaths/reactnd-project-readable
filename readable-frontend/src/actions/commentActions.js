import axios from 'axios'
import uniqid from 'uniqid'
import { ROOT_URL, AUTH_HEADERS} from '../utils/common'
import { FETCH_COMMENTS, FETCH_COMMENT, ADD_COMMENT, DELETE_COMMENT, UPDATE_COMMENT, VOTE_COMMENT } from './actionTypes'



export function fetchComments(id, callback){
    const request = axios.get(`${ROOT_URL}/posts/${id}/comments`, AUTH_HEADERS);
    return (dispatch) => {
        request.then(({data}) => {    
            callback();        
            dispatch({ type:FETCH_COMMENTS, payload: data})
        })           
    }    
}

export function fetchComment(commentId){
    const request = axios.get(`${ROOT_URL}/comments/${commentId}`, AUTH_HEADERS);
  
    return (dispatch) => {
        request.then(({data}) => {     
            dispatch({ type:FETCH_COMMENT, payload: data})
        })           
    }    
}

export function addComment(values, callback){
    const { body, author, parentId } = values;
    const data = {
            id: uniqid(),
            timestamp: Date.now(),
            parentId,
            body,
            author
    }   
    const request = axios.post(`${ROOT_URL}/comments`, data, AUTH_HEADERS)                                       

    return (dispatch) => {
        request.then(res => {               
                callback();
                dispatch({ type : ADD_COMMENT, payload: res.data });
            });            
    }
}

export function deleteComment(commentId){
    
    const request = axios.delete(`${ROOT_URL}/comments/${commentId}`, AUTH_HEADERS)

    return (dispatch) => {
         request.then(res => {  
                 dispatch({ type : DELETE_COMMENT, payload: res.data.id });
            });            
    }
}


export function updateComment(comment, callback){
     //update timestamp
    comment.timestamp = Date.now()
    const request = axios.put(`${ROOT_URL}/comments/${comment.id}`, comment, AUTH_HEADERS)                    
    
    return dispatch => {
        request.then(res => {
                callback();
                dispatch({ type : UPDATE_COMMENT, payload: res.data });
            });            
    }  
}

export function voteComment(id, voteType){
    let voteData = {"option": voteType}
    const request = axios.post(`${ROOT_URL}/comments/${id}`,voteData, AUTH_HEADERS)

    return dispatch => {
        request.then(({data}) => {
            dispatch({ type: VOTE_COMMENT, payload: data})
        })
    }
}
