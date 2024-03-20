const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(methodOverride("_method"));

let properties = [
  {
    id: uuidv4(),

    location: "Mumbai",
    budget: "$500 - $800",
    size: "M",
  },
  {
    id: uuidv4(),

    location: "Pune",
    budget: "$800",
    size: "S",
  },
];

app.listen(port, () => {
  console.log("listening to port : 8080");
});
app.get("/properties", (req, res) => {
  res.render("index.ejs", { properties });
});

app.get("/properties/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/properties", (req, res) => {
  let { location, budget, size } = req.body;
  let id = uuidv4();
  properties.push({
    location,
    budget,
    size,

    id,
  });
  console.log(properties);
  res.redirect("/properties");
});

app.get("/properties/:id", (req, res) => {
  let { id } = req.params;
  property = properties.find((p) => id === p.id);
  console.log(property);
  res.render("show.ejs", { property });
});

app.patch("/properties/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);

  let newLocation = req.body.location;
  let newBudget = req.body.budget;
  let newSize = req.body.size;
  let property = properties.find((p) => id === p.id);

  property.location = newLocation;
  property.budget = newBudget;
  property.size = newSize;
  console.log(property);

  res.redirect("/properties");
});

app.get("/properties/:id/edit", (req, res) => {
  let { id } = req.params;
  property = properties.find((p) => id === p.id);
  console.log(property);
  res.render("edit.ejs", { property });
});

app.delete("/properties/:id", (req, res) => {
  let { id } = req.params;
  properties = properties.filter((p) => id !== p.id); // Change `!==` to `===`
  res.redirect("/properties");
  console.log("deleted");
});
// ---------------  Roomates routes --------------------------//

let roommates = [
  {
    id: uuidv4(),
    Property_id: uuidv4(),
    name: " roommate 1",
    age: 18,
    gender: "Male",
    Veg_nonveg: "Veg",
  },
  {
    id: uuidv4(),
    Property_id: uuidv4(),
    name: " roommate 2",
    age: 19,
    gender: "Female",
    Veg_nonveg: "Veg",
  },
  {
    id: uuidv4(),
    Property_id: uuidv4(),
    name: "Daniel",
    age: 29,
    gender: "Male",
    Veg_nonveg: "Nonveg",
  },
  {
    id: uuidv4(),
    Property_id: uuidv4(),
    name: "Sophia",
    age: 30,
    gender: "Female",
    Veg_nonveg: "Veg",
  },
  {
    id: uuidv4(),
    Property_id: uuidv4(),
    name: "Michael",
    age: 22,
    gender: "Male",
    Veg_nonveg: "Veg",
  },
];

app.get("/roommates", (req, res) => {
  res.render("index2.ejs", { roommates });
});

app.get("/roommates/new", (req, res) => {
  res.render("new2.ejs");
});
app.post("/roommates", (req, res) => {
  let { name, age, gender, Veg_nonveg } = req.body;
  let id = uuidv4();
  let Property_id = uuidv4();
  roommates.push({
    name,
    age,
    gender,
    Veg_nonveg,
    id,
  });
  console.log(roommates);
  res.redirect("/roommates");
});

app.get("/roommates/:id", (req, res) => {
  let { id } = req.params;
  let roommate = roommates.find((p) => id === p.id);
  console.log(roommate);
  res.render("show2.ejs", { roommate });
});

app.patch("/roommates/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  let newName = req.body.name;
  let newAge = req.body.age;
  let newGender = req.body.gender;
  let newVeg_nonveg = req.body.Veg_nonveg;

  let roommate = roommates.find((p) => id === p.id);
  roommate.name = newName;
  roommate.age = newAge;
  roommate.gender = newGender;
  roommate.Veg_nonveg = newVeg_nonveg;

  console.log(roommate);

  res.redirect("/roommates");
});

app.get("/roommates/:id/edit", (req, res) => {
  let { id } = req.params;
  roommate = roommates.find((p) => id === p.id);
  console.log(roommate);
  res.render("edit2.ejs", { roommate });
});

app.delete("/roommates/:id", (req, res) => {
  let { id } = req.params;
  roommates = roommates.filter((p) => id !== p.id);
  res.redirect("/roommates");
  console.log("deleted");
});

app.get("/", (req, res) => {
  res.render("index2.ejs" , { roommates });
});
