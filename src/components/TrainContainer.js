import React, {useEffect,useState} from "react"
import PropTypes from "prop-types"
import moment from "moment"

const STEP_SEPARATOR = '+'
const LOOP_SEPARATOR = '*'
const REST_SEPARATOR = '/'
const MINUTES_SEPARATOR = '\''

const TEXT = `20' calentamiento + 5*1' progresivo/1'suave + 5' R2 + 5' R1 + 5*1'R3/2'R1 +5'R1`
const processStep = (otext) => {
    let ntext = otext.trim()
    let obj = { otext: otext}
    {
        const io = ntext.indexOf(LOOP_SEPARATOR)
        if( io !== -1 ) {
            const no = parseInt( ntext.substring( 0, io) , 10)
            ntext = ntext.substring( io+1 ).trim()
            obj = { ...obj, loop: no }
        }
    }
    {
        const io = ntext.indexOf(REST_SEPARATOR)
        if( io !== -1 ) {
            let rest = ntext.substring( io+1 )
            ntext = ntext.substring( 0, io).trim()
            const iom = rest.indexOf(MINUTES_SEPARATOR)
            if ( iom !== -1 ) {
                const nm = parseInt( rest.substring( 0, iom) , 10)
                rest = rest.substring( iom+1 )
                obj = { ...obj, restMinutes: nm}
            }
            obj = { ...obj, rest: rest }
        }
    }
    const iom = ntext.indexOf(MINUTES_SEPARATOR)
    if ( iom !== -1 ) {
        const nm = parseInt( ntext.substring( 0, iom) , 10)
        ntext = ntext.substring( iom+1 )
        obj = { ...obj, exerMinutes: nm}
    }
    return { ...obj, exer: ntext}
}
const processSteps = (text) => {
    const textarray = text.split(STEP_SEPARATOR)
    const steparray = textarray.map( (text) => processStep( text ) )
    return steparray
}

const Step = ({exer,exerMinutes,i,loop,rest,restMinutes}) => {
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

const TrainContainer = () => {
    const [start, setStart] = useState(null);
    const [count, setCount] = useState(0);
    const steps = processSteps( TEXT) // text.split(STEP_SEPARATOR);

    useEffect( () => {
        if( start ) {
            setTimeout( () => {
                setCount( (prev) => prev+1 )
            }, 1000)
        }
    },[start,count])

    return(
        <>
        <h1>TrainContainer</h1>
        <Steps steps={steps} />
        <br/>
        { start ? 
            <> 
            init:{ moment(start).format('HH:mm:ss') }
            &nbsp;
            count: {count} 
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
export default TrainContainer