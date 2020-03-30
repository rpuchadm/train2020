import React, {useEffect,useState} from "react"
import PropTypes from "prop-types"
import moment from "moment"

const Step = ({exer,exerMinutes,i,loop,rest,restMinutes,total}) => {
    return (
        <li>
            [{i}] &nbsp;
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
    exer: PropTypes.string.isRequired,
    exerMinutes: PropTypes.number.isRequired,
    i: PropTypes.number.isRequired,
    loop: PropTypes.number,
    rest: PropTypes.string,
    restMinutes: PropTypes.number,
    total: PropTypes.number.isRequired,
}

const Steps = ({steps}) => {
    //return ( <>{JSON.stringify(steps)} </>)
    return (
        <ul>{ steps.map( (step,i) => <Step key={i} {...step} i={i} /> ) }</ul>
    )
}
Steps.propTypes = {
    steps: PropTypes.array.isRequired,
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
    //const amount2 = amount1 ? Math.trunc( amount1 / 1000 ) : null ;

    return(
        <>
        <h1>TrainClock</h1>
        <Steps steps={steps} />
        <br/>
        { start ? 
            <>
            {amount}  = {now} - {start.getTime()}
            &nbsp;&nbsp;&nbsp;
            <small>
                init:{ moment(start).format('HH:mm:ss') }
                &nbsp;
                count: {count} 
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