import { observable, action, makeObservable, computed } from 'mobx'

class ScheduleInventory {

    constructor() {
        
       
        this.showModal = false

        makeObservable(this, {
    
            showModal:observable,
            handleAlertModalChange: action,

        })

        
    }

    handleAlertModalChange = () => {
        this.showModal = !this.showModal

    }
    
}

export default ScheduleInventory
