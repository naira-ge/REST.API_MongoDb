import { v1 as uuid } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userPosts: [],
    isLoading: false,
    error: '',
    savePosts: [],
    page: 1, 
};


const postsSlice = createSlice({
    name:'posts',
    initialState: initialState,
    reducers: {
        getPostsPending: (state) => {
            state.isLoading = true;
        },
        getPostsSuccess: (state, { payload }) => {
            state.userPosts = payload;
            state.isLoading = false;
            state.error = '';
        },
        getPostsFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },

        createPostPending: (state) => {
            state.isLoading = true;
        },

        createPostSuccess: {

            reducer: (state, {payload}) => {
                state.userPosts = state.userPosts.push(payload);
                state.isLoading = false;
                state.error = '';
            },

            prepare: ({ userId, desc }) => ({
                payload: {
                    like:[],
                    _id:uuid(),
                    userId: userId,
                    desc: desc,
                    img: "",
                }
            }),
        },

        createPostFail: (state, { payload }) => {
            state.isLoading = false;
            state.error = payload;
        },
        
        createComment: {
            reducer: (state, {payload}) => {
                const postComment = state.userPosts.find(post => post.id === payload.id);
                
                if(postComment) {
                    return state.userPosts[payload.postIndex].comments.push(payload);
                }
            },
            prepare: ({ text, id, postIndex }) => ({
                payload: {
                        comment_id:uuid(),
                        text, 
                        rate:1,
                }
            }),
            },
            edit: (state, action) => {
                    const postEdit = state.userPosts.find(post => post.id === action.payload.id);
                    if(postEdit) {
                        postEdit.desc = action.payload.desc;
                    }
            },
            toggle: (state, action) => {
                    const postToggle = state.column1.find(post => post.id === action.payload.id)  
                    const postToggle2 = state.column2.find(post => post.id === action.payload.id);

            if(postToggle ) {
                postToggle.isComplete = !postToggle.isComplete;
                state.posts.push(postToggle);
            }
            if(postToggle2 ) {
                postToggle2.isComplete = !postToggle2.isComplete;
                state.posts.push(postToggle2);
            }
        },
        columnAdd: (state, action) => {
            const {id} = action.payload;
            const postAddColumn = state.posts.pop();

            if(postAddColumn) {
                postAddColumn.isComplete = !postAddColumn.isComplete;
                state[id].push(postAddColumn); 
            }
        },
        search: (state, {payload}) => {
            const searchResult = state.userPosts.filter(post => {
                return post.desc.toLowerCase.includes(payload.value) || 
                post.comments.filter(comment => {
                    return comment.text.toLowerCase.includes(payload.value)
                })
            });
            
            return state.userPosts = searchResult;
        },
        filter: (state, action) => {
            const filterPost = action.payload.direction === "asc" ?
            sortAsc(state.column1, 'desc') :
            sortDesc(state.column1, 'desc');

            return filterPost;
        },
        setPage: (state, action) => {
            state.page = action.payload
        },
    }
});


//ascending order
function sortAsc (arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) {
            return 1;
        }
        if (b[field]> a[field]) {
            return -1;
        }
        return 0;
    })
};

//descending order
function sortDesc (arr, field) {
    return arr.sort(function (a, b) {
        if (a[field] > b[field]) {
            return -1;
        }
        if (b[field]> a[field]) {
            return 1;
        }
        return 0;
    })
}

const { reducer, actions } = postsSlice;

export const {
    createComment: createCommentActionCreator, 
    completed:createCompletedActionCreator,
    notComplete:notCompleteActionCreator,
    edit: editPostActionCreator,
    search: filterBySearch,
    toggle: togglePostActionCreator,
    filter: filterActionCreator,
    setPage: setCurrentPage,
    columnAdd: columnAddActionCreator,
    getPostsPending,
    getPostsSuccess,
    getPostsFail,
    createPostPending,  
    createPostSuccess,
    createPostFail} = actions;


export default reducer;