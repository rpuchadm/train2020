import React from "react"

import TrainClock from "./TrainClock"

const STEP_SEPARATOR = '+'
const LOOP_SEPARATOR = '*'
const REST_SEPARATOR = '/'
const MINUTES_SEPARATOR = '\''

const TEXT = `20' calentamiento + 5*1' progresivo/1'suave + 5' R2 + 5' R1 + 5*1'R3/2'R1 +5'R1`

const processStep = (text) => {
    let exer = text.trim()
    let obj = { otext: text}
    {
        const io = exer.indexOf(LOOP_SEPARATOR)
        if( io !== -1 ) {
            const no = parseInt( exer.substring( 0, io) , 10)
            exer = exer.substring( io+1 ).trim()
            obj = { ...obj, loop: no }
        }
    }
    {
        const io = exer.indexOf(REST_SEPARATOR)
        if( io !== -1 ) {
            let rest = exer.substring( io+1 )
            exer = exer.substring( 0, io).trim()
            const iom = rest.indexOf(MINUTES_SEPARATOR)
            if ( iom !== -1 ) {
                const nm = parseInt( rest.substring( 0, iom) , 10)
                rest = rest.substring( iom+1 )
                obj = { ...obj, restMinutes: nm}
            }
            obj = { ...obj, rest: rest }
        }
    }
    const iom = exer.indexOf(MINUTES_SEPARATOR)
    if ( iom !== -1 ) {
        const nm = parseInt( exer.substring( 0, iom) , 10)
        exer = exer.substring( iom+1 )
        let total = nm ;
        if ( obj.loop ) total = obj.loop * total ;
        if ( obj.rest ) total = total + obj.restMinutes ; 
        obj = { ...obj, exerMinutes: nm, total: nm}
    }
    return { ...obj, exer: exer}
}
const processSteps = (text) => {
    const textarray = text.split(STEP_SEPARATOR)
    const steparray = textarray.map( (text) => processStep( text ) )
    return steparray
}

const TrainContainer = () => {
    const steps = processSteps( TEXT)
    return(
        <TrainClock steps={steps} />
    )
}
export default TrainContainer