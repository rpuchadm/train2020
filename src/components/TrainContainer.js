import React from "react"
import PropTypes from "prop-types"

const STEP_SEPARATOR = '+'
const LOOP_SEPARATOR = '*'


const TEXT = `20' calentamiento + 5*1' msiprogresivo/1'suave + 5' R2 + 5' R1 + 5*1'R3/2'R1 +5'R1`
const processStep = (text) => {
    let obj = { text: text}
    const iol = text.indexOf(LOOP_SEPARATOR)
    if( iol !== -1 ) {
        const nol = parseInt( text.substring( 0, iol) , 10)
        obj = { ...obj, loop: nol, text: text.substring( iol) }
    }
    return obj
}
const processSteps = (text) => {
    const textarray = text.split(STEP_SEPARATOR)
    const steparray = textarray.map( (text) => processStep( text ) )
    return steparray
}

const Step = ({i,loop,text}) => {
    return (
    <li>[{i}] { loop ? <span style={{color:'red'}}> {loop}x </span> : null } {text}</li>
    )
}
Step.propTypes = {
    i: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    loop: PropTypes.number,
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