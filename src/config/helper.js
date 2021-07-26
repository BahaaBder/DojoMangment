
let lastClickSchedule = {}

const onClickListener = (calendar)=>{
    calendar.on('clickSchedule', function (event) {
    var schedule = event.schedule;
    console.log("you clicked ", schedule)

    // focus the schedule
    if (lastClickSchedule) {
        calendar.updateSchedule(lastClickSchedule.id, lastClickSchedule.calendarId, {
            isFocused: false
        });
    }
    calendar.updateSchedule(schedule.id, schedule.calendarId, {
        isFocused: true
    });



    lastClickSchedule = schedule;

    // open detail view
});

}
export default onClickListener