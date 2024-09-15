import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true })); 

let posts = [];

//create a route to render posts in homepage. 
app.get("/", (req, res) => {
    res.render("index.ejs", {
        posts: posts,
    });
});

//create an route to render create form.
app.get("/create", (req, res) => {
    res.render("create.ejs");
});

//create an route to render aboutus page. 
app.get("/about", (req, res) => {
    res.render("aboutUs.ejs");
});


// Route to render the edit post form
app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postToEdit = posts.find((post) => post.id === postId);

    if (postToEdit) {
        res.render("editPost.ejs", { post: postToEdit });
    } else {
        res.status(404).send("Post not found");
    }
});

//create an route to handle form submission and create new post. 

app.post("/submit", (req, res) => {

    const newPost = {
        id: posts.length + 1,
        title: req.body["title"],
        content: req.body["content"],
    }

    posts.push(newPost);
    console.log(posts);
    res.redirect("/")

} );




// Route to handle edit form submission
app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    const postIndex = posts.findIndex((post) => post.id === postId);

    if (postIndex > -1) {
        // Update the post with new data from the form
        posts[postIndex].title = req.body.title;
        posts[postIndex].content = req.body.content;
        res.redirect("/");
    } else {
        res.status(404).send("Post not found");
    }
});

//create a route to handle form btndelete of post 
app.post("/delete/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    posts = posts.filter((post) => post.id !== postId);
    res.redirect("/");
});


app.listen(port, () => {
    console.log(`The server is running on port ${port}.`)
})