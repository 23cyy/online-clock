// script horloge
let isAnalogMode = true;
let isDarkMode = false;
let isFlipClockMode = false;

function createMarkers() {
  const markers = document.querySelector(".markers");
  for (let i = 0; i < 60; i++) {
    const marker = document.createElement("div");
    marker.classList.add("marker");
    marker.style.transform = `rotate(${i * 6}deg)`;
    markers.appendChild(marker);
  }
}

function updateClock() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12 || 12;

  const secondDegrees = seconds * 6;
  const minuteDegrees = minutes * 6 + seconds * 0.1;
  const hourDegrees = hours * 30 + minutes * 0.5;

  document.getElementById(
    "second"
  ).style.transform = `rotate(${secondDegrees}deg)`;
  document.getElementById(
    "minute"
  ).style.transform = `rotate(${minuteDegrees}deg)`;
  document.getElementById("hour").style.transform = `rotate(${hourDegrees}deg)`;

  const digitalClock = document.getElementById("digitalClock");
  digitalClock.textContent = now.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const flipClock = document.getElementById("flipClock");
  if (isFlipClockMode) {
    updateFlipClock();
  }
}

function switchClockMode() {
  const analogClock = document.querySelector(".clock");
  const digitalClock = document.getElementById("digitalClock");
  const flipClock = document.getElementById("flipClock");
  const toggleBtn = document.querySelector(".toggle-btn");

  if (isAnalogMode) {
    analogClock.style.display = "none";
    digitalClock.style.display = "block";
    flipClock.style.display = "none";
    toggleBtn.textContent = "Mode analogique";
  } else {
    analogClock.style.display = "flex";
    digitalClock.style.display = "none";
    flipClock.style.display = "none";
    toggleBtn.textContent = "Mode numérique";
  }

  isAnalogMode = !isAnalogMode;
}

function switchThemeMode() {
  isDarkMode = !isDarkMode;
  const themeBtn = document.querySelector(
    ".toggle-buttons button:nth-child(2)"
  );
  if (isDarkMode) {
    document.documentElement.style.setProperty("--bg-primary", "#2c3e50");
    document.documentElement.style.setProperty("--bg-secondary", "#34495e");
    document.documentElement.style.setProperty("--text-primary", "#ecf0f1");
    document.documentElement.style.setProperty("--accent-color", "#9b59b6");
    themeBtn.textContent = "Mode clair";
  } else {
    document.documentElement.style.setProperty("--bg-primary", "#f4f4f6");
    document.documentElement.style.setProperty("--bg-secondary", "#ffffff");
    document.documentElement.style.setProperty("--text-primary", "#2c3e50");
    document.documentElement.style.setProperty("--accent-color", "#3498db");
    themeBtn.textContent = "Mode sombre";
  }
}

function showFlipClock() {
  const analogClock = document.querySelector(".clock");
  const digitalClock = document.getElementById("digitalClock");
  const flipClock = document.getElementById("flipClock");

  analogClock.style.display = "none";
  digitalClock.style.display = "none";
  flipClock.style.display = "flex";
  isFlipClockMode = true;

  updateFlipClock();
}

function updateFlipClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const hoursElement = document
    .getElementById("hoursFlip")
    .querySelector(".flip-digit-inner");
  const minutesElement = document
    .getElementById("minutesFlip")
    .querySelector(".flip-digit-inner");
  const secondsElement = document
    .getElementById("secondsFlip")
    .querySelector(".flip-digit-inner");

  if (hoursElement.textContent !== hours) {
    hoursElement.classList.add("flip-animation");
    setTimeout(() => hoursElement.classList.remove("flip-animation"), 600);
  }
  if (minutesElement.textContent !== minutes) {
    minutesElement.classList.add("flip-animation");
    setTimeout(() => minutesElement.classList.remove("flip-animation"), 600);
  }
  if (secondsElement.textContent !== seconds) {
    secondsElement.classList.add("flip-animation");
    setTimeout(() => secondsElement.classList.remove("flip-animation"), 600);
  }

  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
  secondsElement.textContent = seconds;
}

function goToAlarmPage() {
  window.open("alarm/alarm.html", "_blank");
}

createMarkers();
updateClock();
setInterval(updateClock, 1000);

// Set initial state to show only the analog clock
window.onload = function () {
  document.querySelector(".clock").style.display = "flex";
  document.getElementById("digitalClock").style.display = "none";
  document.getElementById("flipClock").style.display = "none";
};
