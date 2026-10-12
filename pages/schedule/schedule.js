let filterType = document.querySelectorAll(".filter-type")
let dropdown = document.querySelectorAll(".dropdown")
let fakeDatabase = {}
let taskTypeCount = [0, 0, 0]
let currentDisplayMode = ""
filterType.forEach((element, id) => {
    element.addEventListener("click", () => {
        if (dropdown[id].style.display == "none") {
            dropdown[id].style.display = "flex"
        }  else {
            dropdown[id].style.display = "none"
        }
    })
})
let task = document.querySelectorAll(".task")
task.forEach((element) => {
    let chevronDown = element.querySelector(".fa-solid.fa-chevron-down")
    if (chevronDown) {
        chevronDown.addEventListener("click", (e) => {
            e.stopPropagation()
            chevronDown.classList.toggle("flip")
            element.classList.toggle("compact")
        })
    }
})

function openCreateModal() {
    openModal({
        title: 'Tạo lịch trình',
        message: `
            <label>
                <div>
                    Tiêu đề <span class="important">*</span>
                </div>
                <input id="title" required>
            </label>
            <div class="group-container">   
                <label>
                    <div>
                        Ngày bắt đầu <span class="important">*</span>
                    </div>
                    <input type="date" id="startTime" min="2018-01-01" max="2060-01-01" required>
                </label>
                <label>
                    <div>
                        Ngày kết thúc <span class="important">*</span>
                    </div>
                    <input type="date" id="endTime" min="2018-01-01" max="2060-01-01" required>
                </label>
            </div>
            <label>
                Mô tả
                <textarea placeholder="Tối đa 250 ký tự..." id="description"></textarea>
            </label>
            <label>
                Ghi chú
                <textarea placeholder="Tối đa 50 ký tự..." id="note"></textarea>
            </label>
        `,
        options: [
            {
                type: "tertiary",
                message: "Hủy bỏ",
                callback: closeModal,
            },
            {
            type: "primary",
            message: "Thêm",
            callback: createNewTask,
            },
        ]
    })
}
let scheduleContainer = document.querySelector(".schedule-container")
function insertNewCell(date) {
    // console.log(Boolean(date), checkifCellWithDateExisted(date))
    if (date && checkifCellWithDateExisted(date)) {
        return 0;
    }
    scheduleContainer = document.querySelector(".schedule-container")
    let cell = document.createElement("div")
    let dateContainer = document.createElement("div")
    let taskContainer = document.createElement("div")
    cell.className = "cell"
    cell.dataset.date = date
    cell.dataset.code = dateCode(date)
    dateContainer.className = "date"
    dateContainer.textContent = formatDate(date)
    taskContainer.className = "task-container"
    cell.append(dateContainer)
    cell.append(taskContainer)

    let existingCells = document.querySelectorAll(".cell")
    // console.log(Boolean(existingCells), existingCells, date)
    if (existingCells.length > 0) {
        existingCells.forEach(element => {
            let cellDateCode = element.dataset.code
            if (dateCode(date) < parseInt(cellDateCode)) {
                scheduleContainer.insertBefore(cell, element)
            } else {
                // console.log(dateCode(date), parseInt(cellDateCode), dateCode(date) < parseInt(cellDateCode))
                insertAfter(element, cell)
            }
        })
    } else {
        // console.log(1)
        scheduleContainer.appendChild(cell)
    }
}
function createNewTask(task2) {
    let task = {
        title: document.querySelector("input#title")?.value ?? task2.title,
        status: "Đang hoàn thành",
        state: "in-progress",
        startTime: document.querySelector("input#startTime")?.value ?? task2.startTime,
        endTime: document.querySelector("input#endTime")?.value ?? task2.endTime,
        note: document.querySelector("input#note")?.value ?? task2.note,
        description: document.querySelector("input#tdescription")?.value ?? task2.description,
    }
    console.log(task)
    task.note === "" ? task.note = "Không có ghi chú" : task.note
    task.description === "" ? task.description = "Không có mô tả" : task.description
    // console.log(task)
    if (fakeDatabase[dateCode(task.startTime)] == undefined) {
        fakeDatabase[dateCode(task.startTime)] = []
    }
    task["id"] = fakeDatabase[dateCode(task.startTime)].length
    fakeDatabase[dateCode(task.startTime)].push(task)
    task[1]++
    displayTask(task)
    updateStatistic()
    // console.log(isValidTaskData(task))
    closeModal()
}
function updateStatistic() {
    let overview = document.querySelector(".overview")
    let pending = overview.querySelector(".count.in-progress")
    let completed = overview.querySelector(".count.completed")
    let canceled = overview.querySelector(".count.canceled")
    pending.textContent = task[1]
    completed.textContent = task[0]
    canceled.textContent = task[2]
}
function displayTask(task) {
    if (!isValidTaskData(task)) {
        console.log(task)
        return;
    }
    insertNewCell(task.startTime)
    let taskContainer = document.querySelector(`.cell[data-date="${task.startTime}"]`).querySelector(".task-container")
    let scheduleTask = document.createElement("div")
    scheduleTask.onclick = () => {
        openTaskModal(task)
    }
    scheduleTask.dataset["name"] = task.title
    scheduleTask.dataset["id"] = `${task.id}|${dateCode(task.startTime)}`
    scheduleTask.className = `task in-progress compact`
    scheduleTask.innerHTML = `
            <div class="task-name">
                ${task.title}
                <div class="icon chevron-down black"></div>
            </div>
            <hr>
            <table class="task-properties">
                <tr>
                    <td class="property">Trạng thái :</td>
                    <td class="data status">${task.status}</td>
                </tr>
                <tr>
                    <td class="property">Thời gian :</td>
                    <td class="data">${formatDate(task.startTime)} - ${formatDate(task.endTime)}</td>
                </tr>
                <tr>
                    <td class="property">Ghi chú :</td>
                    <td class="data">${task.note}</td>
                </tr>
            </table>
    `
    taskContainer.append(scheduleTask)
    let task1 = taskContainer = document.querySelector(`.cell[data-date="${task.startTime}"] .task-container .task[data-name="${task.title}"]`)
    let chevronDown = task1.querySelector(`.icon.chevron-down`)
    chevronDown.addEventListener("click", (e) => {
        e.stopPropagation()
        chevronDown.className.includes("down") == true ? chevronDown.className = "icon chevron-up black" : chevronDown.className = "icon chevron-down black"
        task1.classList.toggle("compact")
    })
    // console.log(1)
}
function closeSideNav() {
    let sideNav = document.querySelectorAll(".side-nav")[1]
    let hamburger = document.querySelector(".nav-hamburger")
    sideNav.classList.toggle("hide");
    hamburger.classList.toggle("hide");
}
let currentCalendarMonth = new Date().getMonth() + 1
let currentCalendarYear = new Date().getFullYear()
function switchMonth(mode) {
    if (mode == "previous") {
        if (currentCalendarMonth - 1 < 0) {
            currentCalendarMonth = 11;
            currentCalendarYear--;
        } else {
            currentCalendarMonth--;
        }
    }
    if (mode == "next") {
        if (currentCalendarMonth + 1 > 11) {
            currentCalendarMonth = 0;
            currentCalendarYear++;
        } else {
            currentCalendarMonth++;
            // console.log(currentCalendarMonth)
        }     
    }
    updateCalendarDisplay(currentCalendarYear, currentCalendarMonth)
}
let check = setInterval(() => {
    if (!scheduleContainer.querySelector(".cell")) {
        scheduleContainer.style.display = "block"
        scheduleContainer.innerHTML = `
            <div class="empty-text">Hiện tại không có sự kiện gì</div>
        `
    } else {
        scheduleContainer.style.display = "flex"
        if (scheduleContainer.querySelector(".empty-text") === null) return
        scheduleContainer.querySelector(".empty-text").style.display = "none"
        return
    }
}, 50)
let displayModeButtons = document.querySelectorAll(".display-mode")
displayModeButtons.forEach(element => {
    element.addEventListener("click", () => {
        displayMode(element.id)
    })
})
function displayMode(mode) {
    flushScheduleContainer()
    switch(mode) {
        case "3days":
            displayNext(3)
            break;
        case "week":
            displayTaskInWeek();
            break;
        case "month":
            displayTaskInMonth()
            break;
        case "all":
            displayAllTask();
            break;
    }
}
function displayAllTask() {
    flushScheduleContainer()
    for (entries in fakeDatabase) {
        for (task of fakeDatabase[entries]) {
            displayTask(task)
        }
    }
}
function displayNext(number) {
    flushScheduleContainer()
    let date = new Date(new Date())
    for (let i = 0; i < number; i++) {
        date.setDate(new Date().getDate() + i)
        let currentCell = fakeDatabase[dateCode(date.toLocaleDateString())]
        if (currentCell != undefined) {
            for (entries of currentCell) {
                displayTask(entries)
            }
        }
    }
} 
function displayTaskInWeek() {
    flushScheduleContainer()
    let date = new Date(new Date())
    for (let i = -getDifferentFromMonday(new Date()); i < 7 - getDifferentFromMonday(new Date()); i++) {
        date.setDate(new Date().getDate() + i)
        let currentCell = fakeDatabase[dateCode(date.toLocaleDateString())]
        if (currentCell !== undefined) {
            for (entries of currentCell) {
                displayTask(entries)
            }
        }
    }
}
function displayTaskInMonth() {
    flushScheduleContainer()
    let date = new Date(new Date())
    let diffFromStartOfMonth = new Date().getDate() - 1
    let diffFromEndOfMonth = Number(getLastDayOfMonth(new Date().getFullYear(), new Date().getMonth() + 1).split(" ")[2]) - new Date().getDate()
    for (let i = -diffFromStartOfMonth; i <= diffFromEndOfMonth; i++) {
        date.setDate(new Date().getDate() + i)
        let currentCell = fakeDatabase[dateCode(date.toLocaleDateString())]
        if (currentCell !== undefined) {
            for (entries of currentCell) {
                displayTask(entries)
            }
        }
    }
}
function runningTest() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 10; j++) {
            createNewTask({
                title: `${10 * i + j}`,
                status: "Đang hoàn thành",
                startTime: `04/${new Date().getDate() + i}/2026`,
                endTime: `04/${new Date().getDate() + 7}/2026`,
                note: "",
                description: "",
            })
        }
    }
}
function getDifferentFromMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
    return diff;
}

function openTaskModal(task) {
    console.log(task.id)
    openModal({
        title: "",
        message: `
            <div class="task-title">
                ${task.title}
                <div class="dropdown">
                    <div class="icon dot3 black" style="width: 26px; height: 26px; cursor: pointer;" onclick="toggleDropdown('#task-mod-menu')"></div>
                    <div class="dropdown-menu hidden" id="task-mod-menu">
                        <div class="dropdown-options" onclick="markTask([${dateCode(task?.startTime)}, ${task?.id}], 'completed')">Đánh dấu hoàn thành</div>
                        <div class="dropdown-options" onclick="markTask([${dateCode(task?.startTime)}, ${task?.id}], 'canceled')">Đánh dấu bị hủy</div>
                        <div class="dropdown-options">Thay đổi chi tiết</div>
                        <div class="dropdown-options important" onclick="deleteTask(${dateCode(task?.startTime)})">Xóa</div>
                    </div>
                </div>
            </div>
            <div class="Flex-r" style="width: 100%; height: 100%; display:flex">
                <div class="flex-c" style="flex: 1.2; gap: 20px; padding-right: 5px;height: 100%;">
                    <div class="task-properties flex-r flex-wrap" >
                        <label style="width: fit-content">
                            <div class="property">Trạng thái</div>
                            <div class="property-value" id="modal-task-status">${task.status}</div>
                        </label>
                        <label style="width: fit-content">
                            <div class="property">Thời gian</div>
                            <div class="property-value">${formatDate(task.startTime)} - ${formatDate(task.endTime)}</div>
                        </label>
                    </div>
                    <div class="task-description task-properties">
                        <label>
                            <div class="property">Mô tả</div>
                            <div class="description">${task.description}</div>
                        </label>
                    </div>
                    <div class="task-description task-properties">
                        <label>
                            <div class="property">Ghi chú</div>
                            <div class="description">${task.note}</div>
                        </label>
                    </div>
                </div>
                <div class="flex-c" style="flex: 0.8; height: 100%; border-left: 2px solid black; overflow: hidden;">
                    <div class="title">
                        Nhật ký sửa đổi
                    </div>
                    <div class="activity-log"></div>
                </div>
            </div>
        `,
        options: ["hidden"],
        dimensions: ["70%", "560px"]
    })
}