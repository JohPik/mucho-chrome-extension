import React from 'react'
import { useState, useEffect } from 'react'

export default function Times() {
    const [time, setTime] = useState({
        hours: "",
        minutes: "",
        seconds: ""
    });
    const [timeZone, setTimeZone] = useState("")

    useEffect(() => {

        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, [])

    useEffect( () => {
        const interval = setInterval(() => {
            const today = new Date();
            const time = {
                hours: today.getHours(),
                minutes: today.getMinutes(),
                seconds: today.getSeconds()
            }
            setTime(time)
        }, 1000);
        return () => clearInterval(interval);
    }, [])

    return (
        <section className="times">
            <div className="time_container">
                
                <p className="time_zone">{timeZone}</p>
                <p className="time_live">{time.hours <= 9 && 0}{time.hours}:{time.minutes <= 9 && 0}{time.minutes}:{time.seconds <= 9 && 0}{time.seconds}</p>
                <p className="time_location">{timeZone}</p>
            </div>
            <button></button>
        </section>
    )
}
