const date = new Date();

const renderCalendar = () => {
    const monthDays = document.querySelector(".days");
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML = date.toDateString();

    date.setDate(1);

    // Get the last day of the current month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    const firstDayIndex = date.getDay();

    const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    const nextDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
    const nextDays = 7 - nextDayIndex - 1;

    let days = "";

    for (let i = firstDayIndex; i > 0; i--) {
        days += `<div class="prev-date">${prevLastDay - i + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        let dayClass = "";
        if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()) {
            dayClass = "today";
        } else if (new Date(date.getFullYear(), date.getMonth(), i).getDay() === 0) {
            dayClass = "sunday";
        } else if (new Date(date.getFullYear(), date.getMonth(), i).getDay() === 6) {
            dayClass = "saturday";
        }
        days += `<div class="${dayClass}">${i}</div>`;
    }

    for (let i = 1; i <= nextDays; i++) {
        days += `<div class="next-date">${i}</div>`;
    }

    monthDays.innerHTML = days;
}

document.querySelector('.prev').addEventListener('click', () => {
    const currentMonth = date.getMonth();
    date.setMonth(date.getMonth() - 1);
    // Adjust year only if going back from January
    if (currentMonth === 0) {
        date.setFullYear(date.getFullYear() - 1);
    }
    renderCalendar();
});

document.querySelector('.next').addEventListener('click', () => {
    const currentMonth = date.getMonth();
    date.setMonth(date.getMonth() + 1);
    // Adjust year only if going from January to December
    if (date.getMonth() === 0 && currentMonth !== 0) {
        date.setFullYear(date.getFullYear()+1);
    }
    renderCalendar();
});

renderCalendar();
