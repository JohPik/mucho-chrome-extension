import React from 'react';
import { useState, useEffect } from 'react';
import { useSettingsContext } from '../../contextSettings';

export default function Clock() {

    const { settingsState } = useSettingsContext();
    const { timeFormat } = settingsState;

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

    if (time.hours) {
        if (timeFormat === "24") {
            return (
                <p className="time_live">
                    {time.hours <= 9 && 0}{time.hours}:{time.minutes <= 9 && 0}{time.minutes}:{time.seconds <= 9 && 0}{time.seconds}
                </p>
            )
        } else if (timeFormat === "12") {
            return (
                <p className="time_live">
                    {time.hours <= 9 && 0}{time.hours >= 12 ? time.hours - 12 : time.hours}:{time.minutes <= 9 && 0}{time.minutes}:{time.seconds <= 9 && 0}{time.seconds} {time.hours >=12 ? "pm" : "am"}
                </p>
            )
        }
    }

    return (
        <>
        </>
    )
};
