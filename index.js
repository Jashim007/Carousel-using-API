const carouselTrack = document.querySelector(".carousel_track");
const carouselNav = document.querySelector(".carousel_nav");
console.log(Array.from(carouselTrack.children));
/* ------------------------------------------------------------------------------------------ */
function fetchImage(collection, fetchImageInd, className) {
  let arrImages = Array.from(collection);
  let removeImageIndex = -1;
  let addImageIndex = -1;
  for (let i = 0; i < arrImages.length; i++) {
    if (arrImages[i].classList.contains(className)) {
      removeImageIndex = i;
      arrImages[i].classList.remove(className);
    }
  }
  if (fetchImageInd == "next") {
    if (removeImageIndex > -1) {
      if (removeImageIndex == arrImages.length - 1) addImageIndex = 0;
      else addImageIndex = removeImageIndex + 1;
    }
  } else {
    if (removeImageIndex > -1) {
      if (removeImageIndex == 0) addImageIndex = arrImages.length - 1;
      else addImageIndex = removeImageIndex - 1;
    }
  }
  arrImages[addImageIndex].classList.add(className);

  const nodeList = document.createDocumentFragment();

  arrImages.forEach((item) => {
    nodeList.appendChild(item);
  });
  return nodeList;
}

const btn_left = document.querySelector(".btn_left");
const btn_right = document.querySelector(".btn_right");
btn_left.addEventListener("click", () => {
  let updatedImageCarousel = fetchImage(
    carouselTrack.children,
    "previous",
    "active_slide"
  );
  let updatedImageNav = fetchImage(
    carouselNav.children,
    "previous",
    "curr_slide"
  );
  carouselTrack.innerHTML = "";
  carouselTrack.appendChild(updatedImageCarousel);
  carouselNav.innerHTML = "";
  carouselNav.appendChild(updatedImageNav);
});

btn_right.addEventListener("click", () => {
  let updatedImageCarousel = fetchImage(
    carouselTrack.children,
    "next",
    "active_slide"
  );
  let updatedImageNav = fetchImage(carouselNav.children, "next", "curr_slide");
  carouselTrack.innerHTML = "";
  carouselTrack.appendChild(updatedImageCarousel);
  carouselNav.innerHTML = "";
  carouselNav.appendChild(updatedImageNav);
});
/* ----------------------------------------------------------------------- */
/* ----------------------------------------------------------------------- */

async function loadImages() {
  try {
    let response = await fetch(
      "https://api.unsplash.com/collections/326127/photos/?client_id=9m77qMkNMimn8mjGI6y1s4Ilf6DaDcqoSVey-QTDhF4&per_page=3&page=1"
    );
    if (!response.ok) throw new Error("Unable to fetch images");
    let images = await response.json();
    console.log(images[0].urls.regular);
    if (images) {
      let carouselHTML = `<li class="carousel_slide active_slide">
              <img src="${images[0].urls.regular}" alt="${images[0].alt_description}" />
            </li>
            <li class="carousel_slide">
              <img src="${images[1].urls.regular}" alt="${images[1].alt_description}" />
            </li>
            <li class="carousel_slide">
              <img src="${images[2].urls.regular}" alt="${images[2].alt_description}" />
            </li>`;
      carouselTrack.innerHTML = "";
      carouselTrack.insertAdjacentHTML("afterbegin", carouselHTML);
    }
  } catch (err) {
    console.log(err);
  }
}
loadImages();
