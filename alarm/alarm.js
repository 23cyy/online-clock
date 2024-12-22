// script alarme

let alarmTime = null;
let alarmTimeout = null;
let isAlarmSet = false;

function updateCurrentTime() {
    const now = new Date();
    const currentTimeElement = document.getElementById('currentTime');
    currentTimeElement.textContent = `Heure actuelle : ${now.toLocaleTimeString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    })}`;
}

function toggleAlarm() {
    if (isAlarmSet) {
        disableAlarm();
    } else {
        setAlarm();
    }
}

function setAlarm() {
    const hours = document.getElementById('alarmHours').value;
    const minutes = document.getElementById('alarmMinutes').value;

    if (hours === "" || minutes === "") {
        alert("Veuillez entrer une heure et des minutes valides.");
        return;
    }

    const now = new Date();
    alarmTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);

    if (alarmTime < now) {
        alarmTime.setDate(alarmTime.getDate() + 1); // Régler l'alarme pour le jour suivant si l'heure est passée
    }

    const timeToAlarm = alarmTime.getTime() - now.getTime();

    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }

    alarmTimeout = setTimeout(triggerAlarm, timeToAlarm);
    document.getElementById('alarmInfo').textContent = `⏰ Alarme réglée pour : ${hours}:${minutes}`;
    document.getElementById('countdown').style.display = 'block';
    isAlarmSet = true;
    document.getElementById('alarmButton').textContent = "Désactiver l'Alarme";
    startCountdown(timeToAlarm);
}

function disableAlarm() {
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
    }
    alarmTime = null;
    isAlarmSet = false;
    document.getElementById('alarmInfo').textContent = `⏰ Alarme réglée pour : --:--`;
    document.getElementById('countdown').style.display = 'none';
    document.getElementById('alarmButton').textContent = "Activer l'Alarme";
}

function triggerAlarm() {
    const alarmSound = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
    alarmSound.play();

    // Afficher une alerte personnalisée
    const customAlert = document.createElement('div');
    customAlert.id = 'customAlert';
    customAlert.innerHTML = `
        <div style="background-color: #ffffff; padding: 20px; border: 2px solid #3498db; border-radius: 10px; position: fixed; top: 20%; left: 50%; transform: translate(-50%, -50%); z-index: 1000; display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <h2 style="color: #2c3e50;">⏰ C'est l'heure !</h2><br>
            <button style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;" onclick="dismissCustomAlert()">OK</button>
        </div>
    `;
    document.body.appendChild(customAlert);

    disableAlarm();
}

function dismissCustomAlert() {
    const customAlert = document.getElementById('customAlert');
    if (customAlert) {
        customAlert.remove();
    }
}

function startCountdown(duration) {
    const countdownElement = document.getElementById('countdown');

    function updateCountdown() {
        if (!isAlarmSet) return;

        const now = new Date();
        const timeRemaining = alarmTime - now;

        if (timeRemaining <= 0) {
            countdownElement.style.display = 'none';
            return;
        }

        const hours = String(Math.floor((timeRemaining / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((timeRemaining / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeRemaining / 1000) % 60)).padStart(2, '0');

        countdownElement.textContent = `⌛ Temps restant : ${hours}:${minutes}:${seconds}`;
    }

    setInterval(updateCountdown, 1000);
}

setInterval(updateCurrentTime, 1000);
