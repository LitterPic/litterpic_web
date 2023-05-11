// Initialize Firebase App
const firebaseConfig = {
  apiKey: "AIzaSyA-s9rMh2K9dDqJAERWj6EyQ4Qj3hlIRHg",
  authDomain: "litterpic-fa0bb.firebaseapp.com",
  projectId: "litterpic-fa0bb",
  storageBucket: "litterpic-fa0bb.appspot.com",
  messagingSenderId: "445985363997",
  appId: "1:445985363997:web:3588d2d945f426835e4ef4",
  measurementId: "G-64THCF0R4S",
};
firebase.initializeApp(firebaseConfig);

class EventManager {
  constructor() {
    // Get a reference to the events collection
    this.eventsRef = firebase.firestore().collection("events");
    // Get a reference to the events list element
    this.eventsList = document.getElementById("event-list");
  }

  // Query for events that occur after the current date
  getUpcomingEvents() {
    const query = this.eventsRef.where("date", ">=", new Date());
    // Listen to changes in the collection in real-time
    query.onSnapshot(
      (snapshot) => {
        const events = snapshot.docs.map((doc) => {
          const data = doc.data();
          data.eventId = doc.id;
          return data;
        });
        localStorage.setItem("events", JSON.stringify(events));
        this.renderEvents(events);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  // Check if events are in local storage
  getLocalEvents() {
    if (localStorage.getItem("events")) {
      const events = JSON.parse(localStorage.getItem("events"));
      this.renderEvents(events);
    } else {
      this.getUpcomingEvents();
    }
  }

  renderEvents(events) {
    this.eventsList.innerHTML = "";
    events.forEach((event) => {
      const li = document.createElement("li");
      let dateFormatted = "";
      if (event.date && typeof event.date.toDate === "function") {
        dateFormatted = event.date.toDate().toLocaleDateString();
      }

      let timeString = "";
      const timestamp = new firebase.firestore.Timestamp(
        event.eventStartTime.seconds,
        event.eventStartTime.nanoseconds
      );
      const date = timestamp.toDate();
      const hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const amPm = hours >= 12 ? "PM" : "AM";
      const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
      timeString = `${formattedHours}:${minutes} ${amPm}`;

      li.textContent = `${event.description}: ${dateFormatted} - ${event.location} - Starts at ${timeString}`;
      this.eventsList.appendChild(li);
    });
  }
}

// Create an instance of EventManager and call getLocalEvents() to start the app
const eventManager = new EventManager();

// Listen for real-time updates to the events in the backend
eventManager.eventsRef.onSnapshot(
  (snapshot) => {
    const events = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.eventId = doc.id;
      return data;
    });
    localStorage.setItem("events", JSON.stringify(events));
    eventManager.renderEvents(events);
  },
  (error) => {
    console.error(error);
  }
);

eventManager.getLocalEvents();
