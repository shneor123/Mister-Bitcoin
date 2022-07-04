export const colorful = {
    mounted(el, binding) {
        el.addEventListener('input', () => setRandomColor(el))
    },
    unmounted(el, binding) {
        el.removeEventListener('input', () => setRandomColor(el))
    },
}
function setRandomColor(el) {
    el.style.backgroundColor = getRandomColor()
}
function getRandomColor() {
    var letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}
