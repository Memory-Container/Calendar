function closeModal() {
    let modal = document.querySelector('.backdrop')
    modal.remove()
}
function openModal(content) {
    let title = content?.title ?? 'Sample Title'
    let message = content?.message ?? 'Sample Message'
    let options = content?.options !== undefined ? [...content.options] : [
        {
            type: 'tertiary',
            message: 'Close', 
            callback: closeModal
        },
        {
            type: 'primary',
            message: 'Accept', 
            callback: closeModal
        }
    ]
    createModal()
    flushModal()
    let header = document.querySelector(".modal-header")
    let content2 = document.querySelector(".modal-message")
    let choices = document.querySelector('.modal-choices')
    header.textContent = title
    content2.innerHTML = message
    if (options[0] === 'hidden') {
        choices.classList.add('hidden')
    } else {
        for (item of options) {
            console.log(item)
            let button = document.createElement('button')
            button.className = item.type ?? "primary"
            if (item.type == "primary") {
                button.setAttribute('type', 'submit');
                button.setAttribute('id', 'submit');
            }
            button.innerHTML = item.message ?? "Sample Text"
            button.addEventListener('click', item.callback ?? closeModal())
            choices.appendChild(button)
        }
    }
}
function createModal() {
    if (!document.querySelector('.backdrop')) {
        let container = document.querySelector("main")
        let backdrop = document.createElement('div')
        backdrop.classList.add('backdrop')
        backdrop.innerHTML = `
            <div class="modal-container">
                <button class="tertiary exit-modal" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
                <h2 class="modal-header">
                </h2>
                <form class="modal-form">
                    <div class="modal-message">
                    </div>
                    <div class="modal-choices">
                    </div>
                </form>
            </div>
        `
        container.appendChild(backdrop)
        let form = document.querySelector('.modal-form')
        backdrop.addEventListener("click", (e) => {
            if (e.target == backdrop) {
                closeModal()
            }
        })
        form.addEventListener('submit', (e) => {
            e.preventDefault()
        })
    } else [
        document.querySelector('.backdrop').style.display = 'flex'
    ]
}
function flushModal() {
    let header = document.querySelector(".modal-header")
    let content2 = document.querySelector(".modal-message")
    let choices = document.querySelector('.modal-choices')
    header.innerHTML = ''
    content2.innerHTML = ''
    choices.innerHTML = ''
    choices.style.display = ''
    choices.classList.remove('hidden')
}