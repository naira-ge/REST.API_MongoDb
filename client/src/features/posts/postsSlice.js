import { v1 as uuid } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
page: 1, 
column1: [],
column2: [],
posts: [
    {
        id: uuid(),
        desc: "Learn React",
        isComplete: false,
        comments: [
            { comment_id: 1, text: 'Learn React comments 1', rate: 3 },
            { comment_id: 2, text: 'Learn React comments 2', rate: 5 },
        ]
    },
]
};


const postsSlice = createSlice({
    name:'posts',
    initialState: initialState,
    reducers: {
        createPost: {
            reducer: (state, {payload}) => {
                state.posts.push(payload);
            },
            prepare: ({ desc }) => ({
                payload: {
                    id:uuid(),
                    desc,
                    isComplete:false,
                    comments: "",
                }
            }),
        },
        createComment: {
            reducer: (state, {payload}) => {
                const postComment = state.posts.find(post => post.id === payload.id);
                
                if(postComment) {
                    return state.posts[payload.postIndex].comments.push(payload);
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
                  const postEdit = state.posts.find(post => post.id === action.payload.id);
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
            const searchResult = state.posts.filter(post => {
                return post.desc.toLowerCase.includes(payload.value) || 
                post.comments.filter(comment => {
                    return comment.text.toLowerCase.includes(payload.value)
                })
            });
            
            return state.posts = searchResult;
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


export const {
    createPost: postAdded,  
    createComment: createCommentActionCreator, 
    completed:createCompletedActionCreator,
    notComplete:notCompleteActionCreator,
    edit: editPostActionCreator,
    search: filterBySearch,
    toggle: togglePostActionCreator,
    filter: filterActionCreator,
    setPage: setCurrentPage,
    columnAdd: columnAddActionCreator} = postsSlice.actions;

export const selectPosts = (state) => state.post;


export default postsSlice.reducer;