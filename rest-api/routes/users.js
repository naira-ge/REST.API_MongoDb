const User = require('../models/User');
const router = require("express").Router();
const bcrypt = require('bcrypt');

const {insertUser, getUserByEmail, getUserById, updatePassword, storeUserRefreshJWT, verifyUser} = require("../models/User.model");
const { userAuthorization } = require("../middlewares/authorization");


// get user profile autorization
/*router.get("/", userAuthorization, async (req, res) => {
    const _id = req.userId;
	const userProf = await User.findById(_id);
	const { name, email } = userProf;
	res.json({
		user: {
			_id,
			name,
			email,
		},
	});
});*/


//get a  user with query
router.get("/", async(req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;

    try {
        const user = userId 
        ? await User.findById(userId) 
        : await User.findOne({ username: username });

        console.log(userId, username, "user", user)

        const {password, updateAt, ...other} = user._doc;
        res.status(200).json(other);
    } catch(err) {
        return res.status(500).json(err);
    }
});

//update user
router.patch("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {
        if(req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);

            } catch(err) {
                return res.status(500).json(err);
            }
        }

        try {
            const user = await User.findByIdAndUpdate(req.body.userId, {
            $set: req.body,
            });

            const {password, updateAt, ...other} = user._doc;
            res.status(200).json(other);

        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can update only your account!");
    }
});

//delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin) {

        try {
            const user = await User.findByIdAndDelete(req.body.userId);
            
            res.status(200).json("Account has been deleted");

        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

//follow a user
router.patch("/:id/follow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({ 
                    $push: {followers: req.body.userId} 
                });
                await currentUser.updateOne({ 
                    $push: {following: req.params.id} 
                });
                res.status(200).json("user has been followed");

            } else {
                res.status(403).json("you allready follow");
            }
    
        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can't follow yourself")
    }
})

//unfollow a user
router.patch("/:id/unfollow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({ 
                    $pull: {followers: req.body.userId} 
                });
                await currentUser.updateOne({ 
                    $pull: {following: req.params.id} 
                });
                res.status(200).json("user has been unfollowed");

            } else {
                res.status(403).json("you don't follow this user");
            }
    
        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can't unfollow yourself")
    }
})


module.exports = router;