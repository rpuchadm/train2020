import React from "react"
import PropTypes from "prop-types"

const STEP_SEPARATOR = '+'
const LOOP_SEPARATOR = '*'


const text = `20' calentamiento + 5*1' msiprogresivo/1'suave + 5' R2 + 5' R1 + 5*1'R3/2'R1 +5'R1`

const Step = ({step,i}) => {
    return(
        <li>[{i}] {step}</li>
    )
}
Step.propTypes = {
    steps: PropTypes.string.isRequired,
}

const Steps = ({steps}) => {
    return(
        <ul>{ steps.map( (step,i) => <Step key={i} step={step} i={i} /> ) }</ul>
    )
}
Steps.propTypes = {
    steps: PropTypes.array.isRequired,
}

const TrainContainer = () => {
    const steps = text.split(STEP_SEPARATOR);
    return(
        <>
        <h1>TrainContainer</h1>
        <Steps steps={steps} />
        <br/><br/>
        </>
    )
}
export default TrainContainer