const UPDATE_NEW_COMMENT_BODY = 'UPDATE_NEW_COMMENT_BODY';
const SEND_COMMENT = 'SEND_COMMENT';

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const initialState = {
    posts: [
        {id: 1, info: 'Good job', comments: {
            commentId_1: { comment: 'Yey', raiting: 7},
            commentId_2: {comment: 'Hey...', raiting: 5},
        }},
        {id: 2, info: 'Good job', comments: [
            {comment_id: 1, comment: 'Great job!', raiting: 5},
        ]},
        {id: 3, info: 'React cool', comments: [
            {comment_id: 1, comment: 'Learn React', raiting: 7},
        ]},
        {id: 4, info: 'Great job', comments: [
            {comment_id: 1, comment: 'Wow', raiting: 8},
        ]},
    ],
    newPostBody: "",
    newCommentBody: "",
};

export const postsReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                newPostBody: action.body,
            };
        case UPDATE_NEW_POST_TEXT:
            let postBody = state.newPostBody;
            return {
                ...state,
                newPostBody: '', 
                posts: [
                    ...state.posts,
                    {id: 9, posts: postBody}
                ]
            };
        case UPDATE_NEW_COMMENT_BODY:
            return {
                ...state,
                newCommentBody: action.body,
            };
        case SEND_COMMENT:
            let commentBody = state.newCommentBody;
            return {
                ...state,
                newCommentBody: '', 
                posts: [
                    ...state.posts,
                   state.posts.comments, 
                  {comment_id: 9, comments:commentBody}
                ]
            };
        default:
            return state;
    }
}

export default postsReducer;

export const addPostActionCreator = () => ({ type: ADD_POST});
export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text})

export const sendCommentCreator = () => ({ type: SEND_COMMENT})
export const updateNewCommentBodyCreator = (body) => (
    { type: UPDATE_NEW_COMMENT_BODY, body: body}
    )
