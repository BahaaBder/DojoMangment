// import React, { Component } from "react";
// import React, { useEffect, createRef } from "react";
// import LogIn from "./LogInComponent/LogIn";
// import Calendar from "@toast-ui/react-calendar";
// import "tui-calendar/dist/tui-calendar.css";
// import moment from "moment";
// import { useState, useRef } from "react";
// import { observer, inject } from "mobx-react";
// import UserPopUp from "./UserPopUp";
// import dayjs from "dayjs";
// import axios from "axios";
// const calendarRef = createRef();
// let scheduleInfo = {};
// class Schedule2 extends Component {
//   constructor() {
//     super();
//     this.state = {
//       isAdmin: false,
//       clickedOnSchedule: false,
//       calendarsArray: [],
//     };
//   }
//   componentDidMount = async () => {
//     console.log("******** USE EFFECT *********");
//     let has_permissoin = await this.props.ScheduleStore.checkPermission(
//       "admin"
//     );

//     await this.props.ScheduleStore.getSchedule();
//     let departments = await this.props.ScheduleStore.getDepartments();

//     await this.setState({
//       isAdmin: has_permissoin,
//       calendarsArray: this.getCalenders(departments, has_permissoin),
//     });
//   };
//   handleClickDayname = (ev) => {
//     console.log("************Click Day name***************");
//     // view : week, day
//     console.group("onClickDayname");
//     console.log(ev.date);
//     console.groupEnd();
//   };

//   handleClickSchedule = (ev) => {
//     console.log("************Click Schedule****************");
//     scheduleInfo = {
//       userId: this.props.LogInStore.userId,
//       scheduleId: ev.schedule.id,
//       start: dayjs(ev.schedule.start._date.toString()).format(
//         "dddd, MMMM D, YYYY h:mm A"
//       ),
//       end: dayjs(ev.schedule.end._date.toString()).format(
//         "dddd, MMMM D, YYYY h:mm A"
//       ),
//       title: ev.schedule.title,
//     };
//     console.log("%%%", scheduleInfo);
//     if (this.props.ScheduleStore.computedIsAdmin) {
//       console.log(" admin clicled schedule ===> ");
//     } else {
//       console.log(" trainee clicled schedule ===> ");
//       this.setState({ clickedOnSchedule: !this.state.clickedOnSchedule });
//     }
//   };

//   handleClickMore = (event) => {
//     console.log("************Click More***************");
//     console.log("clickMore", event.date, event.target);
//   };
//   handleBeforeDeleteSchedule = (ev) => {
//     console.log("************Before Delete***************");
//     let scheduleID = ev.schedule.id;
//     let scheduleCalendarID = ev.schedule.calendarId;
//     console.log("delete handle ", ev);
//     console.log("->", scheduleID, "|", scheduleCalendarID);
//     this.props.ScheduleStore.deleteSchedule({
//       schedule_id: ev.schedule.id,
//     });
//   };
//   handleafterRenderSchedule = (ev) => {
//     console.log("************After Render***************", ev);
//   };
//   handlebeforeUpdateSchedule = (ev) => {
//     console.log("************BEFORE UPDATE***************");
//     console.log("$ BF : ", ev);
//     let updatedSchedule = {
//       schedule_id: ev.schedule.id,
//       department_id: parseInt(ev.changes.calendarId),
//       start: new Date(ev.start._date).toISOString(),
//       end: new Date(ev.end._date).toISOString(),
//       title: ev.changes.title,
//       dueDateClass: ev.schedule.dueDateClass,
//       category: ev.schedule.category,
//     };
//     console.log("object :", updatedSchedule);
//     this.props.ScheduleStore.updateSchedule(updatedSchedule);
//   };
//   handleClickTimezonesCollapseBtn = (ev) => {};
//   handleClickNextButton = () => {
//     const calendarInstance = calendarRef.current.getInstance();
//     calendarInstance.next();
//   };
//   handleClickPrevButton = () => {
//     const calendarInstance = calendarRef.current.getInstance();
//     calendarInstance.prev();
//   };
//   handleCreateSchedule = () => {
//     const calendarInstance = calendarRef.current.getInstance();
//     calendarInstance.openCreationPopup({});
//   };
//   handleHide = () => {
//     const calendarInstance = calendarRef.current.getInstance();
//     calendarInstance.toggleTaskView(false);
//   };
//   handlebeforeCreateSchedule = (event) => {
//     if (this.state.isAdmin) {
//       var startTime = event.start;
//       var endTime = event.end;
//       var isAllDay = event.isAllDay;
//       var guide = event.guide;
//       var triggerEventName = event.triggerEventName;
//       console.log(startTime, endTime, isAllDay, guide, triggerEventName);
//       console.log("---startTime--<<<<<", event);
//       const newSchedule = {
//         id: null,
//         title: event.title,
//         category: "time",
//         dueDateClass: "",
//         start: new Date(startTime._date).toISOString(),
//         end: new Date(endTime._date).toISOString(),
//         department_id: parseInt(event.calendarId),
//       };
//       this.props.ScheduleStore.createNewSchedule(newSchedule);
//     }
//   };

//   // id: "1",
//   //             name: "MMA Mixed Martil art",
//   //             bgColor: "#40dfa0",
//   //             borderColor: "#303030",

//   getCalenders = (departments, has_permissoin) => {
//     let calendarsArray = [];
//     const userCalender = {
//       id: "0",
//       name: "user",
//       bgColor: "#d1d8e0",
//       borderColor: "#2c3e50",
//     };
//     if (!has_permissoin) {
//       calendarsArray.push(userCalender);
//     }

//     departments.forEach((d) => {
//       const calendar = {};
//       calendar.id = d.id.toString();
//       calendar.name = d.name;
//       calendar.bgColor =
//         "#" + Math.floor(Math.random() * 16777215).toString(16);
//       calendar.borderColor = "#2c3e50";
//       calendarsArray.push(calendar);
//     });

//     return calendarsArray;
//   };

//   render = () => {
//     return (
//       <div>
//         {
//           <Calendar
//             ref={calendarRef}
//             height="900px"
//             calendars={calendarsArray}
//             disableDblClick={true}
//             disableClick={false}
//             isReadOnly={false}
//             Z
//             month={{
//               startDayOfWeek: 0,
//             }}
//             schedules={this.props.ScheduleStore.computedList}
//             scheduleView
//             taskView
//             onClickDayname={this.handleClickDayname}
//             onClickSchedule={this.handleClickSchedule}
//             onClickMore={this.handleClickMore}
//             onClickTimezonesCollapseBtn={this.handleClickTimezonesCollapseBtn}
//             onBeforeDeleteSchedule={this.handleBeforeDeleteSchedule}
//             onAfterRenderSchedule={this.handleafterRenderSchedule}
//             onBeforeUpdateSchedule={this.handlebeforeUpdateSchedule}
//             onBeforeCreateSchedule={this.handlebeforeCreateSchedule}
//             useDetailPopup={this.state.isAdmin}
//             useCreationPopup={this.state.isAdmin}
//             view={"week"} // You can also set the `defaultView` option.
//             week={{
//               showTimezoneCollapseButton: true,
//               timezonesCollapsed: true,
//             }}
//           />
//         }
//         {this.state.clickedOnSchedule ? (
//           <UserPopUp scheduleInfo={scheduleInfo}></UserPopUp>
//         ) : null}
//         <button onClick={this.handleCreateSchedule}>create schedule</button>
//         <button onClick={this.handleClickNextButton}>Go next!</button>
//         <button onClick={this.handleClickPrevButton}>Go Prev!</button>
//         <button onClick={this.handleHide}>hide </button>
//       </div>
//     );
//   };
// }
// export default inject("ScheduleStore", "LogInStore")(Observer(Schedule2));
