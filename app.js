require("dotenv").config();

const logger = require("morgan");
const errorHandler = require("errorhandler");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const path = require("path");

const express = require("express");
const app = express();
const port = 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(errorHandler());

app.use(express.static(path.join(__dirname, "public")));

// PRISMIC
const prismic = require("@prismicio/client");
const { Logger } = require("concurrently");

const client = prismic.createClient(process.env.PRISMIC_REPOSITORY_NAME, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});

// EXPRESS

const handleLinkResolver = (doc) => {
  if (doc.type === "product") {
    return `/detail/${doc.slug}`;
  } else if (doc.type === "collections") {
    return "/collections";
  } else if (doc.type === "about") {
    return "/about";
  } else if (doc.type === "gallery") {
    return "/gallery";
  }
  return "/";
};

app.use((req, res, next) => {
  res.locals.Link = handleLinkResolver;
  res.locals.number = (index) => {
    return index === 0
      ? "One"
      : index === 1
        ? "Two"
        : index === 2
          ? "Three"
          : "";
  };
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const handleDefaults = async (api) => {
  const [meta, preloader, navigation] = await Promise.all([
    client.getSingle("meta"),
    client.getSingle("preloader"),
    client.getSingle("navigation"),
  ]);

  return {
    meta,
    preloader,
    navigation,
  };
};

app.get("/", async (req, res) => {
  try {
    const [home, collections, defaults] = await Promise.all([
      client.getSingle("home"),
      client.getAllByType("collection"),
      handleDefaults(),
    ]);

    console.log(home, "✅✅");

    res.render("pages/home", {
      ...defaults,
      home,
      collections,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/gallery", async (req, res) => {
  try {
    const [gallery, collections, defaults] = await Promise.all([
      client.getByType("gallery"),
      client.getAllByType("collection", {
        fetchLinks: "product.image",
      }),
      handleDefaults(),
    ]);

    collections.forEach((col) => {
      col.data.products.forEach((product) => {
        console.log(product, "💖💖");
      });
    });

    console.log(collections, "😊");

    res.render("pages/gallery", {
      ...defaults,
      gallery,
      collections,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/about", async (req, res) => {
  try {
    const [about, defaults] = await Promise.all([
      client.getSingle("about"),
      handleDefaults(),
    ]);

    console.log(about.data.body, "✅✅");

    res.render("pages/about", {
      ...defaults,
      about,
      prismic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/collections", async (req, res) => {
  try {
    const [collections, home, defaults] = await Promise.all([
      client.getAllByType("collection", {
        fetchLinks: "product.image",
      }),
      client.getSingle("home"),
      handleDefaults(),
    ]);

    console.log(collections);

    res.render("pages/collections", {
      ...defaults,
      collections,
      home,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.get("/detail/:uid", async (req, res) => {
  try {
    console.log(req.params);
    const [product, defaults] = await Promise.all([
      client.getByUID("product", req.params.uid, {
        fetchLinks: ["collection.title"],
      }),
      handleDefaults(),
    ]);

    console.log(product.data.info);

    res.render("pages/detail", {
      ...defaults,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
