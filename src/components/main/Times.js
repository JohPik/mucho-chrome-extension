import React from 'react';
import { useState, useEffect } from 'react';
import Clock from './Clock';

export default function Times() {

    const [timeZone, setTimeZone] = useState("");
    const [date, setDate] = useState({});

    const weekDays = ["Sun","Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    useEffect(() => {
        setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }, []);

    useEffect(() => {
        const today = new Date();
        const date = {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
            weekday: today.getDay()
        }
        setDate(date)
    }, []);
    
    return (
        <section className="times">
            {timeZone.length !== 0 &&
                <div className="time_container">
                    <p className="date">{weekDays[date.weekday]}, {date.day} {months[date.month]} {date.year}</p>
                    <Clock />
                    <p className="time_zone">{timeZone}</p>
                </div>
            }
        </section>
    )
};