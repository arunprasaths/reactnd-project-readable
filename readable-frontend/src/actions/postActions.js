import axios from 'axios'
import uniqid from 'uniqid'
import { ROOT_URL, AUTH_HEADERS} from '../utils/common'
import { FETCH_POSTS, FETCH_POST, CREATE_POST, SAVE_POST, UPDATE_POST, DELETE_POST, VOTE_POST } from './actionTypes'

export function fetchPosts(){
    const request = axios.get(`${ROOT_URL}/posts`, AUTH_HEADERS);
    //redux thunk - returns function
    //argument - dispatch
    return (dispatch) => {
        request.then(({data}) => {
            dispatch({ type:FETCH_POSTS, payload: data})
        })           
    }    
}


export function fetchPost(id){
    const request = axios.get(`${ROOT_URL}/posts/${id}`,AUTH_HEADERS);
    
    return (dispatch) => {
        request.then(({data}) => {           
            dispatch({ type:FETCH_POST, payload: data})
        })           
    }     
}


export function createPost(){
    return (dispatch) => {
        dispatch({ type: CREATE_POST})
    }
}

export function savePost(values,callback){
    // add id and timestamp property - for new post
  
    const { title, body, author, category } = values;
    const data = {
            id: uniqid(),
            timestamp: Date.now(),
            title,
            body,
            author,
            category
    }   

    const request = axios.post(`${ROOT_URL}/posts`, data, AUTH_HEADERS)                                       

    return (dispatch) => {
        request.then(res => {               
                callback();
                dispatch({ type : SAVE_POST, payload: res.data });
            });            
    }
}

export function updatePost(post, callback){
     //update timestamp
    post.timestamp = Date.now()
    const request = axios.put(`${ROOT_URL}/posts/${post.id}`, post, AUTH_HEADERS)                    
    
    return dispatch => {
        request.then(res => {
                callback();
                dispatch({ type : UPDATE_POST, payload: res.data });
            });            
    }  
}


export function deletePost(id, callback){
    
    const request = axios.delete(`${ROOT_URL}/posts/${id}`, AUTH_HEADERS)
    
      return dispatch => {
        request.then(res => {
                callback();
                dispatch({ type : DELETE_POST, payload: id });
            });            
    }  
       
} 

export function votePost(id, voteType){
    let voteData = {"option": voteType}
    const request = axios.post(`${ROOT_URL}/posts/${id}`,voteData, AUTH_HEADERS)

    return dispatch => {
        request.then(({data}) => {
            dispatch({ type: VOTE_POST, payload: data})
        })
    }
}

