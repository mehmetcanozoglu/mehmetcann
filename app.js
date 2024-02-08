//API Used: http://newsapi.org/s/india-news-api
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
let apiKey = "80e0ea61d7e64b98951621b20e0493ca"
// "in" stands for India

const country = "tr";
const options = [
    "general", 
    "entertainment",
    "health",
    "science",
    "sports",
    "technology",
];
//100 requests per day
const getNews = async () => {
  container.innerHTML = "";
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};
let requestURL;
//Create cards from data
const generateUI = (articles) => {
    for (let item of articles) {
      let card = document.createElement("div");
      card.classList.add("news-card");
      card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">
          ${item.title}
        </div>
        <div class="news-description">
        ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
      container.appendChild(card);
    }
  }; 

  const selectCategory = (e, category) => {
    let options = document.querySelectorAll(".option");
    let apiKey = "80e0ea61d7e64b98951621b20e0493ca"
    options.forEach((element) => {
      element.classList.remove("active");
    });
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
    e.target.classList.add("active");
    getNews();
  };

  const createOptions = () => {
    for (let i of options) {
      optionsContainer.innerHTML += `<button class="option ${
        i == "general" ? "active" : ""
      }" onclick="selectCategory(event,'${i}')">${i}</button>`;
    }
  };

  const init = () => {
    optionsContainer.innerHTML = "";
    getNews();
    createOptions();
  };
  window.onload = () => {
      let apiKey = "80e0ea61d7e64b98951621b20e0493ca"
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
    init();
  };