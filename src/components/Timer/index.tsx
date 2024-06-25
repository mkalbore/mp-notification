import React, { useState, useEffect } from "react";

const Timer = () => {
	// Step 1: Initialize the state with 300 seconds (5 minutes)
	const [time, setTime] = useState(300);

	useEffect(() => {
		// Step 2 & 3: Start the timer and decrement the time every second
		const timer = setInterval(() => {
			setTime(prevTime => {
				if (prevTime <= 0) {
					clearInterval(timer); // Step 4: Clear interval when time reaches 0
					return 0;
				}
				return prevTime - 1;
			});
		}, 1000);

		// Cleanup function to clear the interval when the component unmounts
		return () => clearInterval(timer);
	}, []);

	// Step 5: Convert the remaining time to minutes:seconds format
	const formatTime = () => {
		const minutes = Math.floor(time / 60);
		const seconds = time % 60;
		return `${minutes}:${seconds.toString().padStart(2, "0")}`;
	};

	// Step 6: Display the timer
	return (
		<div className='font-semibold text-black'>
			<h2>Exclusive Deal</h2>
			<p>Reamining Time: {formatTime()}</p>
		</div>
	);
};

export default Timer;
