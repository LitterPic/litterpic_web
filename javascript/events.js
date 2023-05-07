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

// Get a reference to the events collection
const eventsRef = firebase.firestore().collection("events");

// Query for events that occur after the current date
const query = eventsRef.where("date", ">=", new Date());

// Get a reference to the events list element
const eventsList = document.getElementById("event-list");

// Check if events are in local storage
if (localStorage.getItem("events")) {
  const events = JSON.parse(localStorage.getItem("events"));
  renderEvents(events);
} else {
  // Retrieve events from Firebase and store in local storage
  query
    .get()
    .then((snapshot) => {
      const events = [];
      snapshot.forEach((doc) => {
        events.push(doc.data());
      });
      localStorage.setItem("events", JSON.stringify(events));
      renderEvents(events);
    })
    .catch((error) => {
      console.error(error);
    });
}

function renderEvents(events) {
  eventsList.innerHTML = "";
  events.forEach((event) => {
    const li = document.createElement("li");
    let dateFormatted = "";
    if (event.date && typeof event.date.toDate === "function") {
      dateFormatted = event.date.toDate().toLocaleDateString();
    }
    let startFormatted = "";
    if (
      event.eventStartTime &&
      typeof event.eventStartTime.toDate === "function"
    ) {
      const startTime = event.eventStartTime.toDate();
      startFormatted = startTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }
    li.textContent = `${event.description}: ${dateFormatted} - ${event.location} - Starts at ${startFormatted}`;
    eventsList.appendChild(li);
  });
}
