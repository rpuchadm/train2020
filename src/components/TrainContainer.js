import React from "react"
import PropTypes from "prop-types"

const STEP_SEPARATOR = '+'
const LOOP_SEPARATOR = '*'


const TEXT = `20' calentamiento + 5*1' msiprogresivo/1'suave + 5' R2 + 5' R1 + 5*1'R3/2'R1 +5'R1`
const processStep = (text) => {
    let obj = { text: text}
    // if
    return obj
}
const processSteps = (text) => {
    const textarray = text.split(STEP_SEPARATOR)
    const steparray = textarray.map( (text) => processStep( text ) )
    return steparray
}

const Step = ({text,i}) => {
    return (
        <li>[{i}] {text}</li>
    )
}
Step.propTypes = {
    text: PropTypes.string.isRequired,
    i: PropTypes.number.isRequired,
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