document.addEventListener("DOMContentLoaded", function () {
  let content = document.querySelector(".main");
  let headerFilter = document.querySelector(".header__filter");

  const itemsPerPage = 5;
  let currentPage = 0;
  let items = Array.from(content.children);

  function showPage(page) {
    let startIndex = page * itemsPerPage;
    let endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
      item.classList.toggle("hidden", index < startIndex || index >= endIndex);
    });
    updateActiveButtonStates();
  }

  function createPagination() {
    let totalPages = Math.ceil(items.length / itemsPerPage);
    let paginationContainer = document.createElement("div");
    paginationContainer.classList.add("pagination");

    for (let i = 0; i < totalPages; i++) {
      let pageButton = document.createElement("button");
      pageButton.textContent = i + 1;
      pageButton.dataset.index = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
        updateActiveButtonStates();
      });
      paginationContainer.appendChild(pageButton);
    }

    return paginationContainer;
  }

  function updateActiveButtonStates() {
    let allPaginations = document.querySelectorAll(".pagination");
    allPaginations.forEach((pagination) => {
      let buttons = pagination.querySelectorAll("button");
      buttons.forEach((btn) => {
        if (Number(btn.dataset.index) === currentPage) {
          btn.classList.add("active");
        } else {
          btn.classList.remove("active");
        }
      });
    });
  }

  // Вставляем пагинацию в начало и конец .main
  headerFilter.appendChild(createPagination());
  content.appendChild(createPagination());

  showPage(currentPage);

  // Получаем все блоки с фильмами

  let allSectiomAboutFilm = Array.from(
    document.querySelectorAll(".main__films-one")
  );
  let button = document.querySelector("#sort");

  button.addEventListener("click", function (e) {
    let year = document.querySelector("#year").value;
    let rating = document.querySelector("#rating").value;
    let country = document.querySelector("#country").value;

    content.innerHTML = "";

    for (let film of allSectiomAboutFilm) {
      let dataYear = film
        .querySelector(".main__films-text h4")
        .textContent.trim();
      let dataRating = film
        .querySelector(".main__films-grade p")
        .textContent.trim();
      let dataCountry = film
        .querySelector(".main__films-text .none")
        .textContent.trim();

      let yearMatch = year === "all" || dataYear === year;
      let ratingMatch = rating === "all" || dataRating === rating;
      let countryMatch = country === "all" || dataCountry === country;

      if (yearMatch && ratingMatch && countryMatch) {
        content.innerHTML += `
        
        <div class="main__films-one">
        <a href="${film.querySelector("a").href}">
          <img src="${film.querySelector("img").src}" alt="" />
        </a>
        <div class="main__films-text">
          <a href="${film.querySelector(".main__films-text a").href}">
            <h3>${film.querySelector(".main__films-text h3").textContent}</h3>
            <h4>${film.querySelector(".main__films-text h4").textContent}</h4>
            <p class="none">${
              film.querySelector(".main__films-text .none").textContent
            }</p>
            <p>${film.querySelector(".main__films-text .text").textContent}</p>
          </a>
        </div>
        <div class="main__films-grade">
          <p>${film.querySelector(".main__films-grade p").textContent}</p>
          <img src="${
            film.querySelector(".main__films-grade img").src
          }" alt="" width="20px" height="20px" />
        </div>
      </div>
        `;
      }
    }
    document.querySelector("#year").options[0].selected = true;
    document.querySelector("#rating").options[0].selected = true;
    document.querySelector("#country").options[0].selected = true;
  });
  let icon = document.querySelector("#icon");
  icon.addEventListener("click", function () {
    location.reload();
  });
});
