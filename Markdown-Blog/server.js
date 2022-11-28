const express = require("express");
const app = express();
const mongoose = require("mongoose")
const articleRouter = require("./routes/articles")
const Article = require("./models/article")
const methodOverride = require("method-override")

//mongoose to hook-up with the real database
mongoose.connect("mongodb://127.0.0.1/blog", { useNewUrlParser: true, useUnifiedTopology: true });
//view engine will convert .ejs file into html file
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }))

//https://stackoverflow.com/questions/72611507/form-delete-method-is-redirecting-to-the-get-method-instead-in-express-js
app.use(methodOverride("_method"))

app.get("/", async (req, res) => {
    //res.send("Hello World")
    /*const articles = [
        {
            title: "Test Article",
            createAt: new Date(),
            description: "Test description"
        },

        {
            title: "Test Article 2",
            createAt: new Date(),
            description: "Test description 2"
        },

    ]*/
    const articles = await Article.find().sort({ createAt: "desc" })
    res.render("articles/index", { articles: articles });
})

app.use("/articles", articleRouter);

app.listen(5000);