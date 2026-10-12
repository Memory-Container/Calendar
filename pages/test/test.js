let teleporter = document.querySelectorAll('.teleporter');
teleporter.forEach(element => {
    element.addEventListener('click', () => {
        let targetSelector = element.getAttribute('data-target');
        location.href = `/pages/${targetSelector}`;
    });
});