let trueCurrentMonth = new Date().getMonth() + 1
function updateCalendarDisplay(year, month) {
    let firstDayOfTheMonth = getFirstDayOfMonth(year, month)
    let dateInformation = String(firstDayOfTheMonth).split(" ")
    let firstDayOfMonthIndex = new Date(getFirstDayOfMonth(year, month)).getUTCDay()
    let lastDayOfLastMonth = getLastDayOfMonth(year, month - 1).split(" ")[2];
    let lastDayOfMonth = getLastDayOfMonth(year, month).split(" ")[2];
    let lastDayOfLastMonthIndex = new Date(getLastDayOfMonth(year, month - 1)).getUTCDay()

    let calendarTime = document.querySelector(".calendar-time")
    let circleButton = document.querySelectorAll(".circle")

    calendarTime.textContent = `${dateInformation[1]} ${dateInformation[3]}`
    for (let i = lastDayOfLastMonthIndex; i >= 0; i--) {
        circleButton[i].textContent = Number(lastDayOfLastMonth) - lastDayOfLastMonthIndex + i;
        circleButton[i].classList.add("gray")
    }
    for (let j = firstDayOfMonthIndex; j < circleButton.length; j++) {
        let dateNumber = j - Number(firstDayOfMonthIndex) + 1
        if (dateNumber > Number(lastDayOfMonth)) {
            circleButton[j].textContent = dateNumber - Number(lastDayOfMonth)
            circleButton[j].classList.add("gray")
        } else {
            if (month == trueCurrentMonth && dateNumber == String(new Date().getDate())) {
                circleButton[j].classList.add("active")
            } else {
                circleButton[j].classList.remove("active")
            }
            circleButton[j].textContent = dateNumber
            circleButton[j].classList.remove("gray")
        }
    }
}
function initializeSchedule() {
    let chevronDown = sidenav.querySelector("#schedule").querySelector(".icon.chevron-down")
    let utilitiesContainer = sidenav.querySelector("#schedule-utilities")
    let firstDayOfTheMonth = getFirstDayOfMonth(new Date().getFullYear(), new Date().getMonth() + 1);
    let dateInformation = String(firstDayOfTheMonth).split(" ")
    let scheduleSideNavContent = `
        <button class="new-event secondary" onclick="openCreateModal()">
            <i class="fas fa-plus"></i>
            Tạo
        </button>
        <div class="flex-r j-between a-center">
            <div class="icon triangle-left black" onclick="switchMonth('previous')"></div>
            <div style="line-height: 0.8rem; font-size: 14px; font-weight: bold" class="calendar-time">${dateInformation[1]} ${dateInformation[3]}</div>
            <div class="icon triangle-right black" onclick="switchMonth('next')"></div>
        </div>
        <table class="calendar">
            <thead>
                <tr class="calendar-row">
                    <td class="days">Mon</td>
                    <td class="days">Tue</td>
                    <td class="days">Wed</td>
                    <td class="days">Thu</td>
                    <td class="days">Fri</td>
                    <td class="days">Sat</td>
                    <td class="days">Sun</td>
                </tr>
            </thead>
            <tbody class="calendar-date">
                <tr class="calendar-row">
                </tr>
            </tbody>
        </table>
    `
    utilitiesContainer.innerHTML = scheduleSideNavContent
    let string = ""
    for (let i = 0; i <= 5; i++) {
        string += "<tr class='calendar-row'>"
        for (let j = 7 * i + 1; j <= 7 * (i + 1); j++) {
            string += `<td class='days'><button class="circle"></button></td>`
        }
        string += "</td>"
    }
    let calendar = document.querySelector(".calendar-date")
    calendar.innerHTML = string
    updateCalendarDisplay(new Date().getFullYear(), new Date().getMonth() + 1)
    chevronDown.addEventListener("click", (e) => {
        if (chevronDown.className.includes("down")) {
            chevronDown.className = "icon chevron-up black"
            utilitiesContainer.style.display = "flex"
        } else {
            chevronDown.className = "icon chevron-down black"
            utilitiesContainer.style.display = "none"
        }
    })
    chevronDown.style.display = "inline-block"
}
initializeSchedule()
function flushScheduleContainer() {
    scheduleContainer.innerHTML = ""
}
function scheduleDisplayMode(mode) {
    if (mode == currentDisplayMode) return
    currentDisplayMode = mode
    flushScheduleContainer()
    switch(mode) {
        case "3days":
            break;
        case "week":
            break;
        case "month":
            break;
        case "all":
            break;
        default: 
            console.log('Mode not implemented')
    }
}
//Date Formatter
function formatDate(date) {
    if (!date) {
        return;
    }
    if (date.includes("-")) {
        let parts = date.split("-");
        let formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
        return formattedDate
    }
    if (date.includes("/")) {
        let parts = date.split("/")
        let formattedDate = parts[1] + "/" + parts[0] + "/" + parts[2];
        return formattedDate
    }
}
function dateCode(date) {
    if (!date) {
        return;
    }
    if (date.includes("-")) {
        let parts = date.split("-")
        let dateCode = parts[0] * 100000 + parts[1] * 1000 + parts[2] * 1
        return dateCode
    }
    if (date.includes("/")) {
        let parts = date.split("/")
        let dateCode = Number(parts[2]) * 100000 + Number(parts[0]) * 1000 + Number(parts[1]) * 1
        return dateCode
    }
}
//Validation Checkers
function checkIfValidStartEndTime(startTime, endTime) {
    // console.log(startTime, endTime)
    let startTime1 = formatDate(startTime)
    let endTime1 = formatDate(endTime)
    let startCode = dateCode(formatDate(startTime1))
    let endCode = dateCode(formatDate(endTime1))
    if (!startTime1 || !endTime1) {
        return true;
    }
    // console.log(
    //     parseInt(startTime1.split("/")[2]),
    //     parseInt(endTime1.split("/")[2])
    // )
    if ((endCode >= startCode) ||
        (parseInt(startTime1.split("/")[2]) < 2018 || parseInt(startTime1.split("/")[2]) > 2060) ||
        (parseInt(endTime1.split("/")[2]) < 2018 || parseInt(endTime1.split("/")[2]) > 2060)
    ) {
        return false
    }
    return true
}
function isValidTaskData(data) {
    // console.log(data)
    for (entries in data) {
        if (data[entries] === undefined) {
            return false
        }
    }
    if (checkIfValidStartEndTime(data?.startTime, data?.endTime))  {
        return false
    }
    return true
}
function checkifCellWithDateExisted(date) {
    let cellExist = document.querySelector(`.cell[data-date="${date}"]`)
    // console.log(cellExist)
    if (cellExist) {
        // console.log("Cell with date existed")
        return true
    }
    return false;
}
function formatState(state) {
    switch(state) {
        case "in-progress":
            return "Đang hoàn thành";
        case "completed":
            return "Đã hoàn thành";
        case "canceled":
            return "Bị hủy";
        default:
            return "Đang hoàn thành";
    }
}
function toggleDropdown(id) {
    let dropdown = document.querySelector(".dropdown-menu"+id)
    dropdown.classList.toggle("hidden")
}
function markTask(taskInfo, taskState) {
    let taskInformation = fakeDatabase[taskInfo[0]][taskInfo[1]]
    let previousState = taskInformation.state
    let dateCode1 = dateCode(taskInformation.startTime)
    let task = document.querySelector(`.cell[data-code="${dateCode1}"] .task[data-id="${taskInformation.id}|${dateCode1}"]`)
    task.querySelector(".data.status").textContent = formatState(taskState)
    document.querySelector(".property-value#modal-task-status").textContent = formatState(taskState)
    task.className = task.className.replace(previousState, taskState)
    fakeDatabase[taskInfo[0]][taskInfo[1]].state = taskState
}