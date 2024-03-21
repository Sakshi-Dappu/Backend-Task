

// index.ejs file 
const roommatesButton = document.getElementById("roommatesButton");

roommatesButton.addEventListener("click", function () {
  window.location.href = "http://localhost:8080/roommates";
});

//edit.ejs
function validateForm() {
    var budget = document.getElementById("budget").value;
    if (parseInt(budget) <= 0) {
        alert("Budget must be greater than zero");
        return false;
    }
    return true;
}

//index2.ejs
const propertyButton = document.getElementById("propertyButton");
propertyButton.addEventListener("click", function() {
    window.location.href = "http://localhost:8080/properties";
});

//new.ejs
function validateForm() {
    let location = document.getElementById("location").value;
    let budget = document.getElementById("budget").value;

    let locationError = document.getElementById("locationError");
    let budgetError = document.getElementById("budgetError");

    locationError.textContent = "";
    budgetError.textContent = "";

    if (location === "") {
      locationError.textContent = "Location cannot be empty";
      return false;
    }

    if (isNaN(parseInt(budget)) || parseInt(budget) <= 0) {
      budgetError.textContent = "Budget must be a positive integer";
      return false;
    }

    return true;
  }

  //new2.ejs
  function validateForm() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var vegNonVeg = document.getElementById("Veg_nonveg").value;

    // Validate name
    if (name.trim() === "") {
        alert("Roommate's name cannot be empty");
        return false;
    }

    // Validate age
    if (age < 18 || age > 60) {
        alert("Roommate's age should be between 18 and 60");
        return false;
    }

    // Validate gender
    if (gender !== "Male" && gender !== "Female") {
        alert("Gender should be either Male or Female");
        return false;
    }

    // Validate Veg/Nonveg
    if (vegNonVeg !== "Veg" && vegNonVeg !== "Nonveg") {
        alert("Veg/Nonveg should be a valid option");
        return false;
    }

    return true;
}