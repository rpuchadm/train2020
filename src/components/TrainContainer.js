import React from "react"

import TrainClock from "./TrainClock"

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

const TrainContainer = () => {
    const steps = processSteps( TEXT)
    return(
        <TrainClock steps={steps} />
    )
}
export default TrainContainer