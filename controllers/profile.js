const cloudinary = require("../middleware/cloudinary");
const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
  changeInfo: async (req, res) => {
    try {
      // console.log(req.user)
        // console.log(cloudinary.uploader.upload)
        // const result = await cloudinary.uploader.upload(req.file.path);
        // let user = await User.find({ _id: req.params.user });
        // let motto = await User.find({ _id: req.params.motto });
        // const user = await User.findById(req.params.id).lean()
        // const user = await User.findById(req.params.id).lean()
      // IF INPUT IS EMPTY DON"T CHANGE
      console.log(req.params.id)
      console.log(req.user.id)
      await User.findOneAndUpdate(
        { _id: req.params.id },
        {
          userName: req.body.userName,
          motto: req.body.motto,
          // user: req.user.id,
        // profilePicture: result.secure_url, 
        // cloudinaryId: result.public_id,
        }
      ).lean();
      console.log(`Changed ${req.user.email} Info`);
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
  getUserProfile: async (req, res) => { 
    console.log(req.user)
    try {
      //Since we have a session each request (req) contains the logged-in users info: req.user
      //console.log(req.user) to see everything
      //Grabbing just the posts of the logged-in user
      const posts = await Post.find({ user: req.user.id });
      //Sending post data from mongodb and user data to ejs template
      //collection : variable aka posts: posts
      res.render("profile.ejs", { posts: posts, user: req.user });
    } catch (err) {
      console.log(err);
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