import React, { useEffect, createRef } from "react";
import Calendar from "@toast-ui/react-calendar";
import "tui-calendar/dist/tui-calendar.css";
import { useState} from "react";
import { observer, inject } from "mobx-react";
import UserPopUp from "./UserPopUp";
import dayjs from "dayjs";
import "./../App.css";
import AdminPopUp from "./PupUp/AdminPopUp";

import CreateSchedulePopUp from "./PupUp/CreateSchedulePopUp";
const themeConfig = require("./ThemConfig");
const calendarRef = createRef();
let scheduleInfo = {};
//ScheduleStore

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
    const [isSignin, setSignin] = useState(false);
    // const [createSchedule, setCreateSchedule] = useState(false);
    const [showUpdatePopUp, setShowUpdatePopUp] = useState(false)
    const [selectedSchedule, setSelectedSchedule] = useState({})
    const [showCreatePopUp, setShowCreatePopUp] = useState(false)
    const [selectedDate, setSelectedDate] = useState({})

    useEffect(() => {
      console.log("******** USE EFFECT *********");
      async function fecthMyApi() {
        let has_permissoin = await props.ScheduleStore.checkPermission("admin");
        await props.ScheduleStore.getSchedule();
        let departments = await props.ScheduleStore.getDepartments();
        setCalendarsArray(getCalenders(departments, has_permissoin));
        setSignin(props.LogInStore.isSign);
        setIsAdmin(has_permissoin);
      }
      fecthMyApi();
      handleHide();
    }, []);
    useEffect(() => { }, [isAdmin]);

    const handleClickDayname = (ev) => {
      console.log("************Click Day name***************");
      // view : week, day
      console.group("onClickDayname");
      console.log(ev.date);
      console.groupEnd();
    };

    const handleClickSchedule = async (ev) => {
      console.log("************Click Schedule****************");

      if (isSignin) {


        const tempDepartmentId = await props.ScheduleStore.getScheduleDepartment(ev.schedule.id)
        scheduleInfo = {
          userId: props.LogInStore.userId,
          schedule_id: ev.schedule.id,
          start: dayjs(ev.schedule.start._date.toString()).format(
            "dddd, MMMM D, YYYY h:mm A"
          ),
          end: dayjs(ev.schedule.end._date.toString()).format(
            "dddd, MMMM D, YYYY h:mm A"
          ),
          title: ev.schedule.title,
          department_id: tempDepartmentId,
          category:"time"
        };
        ////////-----------------------------------
        const scheduleInfoUpdate = {
          userId: props.LogInStore.userId,
          schedule_id: ev.schedule.id,

          start: dayjs(ev.schedule.start._date.toString()).format("YYYY-MM-DDThh:mm"),

          end: dayjs(ev.schedule.end._date.toString()).format("YYYY-MM-DDThh:mm"),
          title: ev.schedule.title,
          department_id: tempDepartmentId,
          category: "time",
          dueDateClass: ""
        };
        if (isAdmin) {

          setSelectedSchedule(scheduleInfoUpdate)
          setShowUpdatePopUp(!showUpdatePopUp)

        } else {
          setClickedOnSchedule(!clickedOnSchedule);
        }
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

    const handleCloseModal = () => {
      setShowUpdatePopUp(!showUpdatePopUp)

    }
    const handleBeforeUpdateSchedule = (ev) => {
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

    };

    const handleClickTimezonesCollapseBtn = (ev) => { };
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
    const handleBeforeCreateSchedule = (event) => {   
      if (isAdmin) {
        const scheduleInfo = {
          start: dayjs(event.start._date.toString()).format("YYYY-MM-DDThh:mm"),
          end: dayjs(event.end._date.toString()).format("YYYY-MM-DDThh:mm"),
      
        };
    
        setShowCreatePopUp(!showCreatePopUp)
        setSelectedDate(scheduleInfo)
      } else {
        alert(" user has no  premisssion ");
      }
    };

    const getCalenders = (departments, has_permissoin) => {
      let calendarsArray = [];
      const userCalender = {
        isAllDay: false,
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
        calendar.isAllDay = false;
        calendar.bgColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        calendar.borderColor = "#2c3e50";
        calendarsArray.push(calendar);
      });

      return calendarsArray;
    };
    // const info = {
    //   "id": 1,
    //   "title": "MMA Mixed Martil art ",
    //   "category": "time",
    //   "duDateClass": "",
    //   "start": "2021-07-25T12:00:00.000Z",
    //   //2017-05-24T10:30
    //   "end": "2021-07-25T14:30:00.000Z",
    //   "department_id": 1
    // }
    const handleCloseCreatePopUp=()=>{
      setShowCreatePopUp(!showCreatePopUp)
    }

    return (
      <div className="calendar">

        <Calendar
          ref={calendarRef}
          height="900px"
          theme={themeConfig}
          calendars={calendarsArray}
          disableDblClick={true}
          disableClick={false}
          isReadOnly={!isSignin}
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
          onBeforeUpdateSchedule={handleBeforeUpdateSchedule}
          onBeforeCreateSchedule={handleBeforeCreateSchedule}
          views={["week", "day"]}
          week={{
            showTimezoneCollapseButton: true,
            timezonesCollapsed: true,
          }}
          timezones={[
            {
              timezoneOffset: "UTC +3",
              displayLabel: "GMT+09:00",
              tooltip: "Seoul",
            },
          ]}
        />
        {clickedOnSchedule ? (
          <UserPopUp scheduleInfo={scheduleInfo}></UserPopUp>
        ) : null}
        CreateSchedulePopUp
        {showUpdatePopUp ? <AdminPopUp handleCloseModal={handleCloseModal} show={true} scheduleInfo={selectedSchedule}></AdminPopUp> : null}
        {showCreatePopUp ? <CreateSchedulePopUp handleCloseModal={handleCloseCreatePopUp} show={true} scheduleInfo={selectedDate}></CreateSchedulePopUp> : null}

        <button onClick={handleCreateSchedule}>create schedule</button>
        <button onClick={handleClickNextButton}>Go next!</button>
        <button onClick={handleClickPrevButton}>Go Prev!</button>
        <button onClick={handleHide}>hide </button>
      </div>
    );
  })
);
export default Schedule;
