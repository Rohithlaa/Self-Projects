import { useEffect, useRef, useState } from "react";


function StepperComponent() {
    const [isComplete , setIsComplete] = useState(false)
    const [currentPositing, setCurrentPosition] = useState(1)

    const [margin,setMargin] = useState({
        marginLeft:0,marginRight:0
    })

    let stepperData = [{
        name: "Ordered",
        component: "Started"
    }, {
        name: "Order packed",
        component: "Started"
    }, {
        name: "Shipping",
        component: "Started"
    }, {
        name: "In Transit",
        component: "Started"
    }, {
        name: "Completed",
        component: "Started"
    }]

    const stepRef = useRef([])

    useEffect(() =>{
        setMargin( {
            marginLeft: stepRef.current[0].offsetWidth,
            marginRight: stepRef.current[stepperData.length - 1].offsetWidth
        })
    },[stepRef])

    const handleNext = () => {
        setCurrentPosition( prevstate => {
             if(prevstate === stepperData.length){
                setIsComplete(true)
             }else{
                return prevstate + 1
             }
        })
    }
    const calculateWidth = () => {
        return ( (currentPositing - 1) / (stepperData.length - 1) * 100)
    }
    if(stepperData.length < 1){
        return null
    }

    return (
        <>
            <div className="stepper-container">
                {stepperData.map((item, index) => {
                    return (
                        <div 
                        ref={el => stepRef.current[index] = el}
                        className={`stepper-box ${ currentPositing > index+1 || isComplete ? "complete" : ""} ${currentPositing === index + 1 ? "active" : ''}`} key={index}>
                            <div className="stepper-circle">{currentPositing > index+1 || isComplete ? (<span>&#10003;</span>) : index+1}</div>
                            <div className="stepper-name">{item?.name}</div>
                        </div>
                    )
                })}
                <div className="progress-bar"
                style={{width : `calc(100% - ${margin.marginLeft + margin.marginRight}px)`,marginLeft:margin.marginLeft, marginRight:margin.marginRight}}
                >
                    <div className="progress" style={{width: `${calculateWidth()}%`}}></div>
                </div>
            </div>
            {!isComplete &&
            <button onClick={handleNext}>{currentPositing === stepperData.length ? "Finish" : 'Next'}</button>
            }
            

        </>
    )
}

export default StepperComponent;