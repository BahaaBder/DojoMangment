import { observable, action, makeObservable, computed } from 'mobx'
import axios from 'axios'


const serverApi = "http://localhost:8080"
class ScheduleInventory {

    constructor() {


        this.showModal = false
        this.listSchedule = []

        makeObservable(this, {

            showModal: observable,
            listSchedule: observable,
            handleAlertModalChange: action,
            getSchedule: action,
            mapScheduleToStr: action

        })


    }

    handleAlertModalChange = () => {
        this.showModal = !this.showModal

    }

    mapScheduleToStr = (list) => {
        const tempList = []
        list.forEach(s => {
            const object2 = Object.assign({}, s, { id: s.id.toString() }, { calenderId: s.calenderId.toString() });
            tempList.push(object2)
        }
        )
        return tempList

    }
    getSchedule = async () => {
        let arr = [];
        let obj = {}
        await axios.get(`${serverApi}/schedules`).
            then((response) => {
                // console.log("res", response.data)

                this.listSchedule = response.data

                // console.log("after mapping ", this.listSchedule)
            }).catch(function (error) {
                console.log(error)
            })
        let temp;
        temp = await this.mapScheduleToStr(this.listSchedule)
        this.listSchedule = [...temp]
        console.log("-----", temp)
        console.log("--0000---", this.listSchedule)


    }






}

export default ScheduleInventory
