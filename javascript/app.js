// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyA-s9rMh2K9dDqJAERWj6EyQ4Qj3hlIRHg",
  authDomain: "litterpic-fa0bb.firebaseapp.com",
  projectId: "litterpic-fa0bb",
  storageBucket: "litterpic-fa0bb.appspot.com",
  messagingSenderId: "445985363997",
  appId: "1:445985363997:web:3588d2d945f426835e4ef4",
  measurementId: "G-64THCF0R4S",
});

// Get a reference to the Firestore database
const db = firebase.firestore();

function fetchPosts() {
  const postsColumn = document.getElementById("posts-column");
  const posts = [];

  db.collection("userPosts")
    .orderBy("timePosted", "desc")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const postData = doc.data();

        const post = {
          id: doc.id,
          description: postData.postDescription,
          photos: postData.postPhotos,
        };

        posts.push(post);

        const postElement = document.createElement("div");
        postElement.className = "post mb-4";

        const postDescriptionElement = document.createElement("h5");
        postDescriptionElement.innerText = post.description;
        postElement.appendChild(postDescriptionElement);

        const carouselId = `carousel-${post.id}`;

        const carouselElement = document.createElement("div");
        carouselElement.className = "carousel slide";
        carouselElement.id = carouselId;
        carouselElement.setAttribute("data-bs-ride", "carousel");

        const carouselInnerElement = document.createElement("div");
        carouselInnerElement.className = "carousel-inner";

        post.photos.forEach((photo, index) => {
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

        if (post.photos.length > 1) {
          const carouselPrevElement = document.createElement("a");
          carouselPrevElement.className = "carousel-control-prev";
          carouselPrevElement.href = `#${carouselId}`;
          carouselPrevElement.setAttribute("role", "button");
          carouselPrevElement.setAttribute("data-bs-slide", "prev");

          const carouselPrevIcon = document.createElement("span");
          carouselPrevIcon.className = "carousel-control-prev-icon";
          carouselPrevIcon.setAttribute("aria-hidden", "true");
          carouselPrevElement.appendChild(carouselPrevIcon);

          const carouselPrevSrOnly = document.createElement("span");
          carouselPrevSrOnly.className = "visually-hidden";
          carouselPrevSrOnly.innerText = "Previous";
          carouselPrevElement.appendChild(carouselPrevSrOnly);

          const carouselNextElement = document.createElement("a");
          carouselNextElement.className = "carousel-control-next";
          carouselNextElement.href = `#${carouselId}`;
          carouselNextElement.setAttribute("role", "button");
          carouselNextElement.setAttribute("data-bs-slide", "next");

          const carouselNextIcon = document.createElement("span");
          carouselNextIcon.className = "carousel-control-next-icon";
          carouselNextIcon.setAttribute("aria-hidden", "true");
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

// Activate the carousel after all posts have been loaded
const carouselElements = document.querySelectorAll(".carousel");
carouselElements.forEach((carousel) => {
  new bootstrap.Carousel(carousel, {
    interval: false,
  });
});
