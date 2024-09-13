// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  limit,
  query,
  addDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


function initializeDocRef() {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDMxBX26TiaogBic6TGIk9Ph4-RqQcuWks",
    projectId: "blowser-chat",
    appId: "1:1019355908696:web:a491440b91c2931da0182d",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getFirestore(app);
  const docRef = doc(db, "channels", "training");
  return docRef
}


let myName = "";

function addMessage(message, username) {
  const messagesEl = document.getElementById("messages");
  const messageEl = document.createElement("div");
  const messageElUser = document.createElement("span");
  messageElUser.textContent = username || "unknown";
  messageEl.appendChild(messageElUser);
  const messageElText = document.createElement("p");
  messageElText.textContent = message;
  messageEl.appendChild(messageElText);
  messageEl.className = "message";
  if (username === myName) {
    messageEl.classList.add("my-message");
  }
  messagesEl.appendChild(messageEl);
}

function addFormEventListener() {
  const chatForm = document.getElementById("chat-form");
  const submitButton = document.getElementById("submit");
  submitButton.addEventListener("click", () => {
    if (!chatForm.value || !myName) return;

    addDoc(collection(docRef, "messages"), {
      username: myName,
      message: chatForm.value,
      timestamp: serverTimestamp(),
    });

    // addMessage(chatForm.value, myName);
    scrollToBottom();
    chatForm.value = "";
  });
}

function initMyName() {
  const myNameEl = document.getElementById("my-name");
  myNameEl.value = localStorage.getItem("my-name");
  myName = myNameEl.value;

  myNameEl.addEventListener("change", (event) => {
    myName = event.target.value;
    localStorage.setItem("my-name", myName);
  });
}

function scrollToBottom() {
  const messagesEl = document.getElementById("messages");
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function subscribeMessages() {
  const messageRef = collection(docRef, "messages");
  const q = query(messageRef, orderBy("timestamp", "desc"), limit(10));
  return onSnapshot(q, (querySnapshot) => {
    const messages = [];
    querySnapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        const data = change.doc.data();
        console.log(data.message);
        messages.push(data);
      }
    });
    messages.reverse();
    for (const data of messages) {
      addMessage(data.message, data.username);
    }
    scrollToBottom();
  });
}

const docRef = initializeDocRef()
addFormEventListener();
initMyName();
scrollToBottom();
subscribeMessages();