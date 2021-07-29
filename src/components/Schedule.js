import React, { useEffect, createRef } from "react";
import LogIn from "./LogInComponent/LogIn";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import moment from "moment";
import { useState, useRef } from "react";
import { observer, inject } from "mobx-react";
import UserPopUp from "./UserPopUp";
const calendarRef = createRef();
const isAdmin = false;
let scheduleInfo = {};
//ScheduleStore
const serverApi = "http://localhost:8080";
const daysOfWeek = ["ראשון", "שני", "שליש", "רבעי", "חמישי", "שיש", "שבת"];
const Schedule = inject(
  "ScheduleStore",
  "LogInStore"
)(
  observer((props) => {
    const [showModal, setShowModal] = useState(false);
    const [event, setEvent] = useState(null);
    const [list, setList] = useState([]);
    const [clickedOnSchedule, setClickedOnSchedule] = useState(false);
    const toggle = (e) => {
      setShowModal(!e);
      console.log(showModal);
    };
    useEffect(async () => {
      await props.ScheduleStore.getSchedule();
    }, []);

    const handleClickDayname = (ev) => {
      console.log("************Click Day name***************");
      // view : week, day
      console.group("onClickDayname");
      console.log(ev.date);
      console.groupEnd();
    };

    // const changColor = () =>{

    // }
    const handleClickSchedule = (ev) => {
      console.log("************Click Schedule****************");
      console.log("%%%", ev);
      scheduleInfo = {
        userId: props.LogInStore.userId,
        scheduleId: ev.schedule.id,
        calendarId: ev.schedule.calendarId,
        start: new Date(ev.schedule.start._date).toISOString(),
        end: new Date(ev.schedule.end._date).toISOString(),
        title: ev.schedule.title,
      };
      console.log("%%%", scheduleInfo);
      if (isAdmin) {
        console.log(" admin clicled schedule ===> ");
        console.log(ev);
      } else {
        console.log(" trainee clicled schedule ===> ");
        setClickedOnSchedule(!clickedOnSchedule);
        console.log(ev);
      }
    };
    const changeScheduleColor = () => {
      // tawfiq new changes
      let userId = props.LogInStore.userId;
      props.ScheduleStore.changeScheduleColor(userId);
    };

    const handleClickMore = (event) => {
      console.log("************Click More***************");
      console.log("clickMore", event.date, event.target);
    };
    const handleBeforeDeleteSchedule = (ev) => {
      console.log("************Before Delete***************");
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
    const handleClickTimezonesCollapseBtn = (ev) => {};
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
      if (isAdmin) {
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
        console.log(new Date(startTime._date).toISOString());
        const newSchedule = {
          id: null,
          title: event.title,
          category: "time",
          dueDateClass: "",
          start: new Date(startTime._date).toISOString(),
          end: new Date(endTime._date).toISOString(),
          calendarId: parseInt(event.calendarId),
        };
        props.ScheduleStore.createNewSchedule(newSchedule);
      }
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
    const changeScheduleColor = () => {
      // tawfiq new changes
      let userId = props.LogInStore.userId;
      props.ScheduleStore.changeScheduleColor(userId);
    };
    return (
      <div>
        {
          <Calendar
            ref={calendarRef}
            height="900px"
            calendars={[
              {
                id: "0",
                name: "user",
                bgColor: "#40dfa0",
                borderColor: "#9e5fff",
              },
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
              },
              {
                id: "4",
                name: "InCourceColor",
                bgColor: "#3CD371",
                borderColor: "#3CD371",
              },
              {
                id: "5",
                name: "NotInCourcColor",
                bgColor: "#FF5800",
                borderColor: "#FF5800",
              },
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
            useDetailPopup={isAdmin}
            useCreationPopup={isAdmin}
            view={"week"} // You can also set the `defaultView` option.
            week={{
              showTimezoneCollapseButton: true,
              timezonesCollapsed: true,
            }}
          />
        }
        {clickedOnSchedule ? (
          <UserPopUp scheduleInfo={scheduleInfo}></UserPopUp>
        ) : null}
        <button onClick={handleCreateSchedule}>create schedule</button>
        <button onClick={handleClickNextButton}>Go next!</button>
        <button onClick={handleClickPrevButton}>Go Prev!</button>
        <button onClick={handleHide}>hide </button>
      </div>
    );
  })
);
export default Schedule;
