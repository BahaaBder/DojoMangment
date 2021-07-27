
const mma=" MMA Mixed martil Art "
const bjj="brazilian jiu jitsu"
const boxing=" classic boxing "
const yoga=" yoga classes "
const eventSchedule= [
    {
        id: '1',
        calendarId: '1',
        title: mma,
        category: 'time',
        dueDateClass: '',
        start: '2021-07-25T19:30:00+01:00',
        end: '2021-07-25T21:30:00+01:00'
    },
    {
        id: '2',
        calendarId: '1',
        title: mma,
        category: 'time',
        dueDateClass: '',
        start: '2021-07-27T19:30:00+01:00',
        end: '2021-07-27T21:30:00+01:00'
    },
    {
        id: '3',
        calendarId: '1',
        title: mma,
        category: 'time',
        dueDateClass: '',
        start: '2021-07-29T19:30:00+01:00',
        end: '2021-07-29T21:30:00+01:00'
    },///// boxing 
    {
        id: '4',
        calendarId: '2',
        title: boxing,
        category: 'time',
        dueDateClass: '',
        start: '2021-07-26T16:30:00+01:00',
        end: '2021-07-26T20:30:00+01:00',
        isReadOnly: true    // schedule is read-only
    },
    {
        id: '5',
        calendarId: '2',
        title: boxing,
        category: 'time',
        dueDateClass: '',
        start: '2021-07-28T16:30:00+01:00',
        end: '2021-07-28T20:30:00+01:00',
    },
    /// bjj
    {
        id: '6',
        calendarId: '3',
        title: bjj,
        category: 'time',
        dueDateClass: '',
        start: '2021-07-30T16:30:00+01:00',
        end: '2021-07-30T20:30:00+01:00',
        ///// this determine  the color of event background 
        bgColor:'#BF0E13'
    },
    ///
    {
        id: '7',
        calendarId: '4',
        title: " takewondo ",
        category: 'time',
        dueDateClass: '',
        start: '2021-07-25T09:30:00+01:00',
        end: '2021-07-25T11:30:00+01:00'
    },

    {
        id: '8',
        calendarId: '4',
        title: " taekwondo  ",
        category: 'time',
        dueDateClass: '',
        start: '2021-07-26T09:30:00+01:00',
        end: '2021-07-26T11:30:00+01:00'
    },
    {
        id: '9',
        calendarId: '4',
        title: " taekwondo  ",
        category: 'time',
        dueDateClass: '',
        start: '2021-07-28T09:30:00+01:00',
        end: '2021-07-28T12:30:00+01:00'
    },
]

export default eventSchedule

///////////////////////

    //=============================================event handlers==========================

    // calendar.on('beforeCreateSchedule', function(event) {
    //     var startTime = event.start;
    //     var endTime = event.end;
    //     var isAllDay = event.isAllDay;
    //     var guide = event.guide;
    //     var triggerEventName = event.triggerEventName;
    //     var schedule;

    //     if (triggerEventName === 'click') {
    //         // open writing simple schedule popup
    //         const inputPromet=prompt(" enter shit ")
    //         schedule = {...inputPromet};
    //     } else if (triggerEventName === 'dblclick') {
    //         // open writing detail schedule popup
    //         const inputPromet=prompt(" enter shit ")
    //         schedule = {...inputPromet};
    //     }
    //     console.log(" schedulr ",schedule)

    //     calendar.createSchedules([schedule]);
    // });

    // console.log("000000000000000000000000000000000000")
    // console.log("----------------------", eventSchedule)
    // console.log("----------------------", JSON.parse(JSON.stringify((props.ScheduleStore.listSchedule))))

    // const arr = [
    //     {
    //         "calenderId": "1",
    //         category: "time",
    //         duDateClass: "",
    //         end: "2021-07-29T21:30:00+01:00",
    //         id: "3",
    //         start: "2021-07-29T19:30:00+01:00",
    //         title: "MMA Mixed Martil art "
    //     },
    //     {
    //         calenderId: "1",
    //         category: "time",
    //         duDateClass: "",
    //         end: "2021-07-25T19:30:00+01:00",
    //         id: "1",
    //         start: "2021-07-25T19:30:00+01:00",
    //         title: "MMA Mixed Martil art "
    //     }
    // ]
    // const temparr = JSON.parse(JSON.stringify((props.ScheduleStore.listSchedule)))
    // const arrnew=[...temparr]
    // console.log(" temparr ", temparr)

    // console.log( arrnew)

    // calendar.createSchedules(props.ScheduleStore.computedVar);

    // calendar.createSchedules(JSON.parse(JSON.stringify((props.ScheduleStore.listSchedule))));
