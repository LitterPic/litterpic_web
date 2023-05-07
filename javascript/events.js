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

query.get().then((snapshot) => {
  snapshot.forEach((doc) => {
    const event = doc.data();
    const li = document.createElement("li");
    const startTime = event.eventStartTime.toDate();
    const startFormatted = startTime.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    li.textContent = `${event.description}: ${event.date
      .toDate()
      .toLocaleDateString()} - ${event.location} - Starts at ${startFormatted}`;
    eventsList.appendChild(li);
  });
});
