import React, { useEffect } from "react";
import Calendar from "tui-calendar"; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import eventSchedule from "../config/events";
import calenderType from "../config/calenderType";
import moment from "moment";
import { useState, useRef } from "react";
import onClickListener from "../config/helper";
import ModalCustom from "./ModalCustom";
import { observer, inject } from "mobx-react";
import axios from "axios";
import { toJS } from "mobx";
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
      const tempdata  =await props.ScheduleStore.getSchedule();
      console.log(" tmp proxy ttt  ",tempdata);

      // console.log(" tmp proxy ", props.ScheduleStore.computedList);
    }, []);


    var calendar = new Calendar("#calendar", {


      defaultView: 'week',
      taskView: true,
      template: {
        monthDayname: function(dayname) {
          return '<span class="calendar-week-dayname-name">' + dayname.label + '</span>';
        }}
    });

    calendar.createSchedules(props.ScheduleStore.computedList);

    /////=======================update by draging ============
    calendar.on("beforeUpdateSchedule", function (event) {
      const schedule = event.schedule;
      const changes = event.changes;
      calendar.updateSchedule(schedule.id, schedule.calendarId, changes);
    });
    ///////////////// on clicke create new schedule ///////////////////
    calendar.on({
      clickSchedule: function (e) {
        console.log("clickSchedule", e);
      },
      beforeCreateSchedule: function (e) {
        console.log("beforeCreateSchedule", e);

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
