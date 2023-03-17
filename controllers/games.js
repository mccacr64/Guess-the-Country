const User = require("../models/User");
const Score = require("../models/Score");
// const Post = require("../models/Post");

module.exports = {
    getSurvival: async (req, res) => {
        res.render("survivalMode.ejs", {user: req.user });
    },
    // threeLives: async (req, res) => {
    //     await User.findO(
    //         { _id: req.user.id },
    //         {
    //             $set:{
    //                 survivalLives: 3
    //             },
    //         },
    //     ).lean()
    // },
    getTimeTrial: (req, res) => {
        res.render("timeTrial.ejs");
    },
    getHardMode: (req, res) => {
        res.render("hardMode.ejs");
    },
    getGameOver: async (req, res) => {
        res.render("gameOver.ejs", { user: req.user});
    },
    survivalScore: async (req, res) =>{
        try{
            // const posts = await Post.find({ user: req.user.id });
            // const user = await User.findById(req.params.id).lean();
            // I want to chang USER to SCORES collection eventually
            await User.findOneAndUpdate(
                { _id: req.user.id },
                {
                    $max:{
                        survival: req.body.survivalScore,
                    },
                    $set:{
                        survivalLives: req.body.lives,
                        currentScore: req.body.survivalScore
                    },
                },
                {
                    upsert: true
                }
            ).lean();
            // How to stop refreshing?
            if(req.body.lives <= 0){
                res.redirect('/games/gameOver')
            }

            console.log(`${req.user.userName}'s Score is ${req.body.survivalScore}`);
            console.log(`${req.user.userName} has ${req.body.lives} lives remaining`)
        } catch (err){
            console.log(err)
        }
    },
};

// Post.create({
//     title: req.body.title,
//     image: result.secure_url,
//     cloudinaryId: result.public_id,
//     caption: req.body.caption,
//     likes: 0,
//     user: req.user.id,
//   });