import React from "react"
import PropTypes from "prop-types"

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
            obj = { ...obj, loop: no, text: ntext.trim() }
        }
    }
    {
        const io = ntext.indexOf(REST_SEPARATOR)
        if( io !== -1 ) {
            const rest = ntext.substring( io+1 )
            ntext = ntext.substring( 0, io).trim()
            console.log( 'rest:', rest)
            obj = { ...obj, rest: rest }
        }
    }
    return { ...obj, exer: ntext}
}
const processSteps = (text) => {
    const textarray = text.split(STEP_SEPARATOR)
    const steparray = textarray.map( (text) => processStep( text ) )
    return steparray
}

const Step = ({exer,i,loop,rest}) => {
    return (
        <li>
            [{i}] &nbsp;
                { loop ? <span style={{color:'red'}}> {loop} x &nbsp; </span> : null } 
                <span style={{color:'blue'}}> {exer} </span>
                { rest ? <span style={{color:'green'}}> &nbsp; / {rest} &nbsp; </span> : null }
            </li>
    )
}
Step.propTypes = {
    exer: PropTypes.string.isRequired,
    i: PropTypes.number.isRequired,
    loop: PropTypes.number,
    rest: PropTypes.string,
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
    const steps = processSteps( TEXT) // text.split(STEP_SEPARATOR);
    return(
        <>
        <h1>TrainContainer</h1>
        <Steps steps={steps} />
        <br/><br/>
        </>
    )
}
export default TrainContainer