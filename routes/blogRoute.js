const { getAllBlogs, getABlogBySlug, createBlog, deleteBlog, updateBlog } = require("../controllers/blogController")
const requireLogin = require("../middlewares/requireLogin")

const router = require("express").Router()

router.get("/all", getAllBlogs)
router.get("/:slug", getABlogBySlug)
router.post("/", requireLogin, createBlog)
router.delete("/:slug", requireLogin, deleteBlog)
router.patch("/:slug", requireLogin, updateBlog)

module.exports = router