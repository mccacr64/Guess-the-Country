const Post = require("../models/Post");
const User = require("../models/User");


module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getHome: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      // const post = await Post.findById(req.params.id);
      const scores = await User.find().sort({ survival: "desc" }).lean();
      //Sending post data from mongodb and user data to ejs template
      //collection : variable aka posts: posts
      res.render("home.ejs", { scores: scores});
    } catch (err) {
      console.log(err);
    }
  },
  getGames: (req, res) => {
    res.render("games.ejs");
  },
  // getScores: async (req, res) => {
  //   try {
  //     //id parameter comes from the post routes
  //     //router.get("/:id", ensureAuth, postsController.getPost);
  //     //http://localhost:2121/post/631a7f59a3e56acfc7da286f
  //     //id === 631a7f59a3e56acfc7da286f
  //     const score = await Post.findById(req.params.id);
  //     res.render("post.ejs", { post: post, user: req.user});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
  // likeScore: async (req, res) => {
  //   try {
  //     await Post.findOneAndUpdate(
  //       { _id: req.params.id },
  //       {
  //         $inc: { likes: 1 },
  //       }
  //     );
  //     console.log("Likes +1");
  //     res.redirect(`/post/${req.params.id}`);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // },
};
