/**
 * calendar
 */
const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];
const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// calendar body
const calendarContainer = document.querySelector('div.calendar');
let calTitle = document.createElement('div');
calTitle.className = 'calTitle';

let prevMonth = document.createElement('i');
prevMonth.className = 'fa fa-angle-double-left';
prevMonth.addEventListener('click', () => {
    previous();
});

let calendarMonth = document.createElement('span');
calendarMonth.className = 'calendarMonth';

let nextMonth = document.createElement('i');
nextMonth.className = 'fa fa-angle-double-right';
nextMonth.addEventListener('click', () => {
    next();
});

calTitle.appendChild(prevMonth);
calTitle.appendChild(calendarMonth);
calTitle.appendChild(nextMonth);

calendarContainer.appendChild(calTitle);

let calDays = document.createElement('div');
calDays.className = 'calDays';

showCalendar(currentMonth, currentYear);

function next() {
    currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    showCalendar(currentMonth, currentYear);
}

function previous() {
    currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    showCalendar(currentMonth, currentYear);
}
//how many days
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function showCalendar(month, year) {
    let firstDay = new Date(year, month).getDay();

    calDays.innerHTML = '';

    daysOfWeek.forEach((day) => {
        let spanDay = document.createElement('span');
        spanDay.className = 'dayTitle';
        spanDay.innerHTML = day;
        calDays.appendChild(spanDay);
    });

    calendarMonth.innerHTML = months[month] + ' ' + year;

    let date = 1;
    for (let i = 0; i < 30; i++) {
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                let day = document.createElement('span');
                day.className = 'day';
                day.innerHTML = '';
                calDays.appendChild(day);
            } else if (date > daysInMonth(month, year)) {
                break;
            } else {
                let day = document.createElement('span');
                day.className = 'day';
                day.innerHTML = date;
                day.style.cursor = 'pointer';

                if (
                    date === today.getDate() &&
                    year === today.getFullYear() &&
                    month === today.getMonth()
                ) {
                    day.style.background = '#006fae';
                    day.style.color = 'white';

                    day.addEventListener('mouseover', () => {
                        day.style.background = '#063b5a';
                        day.style.color = '#fff';
                    });
                    day.addEventListener('mouseout', () => {
                        day.style.background = '#006fae';
                        day.style.color = 'white';
                    });
                } else {
                    day.addEventListener('mouseover', () => {
                        day.style.background = '#0c88cfee';
                        day.style.color = '#fff';
                    });
                    day.addEventListener('mouseout', () => {
                        day.style.background = 'initial';
                        day.style.color = 'initial';
                    });
                }

                calDays.appendChild(day);
                date++;
            }
        }
    }
}
calendarContainer.appendChild(calDays);

let upcomingTitle = document.createElement('p');
upcomingTitle.className = 'upcomingTitle';
upcomingTitle.innerHTML = 'Upcoming Events';
calendarContainer.appendChild(upcomingTitle);

let upcoming = document.createElement('div');
upcoming.className = 'upcoming';

for (let i = 0; i < 5; i++) {
    let events = document.createElement('div');
    events.className = 'event';
    events.innerHTML =
        '<span class="eventIcon"><i class="fa fa-calendar-check-o" aria-hidden="true"></i></span>' +
        '<div class="value">' +
        '<p class="eventTitle">Operating Systems II</p><p class="eventValue">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores consectetur ea</p>' +
        '</div>';
    upcoming.appendChild(events);
}
calendarContainer.appendChild(upcoming);