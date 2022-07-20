
// Get sections from API (free Heroku Dyno need to wait to a wake :) sorry )
fetch("https://whispering-eyrie-27574.herokuapp.com/api/sections")
  .then((value) => value.json())
  .then((value) => {
    let sections = value.data;
    //Json list of object => HTML sections
    for (let section of sections) {
      const newSection = ` <section id="section${section.attributes.pID}" data-navigation="${section.attributes.title}" class="your-active-class">
        <div class="landing__container">
          <h2>${section.attributes.title}</h2>
          <p> ${section.attributes.paragraphFirst} </p>
          <p> ${section.attributes.paragraphSecond} </p>
          </div>
        </section>`;
      const body = document.getElementsByTagName("main");
      //set section to the end of Main
      body[0].insertAdjacentHTML("beforeend", newSection);
    }
  })
  .then(() => {
    // build the nav
    let navigation = document.getElementById("navbar__list");

    const getsections = document.getElementsByTagName("section");
    let sections = Array.from(getsections);

    for (let section of sections) {
      let item = document.createElement("li");
      item.innerHTML = `<li><a href="#${section.id}" data-navigation="${section.id}" class="menu__link">${section.dataset.navigation}</a>`;
      navigation.appendChild(item);
    }
  });

// Add class 'active' to section when near top of viewport
window.onscroll = () => {
  document.querySelectorAll("section").forEach((active) => {
    active.getBoundingClientRect().top >= -300 &&
    active.getBoundingClientRect().top <= 150
      ? active.classList.add("your-active-class")
      : active.classList.remove("your-active-class");
  });
};

// Scroll to section on link click
let navigation = document.getElementById("navbar__list");
navigation.addEventListener("click", (fly) => {
  fly.preventDefault();
  if (fly.target.dataset.navigation) {
    document
      .getElementById(`${fly.target.dataset.navigation}`)
      .scrollIntoView({ behavior: "smooth" });
  }
  let navs = document.getElementsByClassName("menu__link");
  //set active navigation tab
  for (let nav of navs) {
    if (fly.target.dataset.navigation == nav.dataset.navigation) {
      nav.classList.add("tab");
    } else {
      nav.classList.remove("tab");
    }
  }
});
