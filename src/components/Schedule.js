import React, { useEffect } from "react";
import Calendar from "tui-calendar"; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import moment from "moment";
import { useState, useRef } from "react";
import { observer, inject } from "mobx-react";
//ScheduleStore
const serverApi = "http://localhost:8080";

const daysOfWeek = ["ראשון", "שני", "שליש", "רבעי", "חמישי", "שיש", "שבת"];
const Schedule = inject("ScheduleStore")(
  observer((props) => {
    const [showModal, setShowModal] = useState(false);
    const [event, setEvent] = useState(null);
    const [list, setList] = useState([]);
    const toggle = (e) => {
      setShowModal(!e);
      console.log(showModal);
    };
    useEffect(async () => {
      await props.ScheduleStore.getSchedule();
      console.log(" tmp proxy ", props.ScheduleStore.listSchedule.list);
    }, []);


    var calendar = new Calendar("#calendar", {


      defaultView: "month",
      taskView: true,
      popupDetailDate: function (isAllDay, start, end) {
        var isSameDate = moment(start).isSame(end);
        var endFormat = (isSameDate ? "" : "YYYY.MM.DD ") + "hh:mm a";

        if (isAllDay) {
          return (
            moment(start).format("YYYY.MM.DD") +
            (isSameDate ? "" : " - " + moment(end).format("YYYY.MM.DD"))
          );
        }

        return (
          moment(start).format("YYYY.MM.DD hh:mm a") +
          " - " +
          moment(end).format(endFormat)
        );
      },
              template: {

                  month: {
                      dayname: daysOfWeek,
                      startDayOfWeek: 0
                  }

              }
    });

    calendar.createSchedules(props.ScheduleStore.computedList);

    /////=======================update by draging ============
    calendar.on("beforeUpdateSchedule", function (event) {
      const schedule = event.schedule;
      const changes = event.changes;
      calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });
    ////////////////////////////////////
    calendar.on({
      clickSchedule: function (e) {
        console.log("clickSchedule", e);
      },
      beforeCreateSchedule: function (e) {
        // console.log("beforeCreateSchedule", e);

        /* step1. open custom edit popup */
        /*
              You need to open the modal window first and enter the title information!
            */
        // ex...

        const title = prompt("Schedule", "Party");

        const schedule = {
          id: +new Date(),
          calendarId: "1",
          title: title, // title!!!!!!!!
          isAllDay: false,
          start: e.start,
          end: e.end,
          category: "time",
        };

        calendar.createSchedules([schedule]);
        props.ScheduleStore.handleAlertModalChange();

        /* step3. clear guide element */
        e.guide.clearGuideElement();
      },

      beforeUpdateSchedule: function (e) {
        console.log("beforeUpdateSchedule", e);
        e.schedule.start = e.start;
        e.schedule.end = e.end;
        calendar.updateSchedule(
          e.schedule.id,
          e.schedule.calendarId,
          e.schedule
        );
      },
      beforeDeleteSchedule: function (e) {
        console.log("beforeDeleteSchedule", e);
        calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      },
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
      <div >
      {

        <div id="calendar" style={{ height: "80px" }}></div>
      }
        {
          // <ModalCustom></ModalCustom>
          // <ModalCustom></ModalCustom>
        }
      </div>
    );
  })
);

export default Schedule;
