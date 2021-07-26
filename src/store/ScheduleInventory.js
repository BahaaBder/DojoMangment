import { observable, action, makeObservable, computed } from 'mobx'
import axios from 'axios'


const serverApi = "http://localhost:8080"
class ScheduleInventory {

    constructor() {


        this.showModal = false
        this.listSchedule = []
        this.tempProxy = []

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
     handle = (e) => {
        this.listSchedule = e
    }

    mapScheduleToStr = (list) => {
        const tempList = []
        list.forEach(s => {
            const object2 = Object.assign({}, s, { id: s.id.toString() }, { calenderId: s.calenderId.toString() });
            tempList.push(object2)
            // console.log(object2)
        }
        )
        return tempList

    }

    handleProxy = (proxy) => {
        const customer = Object.assign({}, proxy);
        console.log(proxy, customer)
        this.listSchedule = customer
        console.log(" inside handel", this.listSchedule)

    }



    getSchedule = () => {
        axios.get(`${serverApi}/schedules`).
            then((response) => {
                console.log("-----list------", response.data)
                const temp = this.mapScheduleToStr(response.data)
                console.log("temp mapeed ", temp)
                this.handle(temp)
                this.tempProxy = temp
                // console.log(" my list ",this.tempProxy)
                // this.listSchedule = response.data
                // // this.listSchedule =this.mapScheduleToStr(response.data )
                // console.log(response.data)
            }).catch(function (error) {
                console.log(error)
            })
        // let temp;
        // temp = await this.mapScheduleToStr(this.listSchedule)
        // this.listSchedule = [...temp]
        // console.log("-----", temp)
        // console.log("--0000---", this.listSchedule)


    }






}

export default ScheduleInventory
