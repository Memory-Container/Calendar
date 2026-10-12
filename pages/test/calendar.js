const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    let count = 0;
    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        count++
    }
    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
        count++
    }
    let currentLast = 0
    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        count++;
        currentLast = i - lastDayofMonth + 2
    }
    for (let i = currentLast; i < (7 * 6 - count) + currentLast; i++) {
        liTag += `<li class="inactive">${i}</li>`
    }
    currentDate.innerText = `Tháng ${currMonth + 1}, ${currYear}`;
    daysTag.innerHTML = liTag;
}
renderCalendar();
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    });
});
let calendarPanel = document.querySelector(".calendar-panel")
let calendarSwitch = document.querySelector("#calendar-chevron-down")

calendarSwitch.addEventListener("click", () => {
    calendarPanel.classList.toggle("hidden")
})
window.addEventListener("click", (e) => {
    if (e.target !== calendarPanel && e.target !== calendarSwitch && !calendarPanel.contains(e.target)) {
        calendarPanel.classList.add("hidden")
    }
})