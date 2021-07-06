import React from 'react';
import { useState, useEffect } from 'react';

export default function Clock() {

    const [time, setTime] = useState({});

    useEffect(() => {
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
    }, []);

    return (
        <>
            {time.hours &&
                <p className="time-live" > 
                    {time.hours <= 9 && 0}{time.hours}:
                    {time.minutes <= 9 && 0}{time.minutes}:
                    <span className="time_secs">
                        {time.seconds <= 9 && 0}{time.seconds}
                    </span>
                </p>
            }
        </>
    )
};
