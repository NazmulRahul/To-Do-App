/* eslint-disable react/prop-types */
const ProgressBar=({progress})=>{

    return (
        <div className="outer-bar"
            style={{backgroundColor:'lightgray'}}
        >
            <div className="inner-bar"
                style={{width:`${progress}%`,backgroundColor:'rgb(255,175,161)'}}
            >
                
            </div>
        </div>
    )
}

export default ProgressBar