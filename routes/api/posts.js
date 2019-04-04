const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const Profile = require("../../models/Profile");

const validatePostInput = require("../../validation/post");

// @route GET api/posts/test
// @desc tests Posts route
// Access Public
router.get("/test", (req, res) =>
  res.json({ message: "Posts endpoint works" })
);
// @route GET api/posts
// @desc gets posts
// Access public
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No posts found" }));
});

// @route GET api/posts/:id
// @desc gets post by id
// Access public
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ nopostfound: "No post found ..check the id" })
    );
});

// @route POST api/posts
// @desc create post
// Access Pivate

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id
// @desc delete post by id
// Access Pivate

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id).then(post => {
      //Check post owner
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: "User not authorised" });
      }
      //delete post
      post
        .remove()
        .then(() => {
          res.json({ Success: "Post Deleted" });
        })
        .catch(err => res.status(404).json({ postnotfound: "No post found" }));
    });
  }
);

// @route POST api/posts/like/:id
// @desc like a post by  usig post id
// Access Pivate

router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length > 0
        ) {
          return res
            .status(400)
            .json({ alreadyliked: "User already liked this post" });
        }
        //add user id to likes array
        post.likes.unshift({ user: req.user.id });
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route POST api/posts/unlike/:postId
// @desc unlike a post by  usig post id
// Access Pivate

router.post(
  "/unlike/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        if (
          post.likes.filter(like => like.user.toString() === req.user.id)
            .length === 0
        ) {
          return res.status(400).json({ notliked: "User not liked this post" });
        }
        //remove user id from likes array
        //get remove index
        const removeIndex = post.likes
          .map(item => item.user.toString())
          .indexOf(req.user.id);

        //splice out of array
        post.likes.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

// @route POST api/posts/comment/:postId
// @desc make a comment
// Access Pivate

router.post(
  "/comment/:postId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      // if any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.postId)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //add to comment array
        post.comments.unshift(newComment);

        //save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

// @route DELETE api/posts/uncomment/:postId/:commentId
// @desc remove a comment
// Access Pivate

router.delete(
  "/comment/:postId/:commentId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Post.findById(req.params.postId)
      .then(post => {
        //check if comment exists

        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.commentId
          ).length === 0
        ) {
          return res.status(404).json({ commentnotfound: "Comment not found" });
        }
        //get remove index

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.commentId);

        post.comments.splice(removeIndex, 1);
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: "Post not found" }));
  }
);

module.exports = router;
