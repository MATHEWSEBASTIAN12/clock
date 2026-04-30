let alarmTime = null;

function updateClock() {
    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    // Greeting
    let greet = "Good Evening";
    if (h < 12) greet = "Good Morning";
    else if (h < 18) greet = "Good Afternoon";
    document.getElementById("greeting").innerText = greet;

    // Digital
    let hh = String(h).padStart(2, '0');
    let mm = String(m).padStart(2, '0');
    let ss = String(s).padStart(2, '0');

    document.getElementById("clock").innerText = `${hh}:${mm}:${ss}`;

    // Date
    document.getElementById("date").innerText =
        now.toDateString();

    // Analog
    document.getElementById("hour").style.transform =
        `rotate(${(h%12)*30 + m*0.5}deg)`;
    document.getElementById("minute").style.transform =
        `rotate(${m*6}deg)`;
    document.getElementById("second").style.transform =
        `rotate(${s*6}deg)`;

    // Alarm Check
    const currentTime = `${hh}:${mm}`;
    if (alarmTime === currentTime) {
        alert("⏰ Alarm Ringing!");
        alarmTime = null;
    }

    updateWorldClock();
}

setInterval(updateClock, 1000);
updateClock();

/* 🌍 World Clock */
function updateWorldClock() {
    const cities = [
        { name: "New York", offset: -4 },
        { name: "London", offset: 0 },
        { name: "Dubai", offset: 4 },
        { name: "Tokyo", offset: 9 }
    ];

    let html = "";

    cities.forEach(city => {
        let now = new Date();
        let utc = now.getTime() + now.getTimezoneOffset()*60000;
        let cityTime = new Date(utc + (3600000 * city.offset));

        html += `<p>${city.name}: ${cityTime.toLocaleTimeString()}</p>`;
    });

    document.getElementById("worldClocks").innerHTML = html;
}

/* ⏰ Alarm */
function setAlarm() {
    alarmTime = document.getElementById("alarmTime").value;
    document.getElementById("alarmStatus").innerText =
        "Alarm set for " + alarmTime;
}

/* 🌗 Theme */
function toggleTheme() {
    document.body.classList.toggle("light");
}

/* 🌗 Auto Theme */
(function autoTheme(){
    let hour = new Date().getHours();
    if(hour >= 6 && hour < 18){
        document.body.classList.add("light");
    }
})();
