const dateTimeContainer = document.querySelector('.footer-datetime');
const exTendDateTimeContainer = document.querySelector('.datetime-extend');

function openExtendDateTime() {
    const isShow = exTendDateTimeContainer.classList.contains('hide');
    if(isShow) {
        exTendDateTimeContainer.classList.remove('hide');
        exTendDateTimeContainer.classList.add('show');
    }
}

function closeExtendDateTime(e) {
    if (!dateTimeContainer.contains(e.target) && !exTendDateTimeContainer.contains(e.target)) {
        exTendDateTimeContainer.classList.remove('show');
        exTendDateTimeContainer.classList.add('hide');
    }
}

dateTimeContainer.addEventListener("click", openExtendDateTime);
document.addEventListener("click", closeExtendDateTime);