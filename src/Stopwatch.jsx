import React, {useState, useEffect, useRef} from 'react';

function Stopwatch() {

    const [isRunning, setIsRunning] = useState(false); //state variable to check if stopwatch is running
    const [elapsedTime, setElapsedTime] = useState(0); //state variable to keep track of elapsed time
    const intervalIdRef = useRef(null); //interval id
    const startTimeRef = useRef(0); //start time reference

    useEffect(() => { //useEffect hook used to run some code/sidecode (function) if anything in the array dependency is altered. So if isRunning is altered, run code.
        if(isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current); //sets the elapsed time.
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current); //cleaner function
        }

    }, [isRunning]);

    function start() { //function used to start the stopwatch
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() { //function used to stop the stopwatch
        setIsRunning(false);
    }

    function reset() { //function used to reset the stopwatch
        setElapsedTime(0);
        setIsRunning(false);
    }

    function formatTime() { //function used to format the milliseconds of elapsed time into hours, minutes, seconds, and milliseconds.

        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / 1000 % 60);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`
    }

    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button onClick={start} className='start-button'>START</button>
                <button onClick={stop} className='stop-button'>STOP</button>
                <button onClick={reset} className='reset-button'>RESET</button>
            </div>
        </div>
    );
}
export default Stopwatch; //export this component, we will import it in App.jsx