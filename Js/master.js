// Check If There's Local Storage Color Option
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main-color", mainColors);
  // Remove Active Class From All Colors List Items
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add Active Class On Element With Data Color === local storage Item
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Random Background Option
let backgroundOption = true;
// Variable To Control The Interval
let backgroundInterval;
// Check If There's Local Storage Random Background Item
let backgroundLocalItem = localStorage.getItem("background_option");
// Check If Random Backround Local Storage is not Empty
if (backgroundLocalItem !== null) {
  // Remove Active Class From All Spans
  document
    .querySelectorAll(".random-backgrounds span")
    .forEach((element) => element.classList.remove("active"));
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Toggle Spin Class On Icon
document.querySelector(".toggle-settings .settings-icon").onclick =
  function () {
    // Toggle Class fa-spin For Rotation Onself
    this.classList.toggle("fa-spin");
    // Toggle Class open On Main Settings Box
    document.querySelector(".settings-box").classList.toggle("open");
  };

// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop On All List Items
colorsLi.forEach((li) => {
  // Click On Every List Items
  li.addEventListener("click", (e) => {
    // Set Color On Root
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    // Set Color On Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// Switch Random Background Option
const randomBackEl = document.querySelectorAll(".random-backgrounds span");
// Loop On All Spans
randomBackEl.forEach((span) => {
  // Click On Every Span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Images
let imagesArr = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

// Function To Randomize Imgs
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imagesArr.length);
      // Change Background Image URL
      landingPage.style.backgroundImage =
        `url("Images/` + imagesArr[randomNumber] + `")`;
    }, 10000);
  }
}
randomizeImgs();

// Select Cpp Selector
let ourCpp = document.querySelector(".cpp");

window.onscroll = function () {
  // Cpp Offset Top
  let cppOffsettTop = ourCpp.offsetTop;
  // Cpp Outer Height
  let cppOutterHeight = ourCpp.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window Scroll Top
  let windowScrollTop = window.pageYOffset;
  if (windowScrollTop > cppOffsettTop + cppOutterHeight - windowHeight) {
    let allCpp = document.querySelectorAll(".cpp-box .cpp-progress span");
    allCpp.forEach((cpp) => {
      cpp.style.width = cpp.dataset.progress;
    });
  }
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    // Add Class To Overlay
    overlay.className = "popup-overlay";
    // Append overlay To The Body
    document.body.appendChild(overlay);
    // Create The Popup Box
    let popupBox = document.createElement("div");
    // Add Class To The Popup Box
    popupBox.className = "popup-box";
    if (img.alt !== null) {
      //Create Heading
      let imgHeading = document.createElement("h3");
      // Create Text For Heading
      let imgText = document.createTextNode(img.alt);
      // Append Text to The Heading
      imgHeading.appendChild(imgText);
      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }
    // Create The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Add Image To Popup Box
    popupBox.appendChild(popupImage);
    // Append Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");
    // Create The Close Span Text
    let closeButtonText = document.createTextNode("X");
    // Append Text To The Close Button
    closeButton.appendChild(closeButtonText);
    // Add Class To Close Button
    closeButton.className = "close-button";
    // Append closeButton To popupBox
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select ALL Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
// Select ALL Links
const allLinks = document.querySelectorAll(".links a");
// Create a function scrollToSomewhere
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allBullets);
scrollToSomewhere(allLinks);

// Handle Active State
function handleActive(ev) {
  // Remove Active Class From Children
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add Active Class On Self
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");
if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("color-option");
  // localStorage.removeItem("background-option");
  // localStorage.removeItem("bullets-option");
  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();
  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");
  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button

document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");
      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
