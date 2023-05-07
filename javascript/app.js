const db = firebase.firestore();

function fetchPosts() {
  const postsColumn = document.getElementById("posts-column");

  db.collection("userPosts")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const postData = doc.data();

        const postElement = document.createElement("div");
        postElement.className = "post mb-4";

        const postDescriptionElement = document.createElement("h5");
        postDescriptionElement.innerText = postData.postDescription;
        postElement.appendChild(postDescriptionElement);

        const carouselId = `carousel-${doc.id}`;

        const carouselElement = document.createElement("div");
        carouselElement.className = "carousel slide";
        carouselElement.id = carouselId;
        carouselElement.setAttribute("data-ride", "carousel");

        const carouselInnerElement = document.createElement("div");
        carouselInnerElement.className = "carousel-inner";

        postData.postPhotos.forEach((photo, index) => {
          const carouselItemElement = document.createElement("div");
          carouselItemElement.className = `carousel-item${
            index === 0 ? " active" : ""
          }`;

          const imgElement = document.createElement("img");
          imgElement.className = "d-block w-100";
          imgElement.src = photo;
          carouselItemElement.appendChild(imgElement);

          carouselInnerElement.appendChild(carouselItemElement);
        });

        carouselElement.appendChild(carouselInnerElement);

        if (postData.postPhotos.length > 1) {
          const carouselPrevElement = document.createElement("a");
          carouselPrevElement.className = "carousel-control-prev";
          carouselPrevElement.href = `#${carouselId}`;
          carouselPrevElement.setAttribute("role", "button");
          carouselPrevElement.setAttribute("data-slide", "prev");

          const carouselPrevIcon = document.createElement("span");
          carouselPrevIcon.className = "carousel-control-prev-icon";
          carouselPrevIcon.setAttribute("aria-hidden", "true");
          carouselPrevElement.appendChild(carouselPrevIcon);

          const carouselPrevSrOnly = document.createElement("span");
          carouselPrevSrOnly.className = "sr-only";
          carouselPrevSrOnly.innerText = "Previous";
          carouselPrevElement.appendChild(carouselPrevSrOnly);

          const carouselNextElement = document.createElement("a");
          carouselNextElement.className = "carousel-control-next";
          carouselNextElement.href = `#${carouselId}`;
          carouselNextElement.setAttribute("role", "button");
          carouselNextElement.setAttribute("data-slide", "next");

          const carouselNextIcon = document.createElement("span");
          carouselNextIcon.className = "carousel-control-next-icon";
          carouselNextIcon.setAttribute("aria-hidden", "true");
          carouselNextElement.appendChild(carouselNextIcon);

          const carouselNextSrOnly = document.createElement("span");
          carouselNextSrOnly.className = "sr-only";
          carouselNextSrOnly.innerText = "Next";
          carouselNextElement.appendChild(carouselNextSrOnly);

          carouselElement.appendChild(carouselPrevElement);
          carouselElement.appendChild(carouselNextElement);
        }

        postElement.appendChild(carouselElement);
        postsColumn.appendChild(postElement);
      });
    });
}

fetchPosts();
