import React, { useEffect, useState } from "react";

function CountdownTimer(props) {

    const calculateTimeLeft = () => {
        const difference = +new Date(props.tanggal) - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
    });

    const timerComponents = [];

    Object.keys(timeLeft).forEach(interval => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span>
                {/* {timeLeft[interval]} */}
                {timeLeft[interval]} {interval} {""}
            </span>
        );
    });

    return (
        <div className="waktu">
            {timerComponents.length ? timerComponents :
                <span>Time's up!</span>}
        </div>
    );
}

export default CountdownTimer