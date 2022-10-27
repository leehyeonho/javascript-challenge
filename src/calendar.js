const calendarContainer = document.querySelector(".datetime-extend__calendar__calendar .calendar");

function getCalendar(year, month) {
    const calendarDate = new Date(year, month, 1);
    console.log(`calendarDate: ${calendarDate}`);
    const calendarYear = calendarDate.getFullYear();
    const calendarMonth = calendarDate.getMonth()+1;
    const calendarStartDayOfTheWeek = calendarDate.getDay();
    console.log(`calendarStartDayOfTheWeek: ${calendarStartDayOfTheWeek}`);

    const calendarLastDate = new Date(year, month+1, 0);
    const calendarLastDay = calendarLastDate.getDate();
    console.log(`calendarLastDay: ${calendarLastDay}`);
    
    const monthLastDate = new Date(year, month, 0);
    console.log(`monthLastDate: ${monthLastDate}`);

    const calendarWeekCount = Math.ceil((calendarStartDayOfTheWeek + calendarLastDay) / 7);
    // calendarContainer.querySelector(".blank").remove();
    // calendarContainer.querySelector(".day").remove();
    for (let i = calendarStartDayOfTheWeek; i > 0; i--) {
        const tag = document.createElement("li")
        tag.classList.add("calendar-item","blank");
        tag.innerText = calendarLastDay-i;
        calendarContainer.appendChild(tag);
    }
    for (let i = 1; i <= calendarLastDay; i++) {
        const tag = document.createElement("li")
        tag.classList.add("calendar-item","day");
        if(i == thisDay) {
            tag.classList.add("today");
        }
        tag.innerText = i;
        calendarContainer.appendChild(tag);
    }
}

function init() {
    getCalendar(thisYear,thisMonth);
}

init();