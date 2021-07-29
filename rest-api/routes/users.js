const User = require('../models/User');
const router = require("express").Router();
const bcrypt = require('bcrypt');

const { userAuthorization } = require("../middlewares/authorization");

// get user profile router
router.get("/", userAuthorization, async (req, res) => {

    try {
        const userProf = await User.findById(req.userId);
        const { password, updateAt, ...other } = user._doc;
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

            res.status(200).json("Account has been updated");

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
                res.status(403).json("you dont follow this user");
            }
    
        } catch(err) {
            return res.status(500).json(err);
        }

    } else {
        return res.status(403).json("You can't unfollow yourself")
    }
})


module.exports = router;