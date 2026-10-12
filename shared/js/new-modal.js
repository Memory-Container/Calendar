function createModalOverlay() {
    if (!document.querySelector('.modal-overlay')) {
        let overlay = document.createElement('div')
        overlay.classList.add('modal-overlay')
        document.body.appendChild(overlay)
    }
}
function createModal(content = {
    title: `Empty Modal Text`,
    content: `Nothing to see here.`,
    options: 
    [{
        class: 'btn btn-primary',
        text: 'OK',
        action: function () {
            closeModal()
        }
    }],
    isForm: false
}
) {
    createModalOverlay()
    flushModal()
    let overlay = document.querySelector('.modal-overlay')
    if (!content.isForm) {
        overlay.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <span class="modal-title"></span>
                <button class="exit-modal-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="modal-message">
            </div>
            <div class="modal-options">
            </div>
        </div>
        `
    } else {
        overlay.innerHTML = `
        <div class="modal-container">
            <div class="modal-header">
                <span class="modal-title"></span>
                <button class="exit-modal-btn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <form class="modal-form">
                <div class="modal-message">
                </div>
                <div class="modal-options">
                </div>
            </form>
        </div>
        `
    }
    let modalHeader = document.querySelector(".modal-header")
    let modalContent = document.querySelector(".modal-message")
    let modalOptions = document.querySelector('.modal-options')
    modalHeader.querySelector('.modal-title').textContent = content.title ?? "Empty Modal Text"
    modalContent.innerHTML = content.content ?? "Nothing to see here."
    if (!content.options || content.options.length === 0) {
        content.options = [{
            class: 'btn btn-primary',
            text: 'OK',
            action: function () {
                closeModal()
            }
        }]
    }
    if (content.options[0] === 'hidden') {
        modalOptions.classList.add('hidden')
    } else {
        for (item of content.options) {
            let button = document.createElement('button')
            button.className = item.class
            button.textContent = item.text
            button.addEventListener('click', item.action)
            modalOptions.appendChild(button)
        }
    }
}
function flushModal() {
    let modalHeader = document.querySelector(".modal-header")
    let modalContent = document.querySelector(".modal-message")
    let modalOptions = document.querySelector('.modal-options')
    if (modalHeader && modalContent && modalOptions) {
        modalHeader.querySelector('.modal-title').textContent = ""
        modalContent.innerHTML = ""
        modalOptions.innerHTML = ""
    }
}
function closeModal() {
    let overlay = document.querySelector('.modal-overlay')
    if (overlay) {
        overlay.remove()
    }
}