const firebaseConfig = {
  apiKey: "AIzaSyDb1Y-oQTitrfAdYmn7s9NtJLnOUFaDwh4",
  authDomain: "petitionforjune4.firebaseapp.com",
  projectId: "petitionforjune4",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const counterRef = db.collection("counter").doc("liveVotes");

counterRef.onSnapshot((doc) => {
  const count = doc.data().count;
  document.getElementById("voteCounter").innerText =
    count.toLocaleString();
});

const form = document.getElementById("petitionForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const city = document.getElementById("city").value;
  const reason = document.getElementById("reason").value;

  await counterRef.update({
    count: firebase.firestore.FieldValue.increment(1)
  });

  document.getElementById("successBox").classList.remove("hidden");

  document.getElementById("certName").innerText = name;

  document.getElementById("leaveText").innerText =
`Dear Manager,

In national interest and to avoid irreversible spoilers, I request leave on June 4, 2026.

My viewing plans for Dhurandhar: The Revenge have been confirmed.

Regards,
${name}
${city}`;

  form.reset();
});

function copyLetter() {
  const text = document.getElementById("leaveText").innerText;
  navigator.clipboard.writeText(text);
  alert("Leave letter copied.");
}

function downloadCertificate() {
  html2canvas(document.getElementById("certificate")).then(canvas => {
    const link = document.createElement("a");
    link.download = "petition-certificate.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}