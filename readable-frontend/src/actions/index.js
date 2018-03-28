import axios from 'axios'
import uniqid from 'uniqid'
export const FETCH_POSTS = 'fetch_posts'
export const FETCH_POST = 'fetch_post'
export const FETCH_CATEGORIES = 'fetch_categories'
export const CREATE_POST = 'create_post'
export const SAVE_POST = 'save_post'
export const UPDATE_POST = 'update_post'
export const DELETE_POST = 'delete_post'
export const FETCH_COMMENTS = 'fetch_comments'
export const FETCH_COMMENT = 'fetch_comment'
export const VOTE_POST = 'vote_post'
export const ADD_COMMENT = 'add_comment'
export const DELETE_COMMENT = 'delete_comment'
export const UPDATE_COMMENT = 'update_comment'
export const VOTE_COMMENT = 'vote_comment'

 export const AUTH_HEADERS = {headers: { 'Authorization': 'whatever-you-want'}};
 //axios.defaults.headers.common['Authorization'] = AUTH_HEADERS;

const ROOT_URL ='http://localhost:3001'

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

export function fetchCategories(){
    const request = axios.get(`${ROOT_URL}/categories`,AUTH_HEADERS);

    return (dispatch) => {
        request.then(({data}) => {            
            dispatch({ type:FETCH_CATEGORIES, payload: data.categories})
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
                 fetchPost(res.data.id.parentId)                                 
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
