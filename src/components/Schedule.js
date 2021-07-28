import React, { useEffect, createRef } from "react";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import moment from "moment";
import { useState, useRef } from "react";
import { observer, inject } from "mobx-react";
<<<<<<< HEAD
=======
const calendarRef = createRef();
>>>>>>> master
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
<<<<<<< HEAD
      console.log(" tmp proxy ", props.ScheduleStore.listSchedule.list);
=======
>>>>>>> master
    }, []);
    const handleClickDayname = (ev) => {
      // view : week, day
      console.group("onClickDayname");
      console.log(ev.date);
      console.groupEnd();
    };
    const handleClickSchedule = (ev) => {
      console.log(" clicled schedule ===> ");
      console.log(ev);
    };
    const handleClickMore = (event) => {
      console.log("clickMore", event.date, event.target);
    };
    const handleBeforeDeleteSchedule = (ev) => {
      let scheduleID = ev.schedule.id;
      let scheduleCalendarID = ev.schedule.calendarId;
      console.log("delete handle ", ev);
      console.log("->", scheduleID, "|", scheduleCalendarID);
      props.ScheduleStore.deleteSchedule({
        id: scheduleID,
        calendarId: scheduleCalendarID,
      });
    };
    const handleafterRenderSchedule = (ev) => {
      console.log("************After Render***************");
    };
    const handlebeforeUpdateSchedule = (ev) => {
      console.log("************BEFORE UPDATE***************");
      console.log(ev);
    };
    const handleClickTimezonesCollapseBtn = (ev) => {
      // console.log("XXXXXXXXXXX++++++++++XXXXXXXXX");
    };
    const handleClickNextButton = () => {
      const calendarInstance = calendarRef.current.getInstance();
      calendarInstance.next();
    };
    const handleClickPrevButton = () => {
      const calendarInstance = calendarRef.current.getInstance();
      calendarInstance.prev();
    };
    const handleCreateSchedule = () => {
      const calendarInstance = calendarRef.current.getInstance();
      calendarInstance.openCreationPopup({});
    };
    const handleHide = () => {
      const calendarInstance = calendarRef.current.getInstance();
      calendarInstance.toggleTaskView(false);
    };
    const handlebeforeCreateSchedule = (event) => {

      var startTime = event.start;
      var endTime = event.end;
      var isAllDay = event.isAllDay;
      var guide = event.guide;
      var triggerEventName = event.triggerEventName;
      console.log(startTime, endTime, isAllDay, guide, triggerEventName);
      // var schedule;
      // console.log("-----<<<<<<", event);

      console.log("---startTime--<<<<<", event);
      // console.log("--- endTime--<<<<<<", endTime);
      console.log(new Date(startTime._date).toISOString())
      const newSchedule = {
        id: null,
        title: event.title,
        category: "time",
        dueDateClass: "",
        start: new Date(startTime._date).toISOString(),
        end: new Date(endTime._date).toISOString(),
        calendarId: parseInt(event.calendarId)


<<<<<<< HEAD
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
=======
      }
      props.ScheduleStore.createNewSchedule(newSchedule)
>>>>>>> master








      //   if (triggerEventName === "click") {
      //     const title = prompt("Schedule", "Party");
      //     const schedule = {
      //       id: +new Date(),
      //       calendarId: "1",
      //       title: title, // title!!!!!!!!
      //       isAllDay: false,
      //       start: event.start,
      //       end: event.end,
      //       category: "time",
      //     };
      //   } else if (triggerEventName === "dblclick") {
      //     // open writing detail schedule popup
      //   }
      //   //  calendar.createSchedules([schedule]);
    };
    return (
      <div>
        <Calendar
          ref={calendarRef}
          height="900px"
          calendars={[
            {
              id: "1",
              name: "Private",
              bgColor: "#9e5fff",
              borderColor: "#9e5fff",
            },
            {
              id: "2",
              name: "Company",
              bgColor: "#0E4BBF",
              borderColor: "#0E4BBF",
            },
            {

              id: "3",
              name: "mma",
              bgColor: "#2ABF0E",
              borderColor: "#2ABF0E",
            }
          ]}
          disableDblClick={true}
          disableClick={false}
          isReadOnly={false}
          Z
          month={{
            startDayOfWeek: 0,
          }}
          schedules={props.ScheduleStore.computedList}
          scheduleView
          taskView
          onClickDayname={handleClickDayname}
          onClickSchedule={handleClickSchedule}
          onClickMore={handleClickMore}
          onClickTimezonesCollapseBtn={handleClickTimezonesCollapseBtn}
          onBeforeDeleteSchedule={handleBeforeDeleteSchedule}
          onAfterRenderSchedule={handleafterRenderSchedule}
          onBeforeUpdateSchedule={handlebeforeUpdateSchedule}
          onBeforeCreateSchedule={handlebeforeCreateSchedule}
          template={{
            milestone(schedule) {
              return `<span style="color:#fff;background-color: ${schedule.bgColor};">${schedule.title}</span>`;
            },
            milestoneTitle() {
              return "Milestone";
            },
            allday(schedule) {
              return `${schedule.title}<i class="fa fa-refresh"></i>`;
            },
            alldayTitle() {
              return "All Day";
            },
          }}

          useDetailPopup
          useCreationPopup
          view={"week"} // You can also set the `defaultView` option.
          week={{
            showTimezoneCollapseButton: true,
            timezonesCollapsed: true,
          }}
        />
        <button onClick={handleCreateSchedule}>create schedul</button>
        <button onClick={handleClickNextButton}>Go next!</button>
        <button onClick={handleClickPrevButton}>Go Prev!</button>
        <button onClick={handleHide}>hide </button>
      </div>
    );
  })
);
export default Schedule;