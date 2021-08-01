import { React, useState, useEffect } from "react";
import { observer, inject } from "mobx-react";
import axios from "axios";
import { BarChart, CartesianGrid, Bar, XAxis,YAxis,  Tooltip } from 'recharts'

const serverApi = "http://localhost:8080";

const DashBoard = inject("ScheduleStore")(
    observer((props) => {
        const [users, setUsers] = useState([])
        const [userPerDepartment, setuserPerDepartment] = useState([])
        const [departmentsInCalendar, setDepartmentsInCalendar] = useState([])

        useEffect(() => {
            async function fetchData() {
                let allUsers = await axios.get(serverApi + "/allUsers");
                setUsers(allUsers.data);
                let userPerDepartment = await axios.get(serverApi+"/userPerDepartment");
                setuserPerDepartment(userPerDepartment.data);
                let departmentInCalendar = await axios.get(serverApi+"/departmentInSchedules");
                setDepartmentsInCalendar(departmentInCalendar.data);
            }
            fetchData();
        }, [])


        return (
            <div>
                <span>
                    <img src="https://img.icons8.com/ios-filled/50/000000/ratings.png" alt="" />
                    <span className="spanClass">{users.length}</span>
                    <div className="divClass" >User In System</div>
                </span>

                <h4>Participants per Department</h4>
              <BarChart
                  width={700}
                  height={500}
                  data={userPerDepartment}
                  maxBarSize={20}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis  dataKey="cnt" />
                <Tooltip/>
                <XAxis  dataKey="department"  />
                <Bar  dataKey="cnt" fill={"rgba(120,99,132,1)"} />
              </BarChart>

              <h4> Department lessons in week</h4>
              <BarChart
                  width={700}
                  height={500}
                  data={departmentsInCalendar}
                  maxBarSize={20}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis  dataKey="cnt" />
                <Tooltip/>
                <XAxis  dataKey="department"  />
                <Bar  dataKey="cnt" fill={"rgba(120,99,132,1)"} />
              </BarChart>
            </div>
        );
    }));

export default DashBoard;