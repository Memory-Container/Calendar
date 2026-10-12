let sidenav = document.getElementsByTagName("aside")[0] ?? []
let footer = document.getElementsByTagName("footer")[0] ?? []
let logo = document.getElementsByClassName("logo")
let menu = document.getElementsByClassName("hamburger")
footer.innerHTML = `
`
sidenav.innerHTML = `
    <div class="nav-container">
        <div class="user-profile">
            <div class="user-img">

            </div>
            <div class="user-info">
                <div class="user-name">
                    Code
                </div>
                <div class="user-gmail">
                    awhitedogidk@gmail.com
                </div>
            </div>
        </div>
        <hr>
        <div class="links-section">
            <a class="link" href="../../pages/group/" id="group">
                Nhóm
            </a>
            <a class="link" href="../../pages/schedule/" id="schedule">
                <div class="flex-r" style="gap: 5px">
                    Lịch trình
                    <div class="icon chevron-down black"  style="display: none"></div>
                </div>
                </a>
            <div style="display: none" id="schedule-utilities">
            </div>
        </div>
    </div>
`
let currentPage
function initializeNav() {
    let link = sidenav.querySelectorAll(".links-section .link")
    let signIn = document.querySelector("#signIn")
    currentPage = window.location.pathname.match(/[\w]+/gm)[1]
    // signIn.addEventListener('click', () => {
    //     window.location.assign('../../pages/signIn/')
    // })
    if (currentPage == 'signIn') {
        document.querySelector('#signIn').style.display = 'none'
    }
    for (let i = 0; i < link.length; i++) {
        if (link[i].id == currentPage) {
            console.log(link[i].id)
            link[i].classList.add("active")
            link[i].addEventListener("click", (e) => {
                e.stopImmediatePropagation()
                e.preventDefault()
            })
        }
    }
}
initializeNav()