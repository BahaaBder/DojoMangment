import React, { useEffect, createRef } from "react";
import LogIn from "./LogInComponent/LogIn";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import moment from "moment";
import { useState, useRef } from "react";
import { observer, inject } from "mobx-react";
import UserPopUp from "./UserPopUp";
import dayjs from "dayjs";
import axios from "axios";

const calendarRef = createRef();
let scheduleInfo = {};
//ScheduleStore
const serverApi = "http://localhost:8080";

let isAdminTemp = false;
const Schedule = inject(
  "ScheduleStore",
  "LogInStore"
)(
  observer((props) => {
    // const [showModal, setShowModal] = useState(false);
    // const [event, setEvent] = useState(null);
    // const [list, setList] = useState([]);
    const [clickedOnSchedule, setClickedOnSchedule] = useState(false);
    const [isAdmin, setIsAdmin] = useState(true);
    const [calendarsArray, setCalendarsArray] = useState([]);

    useEffect(() => {
      console.log("******** USE EFFECT *********");

      async function fecthMyApi() {
        let has_permissoin = await props.ScheduleStore.checkPermission("admin");
        await props.ScheduleStore.getSchedule();
        let departments = await props.ScheduleStore.getDepartments();
        setCalendarsArray(getCalenders(departments, has_permissoin));

        setIsAdmin(has_permissoin);
      }
      fecthMyApi();
    }, []);
    useEffect(() => {}, [isAdmin]);

    const handleClickDayname = (ev) => {
      console.log("************Click Day name***************");
      // view : week, day
      console.group("onClickDayname");
      console.log(ev.date);
      console.groupEnd();
    };

    const handleClickSchedule = (ev) => {
      console.log("************Click Schedule****************");
      scheduleInfo = {
        userId: props.LogInStore.userId,
        scheduleId: ev.schedule.id,
        start: dayjs(ev.schedule.start._date.toString()).format(
          "dddd, MMMM D, YYYY h:mm A"
        ),
        end: dayjs(ev.schedule.end._date.toString()).format(
          "dddd, MMMM D, YYYY h:mm A"
        ),
        title: ev.schedule.title,
      };
      console.log("%%%", scheduleInfo);
      if (props.ScheduleStore.computedIsAdmin) {
        console.log(" admin clicled schedule ===> ");
      } else {
        console.log(" trainee clicled schedule ===> ");
        setClickedOnSchedule(!clickedOnSchedule);
      }
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
        schedule_id: ev.schedule.id,
      });
    };
    const handleafterRenderSchedule = (ev) => {};
    const handlebeforeUpdateSchedule = (ev) => {
      console.log("************BEFORE UPDATE***************");
      console.log("$ BF : ", ev);
      let updatedSchedule = {
        schedule_id: ev.schedule.id,
        department_id: parseInt(ev.changes.calendarId),
        start: new Date(ev.start._date).toISOString(),
        end: new Date(ev.end._date).toISOString(),
        title: ev.changes.title,
        dueDateClass: ev.schedule.dueDateClass,
        category: ev.schedule.category,
      };
      console.log("object :", updatedSchedule);
      props.ScheduleStore.updateSchedule(updatedSchedule);
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
        console.log("---startTime--<<<<<", event);
        if (event.title === undefined) {
          return;
        }
        const newSchedule = {
          id: null,
          title: event.title,
          category: "time",
          dueDateClass: "",
          start: new Date(startTime._date).toISOString(),
          end: new Date(endTime._date).toISOString(),
          department_id: parseInt(event.calendarId),
        };
        props.ScheduleStore.createNewSchedule(newSchedule);
      } else {
        alert(" user has no  premisssion ");
      }
    };

    // id: "1",
    //             name: "MMA Mixed Martil art",
    //             bgColor: "#40dfa0",
    //             borderColor: "#303030",

    const getCalenders = (departments, has_permissoin) => {
      let calendarsArray = [];
      const userCalender = {
        id: "0",
        name: "user",
        bgColor: "#d1d8e0",
        borderColor: "#2c3e50",
      };
      if (!has_permissoin) {
        calendarsArray.push(userCalender);
      }

      departments.forEach((d) => {
        const calendar = {};
        calendar.id = d.id.toString();
        calendar.name = d.name;
        calendar.bgColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        calendar.borderColor = "#2c3e50";
        calendarsArray.push(calendar);
      });

      return calendarsArray;
    };
    console.log("----", isAdmin);
    return (
      <div>
        {isAdmin === true ? (
          <Calendar
            ref={calendarRef}
            height="900px"
            calendars={calendarsArray}
            disableDblClick={true}
            disableClick={false}
            isReadOnly={false}
            useDetailPopup={true}
            useCreationPopup={true}
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
            view={"week"} // You can also set the `defaultView` option.
            week={{
              showTimezoneCollapseButton: true,
              timezonesCollapsed: true,
            }}
          />
        ) : (
          <Calendar
            ref={calendarRef}
            height="900px"
            calendars={calendarsArray}
            disableDblClick={true}
            disableClick={false}
            isReadOnly={false}
            useDetailPopup={false}
            useCreationPopup={false}
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
            view={"week"} // You can also set the `defaultView` option.
            week={{
              showTimezoneCollapseButton: true,
              timezonesCollapsed: true,
            }}
          />
        )}
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
