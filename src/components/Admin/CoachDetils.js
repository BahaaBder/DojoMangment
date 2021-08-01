import { React } from "react";
import { observer, inject } from "mobx-react";
import Coach from "../CoachComponent/Coach";

const CoachDetails = inject("CoachStore")(
    observer((props) => {
        if(props.CoachStore.coachs.length===0){
            props.CoachStore.getAllCoachs();
        }
        let coachs = props.CoachStore.coachs
        return (
            <div>
                {coachs.map((coach, ind) => {
                    return (
                        <span key={ind}>
                            <Coach key={ind}
                                coach={coach}
                                showDetails={false}
                            />
                        </span>
                    );
                })}
            </div>
        );
    }));

export default CoachDetails;