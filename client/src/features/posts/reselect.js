import { createDraftSafeSelector } from '@reduxjs/toolkit';

const selectSelf = (state) => state.posts;

const selectSelfColumn1 = (state) => state.column1;
const selectSelfColumn2 = (state) => state.column2;

export const withPosts = createDraftSafeSelector([selectSelf], selects => {
    return selects.filter(item => !item.isComplete);
});

export const withSelectedPostsColumn1 = createDraftSafeSelector([selectSelfColumn1], selects => {
    return selects.filter(item => item.isComplete);
});

export const withSelectedPostsColumn2 = createDraftSafeSelector([selectSelfColumn2], selects => {
    return selects.filter(item => item.isComplete);
});


//get post average rate
function getRate(item) {
    return item.rate;
}

export const getPostAver1 = createDraftSafeSelector([selectSelfColumn1], selects => {
    return selects.map(item => item.comments.map(getRate).reduce((acc, rate) => acc + rate, 0) / item.comments.length) 
});

export const getPostAver2 = createDraftSafeSelector([selectSelfColumn2], selects => {
    return selects.map(item => item.comments.map(getRate).reduce((acc, rate) => acc + rate, 0) / item.comments.length) 
});