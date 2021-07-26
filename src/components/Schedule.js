import React, { useEffect } from 'react'
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import eventSchedule from '../config/events';
import calenderType from '../config/calenderType';
import moment from 'moment';
import { useState, useRef } from 'react';
import onClickListener from '../config/helper'
import ModalCustom from './ModalCustom';
import { observer, inject } from 'mobx-react'

//ScheduleStore

const daysOfWeek = ["ראשון", "שני", "שליש", "רבעי", "חמישי", "שיש", "שבת"]
const Schedule = inject("ScheduleStore")(observer((props) => {
    const [showModal, setShowModal] = useState(false);
    const [event, setEvent] = useState(null);
    const toggle = (e) => { setShowModal(!e); console.log(showModal) }
    // const []
    useEffect(() => {
        props.ScheduleStore.getSchedule()
        console.log("use effect",props.ScheduleStore.listSchedule)

    }, [])
 

    var calendar = new Calendar('#calendar', {
        bgColor: "red",

        calendars: calenderType,

        defaultView: 'week',
        taskView: true,
        popupDetailDate: function (isAllDay, start, end) {
            var isSameDate = moment(start).isSame(end);
            var endFormat = (isSameDate ? '' : 'YYYY.MM.DD ') + 'hh:mm a';

            if (isAllDay) {
                return moment(start).format('YYYY.MM.DD') + (isSameDate ? '' : ' - ' + moment(end).format('YYYY.MM.DD'));
            }

            return (moment(start).format('YYYY.MM.DD hh:mm a') + ' - ' + moment(end).format(endFormat));
        },
        //         template: {


        // //////////////////////////////////////////////////
        //             month: {
        //                 dayname: daysOfWeek,
        //                 startDayOfWeek: 0
        //             }

        //         }



    });

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




    console.log("----------------------", eventSchedule)

    calendar.createSchedules(eventSchedule);

    /////=======================update by draging ============
    calendar.on('beforeUpdateSchedule', function (event) {
        const schedule = event.schedule;
        const changes = event.changes;
        calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });
    ////////////////////////////////////
    calendar.on({
        'clickSchedule': function (e) {
            console.log('clickSchedule', e);
        },
        'beforeCreateSchedule': function (e) {
            console.log('beforeCreateSchedule', e);


            /* step1. open custom edit popup */
            /*
              You need to open the modal window first and enter the title information!
            */
            // ex...

            const title = prompt('Schedule', 'Party');

            const schedule = {
                id: +new Date(),
                calendarId: '1',
                title: title, // title!!!!!!!!
                isAllDay: false,
                start: e.start,
                end: e.end,
                category: 'time'
            };

            calendar.createSchedules([schedule]);
            props.ScheduleStore.handleAlertModalChange()

            /* step3. clear guide element */
            e.guide.clearGuideElement();
        },

        'beforeUpdateSchedule': function (e) {
            console.log('beforeUpdateSchedule', e);
            e.schedule.start = e.start;
            e.schedule.end = e.end;
            calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
        },
        'beforeDeleteSchedule': function (e) {
            console.log('beforeDeleteSchedule', e);
            calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
        }
    });


    //================================



    ////======================================== addded event listener 

    // onClickListener(calendar)
    //========================================

    // calendar.on('clickMore', function(event) {
    //     console.log('clickMore', event.date, event.target);
    // });

    // const popup=openCreationPopup()




    return (
        <div>
            <div id="calendar" style={{ height: "80px" }}></div>
            {

                // <ModalCustom></ModalCustom>
                <ModalCustom ></ModalCustom>
            }
        </div>

    )

}))

export default Schedule
