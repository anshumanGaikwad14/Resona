require("dotenv").config();

const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

// PRISMIC
const prismic = require("@prismicio/client");

const client = prismic.createClient(process.env.PRISMIC_REPOSITORY_NAME, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});

// EXPRESS

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.render("pages/home");
});

app.get("/gallery", (req, res) => {
  res.render("pages/gallery");
});

app.get("/about", async (req, res) => {
  try {
    const [meta, about] = await Promise.all([
      client.getSingle("meta"),
      client.getSingle("about"),
    ]);

    console.log(meta, about, "✅✅");

    res.render("pages/about", {
      meta,
      about,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/collections", (req, res) => {
  res.render("pages/collections");
});

app.get("/detail:id", (req, res) => {
  res.render("pages/detail");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
