const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

//{id: 1, follow: false, company: "name", logo:"https://thumbs.dreamstime.com/b/business-company-logo-27438246.jpg", location:"USA", title:"JavaScript", description:"Great Front-End Work Hey Hey hghjgjhgjhgjhgjhgjhvnbvnbv,bbn v", url:"url", company_url:"company url", created_at:"30.06.2021", how_to_apply:"how to apply"},
//{id: 2, follow: true, company: "name", logo:"https://www.logodesign.net/logo/abstract-cuboid-building-4519ld.png", location:"USA", title:"JavaScript", description:"Great Front-End Work", url:"url", company_url:"company url", created_at:"30.06.2021", how_to_apply:"how to apply"}

const initialState = {
    users: [],
};

export const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userId) {
                        return {...user, follow: true}
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((user) => {
                    if(user.id === action.userId) {
                        return {...user, follow: false}
                    }
                    return user;
                })
            };
        case SET_USERS: 
            return {
                ...state, 
                users: [...state.users, ...action.users]
            };
        default:
            return state;
    }
}


export const followActionCreator = (userId) => ({ type: FOLLOW, userId });
export const unfollowActionCreator = (userId) => ({ type: UNFOLLOW, userId });
export const setUsersActionCreator = (users) => ({ type: SET_USERS, users});

export default usersReducer;

