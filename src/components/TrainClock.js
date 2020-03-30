import React, {useEffect,useState} from "react"
import PropTypes from "prop-types"
import moment from "moment"

const Step = ({current,exer,exerMinutes,i,loop,rest,restMinutes,time,total}) => {
    return (
        <li>
            [{i}] &nbsp; { current ? <>CURRENT</> : null }
                { loop ? <span style={{color:'red'}}> {loop} x &nbsp; </span> : null } 
                <span style={{color:'blue'}}> {exerMinutes}' {exer} </span>
                { rest ? 
                    <span style={{color:'green'}}>
                        &nbsp; / { restMinutes ? <>{restMinutes}'</> : null } {rest} &nbsp; 
                    </span> 
                    : null }
                , total:{total}
            </li>
    )
}
Step.propTypes = {
    current: PropTypes.bool,
    exer: PropTypes.string.isRequired,
    exerMinutes: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    loop: PropTypes.number,
    rest: PropTypes.string,
    restMinutes: PropTypes.number,
    time: PropTypes.number,
    total: PropTypes.number.isRequired,
}

const Steps = ({steps,index,time}) => {
    return (
        <ul>{ steps.map( (step,i) => <Step key={i} {...step} i={i} current={( i === index)} time={time} /> ) }</ul>
    )
}
Steps.propTypes = {
    steps: PropTypes.array.isRequired,
    index: PropTypes.number,
    time: PropTypes.number,
}

const Time = ({seconds}) => {
    let hour = 0 ; let min = 0 ; let sec = seconds ;
    if ( sec > 59 ) {
        min = Math.trunc( sec / 60 )
        sec = sec % 60
    }
    if ( min > 59 ) {
        hour = Math.trunc( min / 60 )
        min = min % 60
    }
    return(
        <>
        { hour ? <>{hour} h. &nbsp; </> : null }
        { min || hour ? <>{min} min. &nbsp; </> : null }
        { sec || min || hour ? <>{sec} sec. &nbsp; </> : null }
        </>
    )
}
Time.propTypes = {
    seconds: PropTypes.number.isRequired,
}

const TrainClock = ({steps}) => {
    const [start, setStart] = useState(null);
    const [count, setCount] = useState(0);

    useEffect( () => {
        if( start ) {
            setTimeout( () => {
                setCount( (prev) => (prev+1)%10 )
            }, 1000)
        }
    },[start,count])

    const now = ( new Date()).getTime();
    const amount = start ? Math.trunc( ( now - start.getTime() ) / 1000 ) : null ;
    let time = amount ;
    let index = 0 ;
    while ( index < steps.length ) {
        const step = steps[index] ;
        time -= step.total ;
        if( time < 0 ) {  break } else { index++ }
    }

    return(
        <>
        <h1>TrainClock</h1>
        <Steps steps={steps} index={index} time={time} />
        <br/>
        { start ? 
            <>
            <Time seconds={amount} />
            &nbsp;&nbsp;&nbsp;
            <small>
                init:{ moment(start).format('HH:mm:ss') }
                &nbsp;
                count: {count}
                &nbsp;
                index: {index}
                &nbsp;
                time: {time}
            </small>
            </> : null }
        <br/>
        <hr/>
        <br/>
        <button onClick={ () => setStart( new Date() ) }> START </button>
        &nbsp;&nbsp;&nbsp;
        <button onClick={ () => setStart( null ) }> STOP </button>
        <br/>
        <br/>
        </>
    )
}
TrainClock.propTypes = {
    steps: PropTypes.array.isRequired,
}
export default TrainClock