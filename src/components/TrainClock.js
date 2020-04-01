import React, {useEffect,useRef,useState} from "react"
import PropTypes from "prop-types"
import moment from "moment"

import Badge from "react-bootstrap/Badge"
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

const audio1src = "../sounds/339816__inspectorj__hand-bells-f-single.wav"

const Step = ({current,exer,exerMinutes,i,loop,rest,restMinutes,time,total}) => {
    const variant = current ? 'success' : 'default' ;
    return (
        <ListGroup.Item variant={variant} >
            { loop ? <> <Badge variant='danger'> {loop} x &nbsp; </Badge> &nbsp; </> : null } 
            <Badge variant='primary'> {exerMinutes}' {exer} </Badge>
            { rest ? 
                    <> &nbsp; <Badge variant='success'>
                        &nbsp; / { restMinutes ? <>{restMinutes}'</> : null } {rest} &nbsp; 
                    </Badge> </>  
                    : null 
            }
            { current ? 
                <> &nbsp; <Badge variant='success'> {time}/{total} </Badge> </> 
                : 
                <> &nbsp; <Badge variant='secondary'> {total} </Badge> </> 
            }
        </ListGroup.Item>
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
        <ListGroup>
            { steps.map( (step,i) => <Step key={i} {...step} i={i} current={( i === index)} time={time} /> ) }
        </ListGroup>
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
        {sec} sec.
        </>
    )
}
Time.propTypes = {
    seconds: PropTypes.number.isRequired,
}

const TrainClock = ({steps}) => {
    const [start, setStart] = useState(null);
    const [count, setCount] = useState(0);
    const audio1 = useRef(null);
    useEffect( () => {
        if( start ) {
            const timeout = setTimeout( () => {
                setCount( (prev) => (prev+1)%10 )
            }, 1000)
            return () => {
                clearTimeout(timeout);
            }
        }
    },[start,count])

    useEffect( () => { audio1.current = new Audio( audio1src) } , [])

    const now = ( new Date()).getTime();
    const amount = start ? Math.trunc( ( now - start.getTime() ) / 1000 ) : null ;
    let time = amount ;
    let index = 0 ;
    if( start ) {
        while ( index < steps.length ) {
            const step = steps[index] ;
            time -= step.total ;
            if( time < 0 ) {  break } else { index++ }
        }
    } else index = -1 ;

    if ( time === -1 ) { if ( audio1.current ) { audio1.current.play() } }

    return(
        <>
        <h1>{ start ? <Time seconds={amount} /> : <>&nbsp;</> } </h1>
        <Steps steps={steps} index={index} time={time} />
        <br/>
        <hr/>
        <br/>
        <Button variant='success'
            onClick={ () => setStart( new Date() ) }> START </Button>
        &nbsp;&nbsp;&nbsp;
        <Button variant='danger'
            onClick={ () => setStart( null ) }> STOP </Button>
        <br/>
        <hr/>
        { start ? 
            <>
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
        </>
    )
}
TrainClock.propTypes = {
    steps: PropTypes.array.isRequired,
}
export default TrainClock