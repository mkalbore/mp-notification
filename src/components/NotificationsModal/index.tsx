import React, { useState, useEffect } from "react";
import NotificationComponent from "../NotificationComponent";
import type { Notification } from "../../types/NotificationProps";

const NotificationsModal = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [animationClass, setAnimationClass] = useState("");
	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [activeSection, setActiveSection] = useState("all"); // 'all', 'unread', 'request', 'status-change', 'new-feature'
	const count = 12;

	const loadNotifications = async () => {
		try {
			const savedNotifications = localStorage.getItem("notifications");
			if (savedNotifications && JSON.parse(savedNotifications).length > 0) {
				console.log("Loading notifications from localStorage");
				setNotifications(JSON.parse(savedNotifications));
			} else {
				console.log("Fetching notifications from JSON file");
				const response = await fetch("/notifications.json");
				if (!response.ok) throw new Error("Failed to fetch notifications");
				const initialNotifications = await response.json();
				console.log("Fetched notifications: ", initialNotifications);
				setNotifications(initialNotifications);
				localStorage.setItem(
					"notifications",
					JSON.stringify(initialNotifications)
				);
			}
		} catch (error) {
			console.error("Error loading notifications:", error);
			const initialNotifications = Array.from(
				{ length: count },
				(_, index) => ({
					id: String(index + 1),
					message: `Notification ${index + 1}`,
					timestamp: new Date().toISOString(),
					isRead: false,
					type:
						index % 3 === 0
							? "request"
							: index % 3 === 1
							? "status-change"
							: "new-feature",
				})
			) as Notification[];
			setNotifications(initialNotifications);
			localStorage.setItem(
				"notifications",
				JSON.stringify(initialNotifications)
			);
		}
	};

	useEffect(() => {
		loadNotifications();
	}, []);

	useEffect(() => {
		localStorage.setItem("notifications", JSON.stringify(notifications));
	}, [notifications]);

	useEffect(() => {
		if (isVisible) {
			setAnimationClass("modalOpen");
		} else if (!isVisible && animationClass === "modalOpen") {
			setAnimationClass("modalClose");
			// Delay the removal of the modal to allow the rollDown animation to complete
			const timer = setTimeout(() => {
				setAnimationClass("");
			}, 500); // Assuming the animation duration is 500ms
			return () => clearTimeout(timer);
		}
	}, [isVisible, animationClass]);

	// Your toggle function or other logic to set isVisible

	const toggleModal = () => setIsVisible(!isVisible);

	const markAllAsRead = () => {
		const updatedNotifications = notifications.map(notification => ({
			...notification,
			isRead: true,
		}));
		setNotifications(updatedNotifications);
	};

	const markAsRead = (id: string) => {
		const updatedNotifications = notifications.map(notification =>
			notification.id === id ? { ...notification, isRead: true } : notification
		);
		setNotifications(updatedNotifications);
	};

	return (
		<>
			<div
				onClick={toggleModal}
				id='bell-icon'
				className='cursor-pointer flex items-start gap-1'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='4rem'
					height='4rem'
					viewBox='0 0 24 24'
					fill='none'
					className='opacity-75 hover:opacity-100 active:opacity-50 hover:scale-105 active:scale-110 cursor-pointer transition-all ease-out duration-300'>
					<path
						d='M9.00195 17H5.60636C4.34793 17 3.71872 17 3.58633 16.9023C3.4376 16.7925 3.40126 16.7277 3.38515 16.5436C3.37082 16.3797 3.75646 15.7486 4.52776 14.4866C5.32411 13.1835 6.00031 11.2862 6.00031 8.6C6.00031 7.11479 6.63245 5.69041 7.75766 4.6402C8.88288 3.59 10.409 3 12.0003 3C13.5916 3 15.1177 3.59 16.2429 4.6402C17.3682 5.69041 18.0003 7.11479 18.0003 8.6C18.0003 11.2862 18.6765 13.1835 19.4729 14.4866C20.2441 15.7486 20.6298 16.3797 20.6155 16.5436C20.5994 16.7277 20.563 16.7925 20.4143 16.9023C20.2819 17 19.6527 17 18.3943 17H15.0003M9.00195 17L9.00031 18C9.00031 19.6569 10.3435 21 12.0003 21C13.6572 21 15.0003 19.6569 15.0003 18V17M9.00195 17H15.0003'
						stroke='#000000'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'
					/>
				</svg>
				<p
					className={`${
						notifications.filter(n => !n.isRead).length > 1
							? "opacity-100 rounded-full bg-[#FF5875] w-5 h-5 text-xs flex items-center justify-center"
							: "opacity-0"
					}`}>
					{notifications.filter(n => !n.isRead).length}
				</p>
			</div>
			{isVisible || animationClass === "modalClose" ? (
				<div
					className={`fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-40 ${animationClass}`}>
					<div className='relative modal bg-white w-[90%] h-[90%] rounded-xl px-4 pt-4'>
						<button
							onClick={toggleModal}
							className='absolute top-0 right-0 mt-4 mr-4 p-1 text-black text-lg font-semibold active:scale-105 rounded-full select-none'>
							X
						</button>
						<div className='flex items-start gap-2 pt-4 pb-6'>
							<h1 className='font-bold text-3xl text-[#1E2B41]'>
								Notifications
							</h1>
							<p className='rounded-full bg-[#FF5875] w-5 h-5 text-xs flex items-center justify-center'>
								{notifications.filter(n => !n.isRead).length}
							</p>
						</div>

						<div className='flex gap-4 items-center pb-4'>
							<button
								className='px-4 py-2 bg-[#ECF0F7] focus:bg-[#FAFAFA] text-[#455063] rounded-full active:scale-105 transition-all ease-out duration-150 select-none w-fit focus:border focus:border-[#455063] font-semibold'
								onClick={() => setActiveSection("all")}>
								All Notifications
							</button>
							<button
								className='px-4 py-2 bg-[#ECF0F7] focus:bg-[#FAFAFA] text-[#455063] rounded-full active:scale-105 transition-all ease-out duration-150 select-none w-fit focus:border focus:border-[#455063] font-semibold'
								onClick={() => setActiveSection("unread")}>
								Unread Notifications
							</button>
							<button
								className='px-4 py-2 bg-[#ECF0F7] focus:bg-[#FAFAFA] text-[#455063] rounded-full active:scale-105 transition-all ease-out duration-150 select-none w-fit focus:border focus:border-[#455063] font-semibold flex items-center gap-2'
								onClick={() => setActiveSection("request")}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='#000000'
									width='1rem'
									height='1rem'
									viewBox='0 0 16 16'
									id='request-sent-16px'
									role='img'
									aria-label='request-sent-16px'
									data-testid='request-sent-16px'>
									<path
										id='Path_50'
										data-name='Path 50'
										d='M-11.5,0h-11A2.5,2.5,0,0,0-25,2.5v8A2.5,2.5,0,0,0-22.5,13h.5v2.5a.5.5,0,0,0,.309.462A.489.489,0,0,0-21.5,16a.5.5,0,0,0,.354-.146L-18.293,13H-11.5A2.5,2.5,0,0,0-9,10.5v-8A2.5,2.5,0,0,0-11.5,0ZM-10,10.5A1.5,1.5,0,0,1-11.5,12h-7a.5.5,0,0,0-.354.146L-21,14.293V12.5a.5.5,0,0,0-.5-.5h-1A1.5,1.5,0,0,1-24,10.5v-8A1.5,1.5,0,0,1-22.5,1h11A1.5,1.5,0,0,1-10,2.5Zm-2.038-3.809a.518.518,0,0,1-.109.163l-2,2A.5.5,0,0,1-14.5,9a.5.5,0,0,1-.354-.146.5.5,0,0,1,0-.708L-13.707,7H-18.5A1.5,1.5,0,0,0-20,8.5a.5.5,0,0,1-.5.5.5.5,0,0,1-.5-.5A2.5,2.5,0,0,1-18.5,6h4.793l-1.147-1.146a.5.5,0,0,1,0-.708.5.5,0,0,1,.708,0l2,2a.518.518,0,0,1,.109.163A.505.505,0,0,1-12.038,6.691Z'
										transform='translate(25)'
									/>
								</svg>
								Request
							</button>
							<button
								className='px-4 py-2 bg-[#ECF0F7] focus:bg-[#FAFAFA] text-[#455063] rounded-full active:scale-105 transition-all ease-out duration-150 select-none w-fit focus:border focus:border-[#455063] font-semibold flex items-center gap-2'
								onClick={() => setActiveSection("status-change")}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='1rem'
									height='1rem'
									viewBox='0 0 14 14'
									id='status-change-icon'
									role='img'
									aria-label='status-change-icon'>
									<g fillRule='evenodd'>
										<path d='M0 7a7 7 0 1 1 14 0A7 7 0 0 1 0 7z' />
										<path d='M13 7A6 6 0 1 0 1 7a6 6 0 0 0 12 0z' fill='#FFF' />
										<path d='M6 3.5c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v4c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-4m0 6c0-.3.2-.5.5-.5h1c.3 0 .5.2.5.5v1c0 .3-.2.5-.5.5h-1c-.3 0-.5-.2-.5-.5v-1' />
									</g>
								</svg>
								Status Change
							</button>
							<button
								className='px-4 py-2 bg-[#ECF0F7] focus:bg-[#FAFAFA] text-[#455063] rounded-full active:scale-105 transition-all ease-out duration-150 select-none w-fit focus:border focus:border-[#455063] font-semibold flex items-center gap-2'
								onClick={() => setActiveSection("new-feature")}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='1rem'
									height='1rem'
									viewBox='0 0 48 48'
									id='new-feature-icon'
									role='img'
									aria-label='new-feature-icon'>
									<g id='Layer_2' data-name='Layer 2'>
										<g id='invisible_box' data-name='invisible box'>
											<rect width='48' height='48' fill='none' />
										</g>
										<g id='Q3_icons' data-name='Q3 icons'>
											<path d='M42.3,24l3.4-5.1a2,2,0,0,0,.2-1.7A1.8,1.8,0,0,0,44.7,16l-5.9-2.4-.5-5.9a2.1,2.1,0,0,0-.7-1.5,2,2,0,0,0-1.7-.3L29.6,7.2,25.5,2.6a2.2,2.2,0,0,0-3,0L18.4,7.2,12.1,5.9a2,2,0,0,0-1.7.3,2.1,2.1,0,0,0-.7,1.5l-.5,5.9L3.3,16a1.8,1.8,0,0,0-1.2,1.2,2,2,0,0,0,.2,1.7L5.7,24,2.3,29.1a2,2,0,0,0,1,2.9l5.9,2.4.5,5.9a2.1,2.1,0,0,0,.7,1.5,2,2,0,0,0,1.7.3l6.3-1.3,4.1,4.5a2,2,0,0,0,3,0l4.1-4.5,6.3,1.3a2,2,0,0,0,1.7-.3,2.1,2.1,0,0,0,.7-1.5l.5-5.9L44.7,32a2,2,0,0,0,1-2.9ZM18,31.1l-4.2-3.2L12.7,27h-.1l.6,1.4,1.7,4-2.1.8L9.3,24.6l2.1-.8L15.7,27l1.1.9h0a11.8,11.8,0,0,0-.6-1.3l-1.6-4.1,2.1-.9,3.5,8.6Zm3.3-1.3-3.5-8.7,6.6-2.6.7,1.8L20.7,22l.6,1.6L25.1,22l.7,1.7L22,25.2l.7,1.9,4.5-1.8.7,1.8Zm13.9-5.7-2.6-3.7-.9-1.5h-.1a14.7,14.7,0,0,1,.4,1.7l.8,4.5-2.1.9-5.9-7.7,2.2-.9,2.3,3.3,1.3,2h0a22.4,22.4,0,0,1-.4-2.3l-.7-4,2-.8L33.8,19,35,20.9h0s-.2-1.4-.4-2.4L34,14.6l2.1-.9,1.2,9.6Z' />
										</g>
									</g>
								</svg>
								New Feature
							</button>
							<button
								className='px-4 py-2 bg-[#ECF0F7] focus:bg-[#FAFAFA] text-[#1074FF] rounded-full active:scale-105 transition-all ease-out duration-150 select-none w-fit font-semibold flex gap-2 items-center'
								onClick={markAllAsRead}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='2rem'
									height='2rem'
									viewBox='0 0 24 24'
									fill='none'>
									<path
										d='M1.5 12.5L5.57574 16.5757C5.81005 16.8101 6.18995 16.8101 6.42426 16.5757L9 14'
										stroke='#1074FF'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
									<path
										d='M16 7L12 11'
										stroke='#1074FF'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
									<path
										d='M7 12L11.5757 16.5757C11.8101 16.8101 12.1899 16.8101 12.4243 16.5757L22 7'
										stroke='#1074FF'
										strokeWidth='1.5'
										strokeLinecap='round'
									/>
								</svg>
								Mark all as read
							</button>
							<button
								className='px-2 py-2 bg-[#ECF0F7] focus:bg-[#FAFAFA] text-[#455063] rounded-full active:scale-105 transition-all ease-out duration-150 select-none w-fit focus:border focus:border-[#455063] font-semibold'
								onClick={() => alert("Options not implemented :/")}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='2rem'
									height='2rem'
									viewBox='0 0 24 24'
									fill='none'>
									<path
										d='M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z'
										stroke='#000000'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
									<path
										d='M12.9046 3.06005C12.6988 3 12.4659 3 12 3C11.5341 3 11.3012 3 11.0954 3.06005C10.7942 3.14794 10.5281 3.32808 10.3346 3.57511C10.2024 3.74388 10.1159 3.96016 9.94291 4.39272C9.69419 5.01452 9.00393 5.33471 8.36857 5.123L7.79779 4.93281C7.3929 4.79785 7.19045 4.73036 6.99196 4.7188C6.70039 4.70181 6.4102 4.77032 6.15701 4.9159C5.98465 5.01501 5.83376 5.16591 5.53197 5.4677C5.21122 5.78845 5.05084 5.94882 4.94896 6.13189C4.79927 6.40084 4.73595 6.70934 4.76759 7.01551C4.78912 7.2239 4.87335 7.43449 5.04182 7.85566C5.30565 8.51523 5.05184 9.26878 4.44272 9.63433L4.16521 9.80087C3.74031 10.0558 3.52786 10.1833 3.37354 10.3588C3.23698 10.5141 3.13401 10.696 3.07109 10.893C3 11.1156 3 11.3658 3 11.8663C3 12.4589 3 12.7551 3.09462 13.0088C3.17823 13.2329 3.31422 13.4337 3.49124 13.5946C3.69158 13.7766 3.96395 13.8856 4.50866 14.1035C5.06534 14.3261 5.35196 14.9441 5.16236 15.5129L4.94721 16.1584C4.79819 16.6054 4.72367 16.829 4.7169 17.0486C4.70875 17.3127 4.77049 17.5742 4.89587 17.8067C5.00015 18.0002 5.16678 18.1668 5.5 18.5C5.83323 18.8332 5.99985 18.9998 6.19325 19.1041C6.4258 19.2295 6.68733 19.2913 6.9514 19.2831C7.17102 19.2763 7.39456 19.2018 7.84164 19.0528L8.36862 18.8771C9.00393 18.6654 9.6942 18.9855 9.94291 19.6073C10.1159 20.0398 10.2024 20.2561 10.3346 20.4249C10.5281 20.6719 10.7942 20.8521 11.0954 20.94C11.3012 21 11.5341 21 12 21C12.4659 21 12.6988 21 12.9046 20.94C13.2058 20.8521 13.4719 20.6719 13.6654 20.4249C13.7976 20.2561 13.8841 20.0398 14.0571 19.6073C14.3058 18.9855 14.9961 18.6654 15.6313 18.8773L16.1579 19.0529C16.605 19.2019 16.8286 19.2764 17.0482 19.2832C17.3123 19.2913 17.5738 19.2296 17.8063 19.1042C17.9997 18.9999 18.1664 18.8333 18.4996 18.5001C18.8328 18.1669 18.9994 18.0002 19.1037 17.8068C19.2291 17.5743 19.2908 17.3127 19.2827 17.0487C19.2759 16.8291 19.2014 16.6055 19.0524 16.1584L18.8374 15.5134C18.6477 14.9444 18.9344 14.3262 19.4913 14.1035C20.036 13.8856 20.3084 13.7766 20.5088 13.5946C20.6858 13.4337 20.8218 13.2329 20.9054 13.0088C21 12.7551 21 12.4589 21 11.8663C21 11.3658 21 11.1156 20.9289 10.893C20.866 10.696 20.763 10.5141 20.6265 10.3588C20.4721 10.1833 20.2597 10.0558 19.8348 9.80087L19.5569 9.63416C18.9478 9.26867 18.6939 8.51514 18.9578 7.85558C19.1262 7.43443 19.2105 7.22383 19.232 7.01543C19.2636 6.70926 19.2003 6.40077 19.0506 6.13181C18.9487 5.94875 18.7884 5.78837 18.4676 5.46762C18.1658 5.16584 18.0149 5.01494 17.8426 4.91583C17.5894 4.77024 17.2992 4.70174 17.0076 4.71872C16.8091 4.73029 16.6067 4.79777 16.2018 4.93273L15.6314 5.12287C14.9961 5.33464 14.3058 5.0145 14.0571 4.39272C13.8841 3.96016 13.7976 3.74388 13.6654 3.57511C13.4719 3.32808 13.2058 3.14794 12.9046 3.06005Z'
										stroke='#000000'
										strokeWidth='2'
										strokeLinecap='round'
										strokeLinejoin='round'
									/>
								</svg>
							</button>
						</div>
						{/* Modal content here, including sections for all and unread notifications */}
						<div className='relative gap-4 overflow-y-auto max-h-[80%]'>
							{notifications
								.filter(notification => {
									if (activeSection === "all") return true;
									if (activeSection === "unread") return !notification.isRead;
									return notification.type === activeSection;
								})
								.map(notification => (
									<NotificationComponent
										key={notification.id}
										notification={notification}
										markAsRead={markAsRead}
									/>
								))}
						</div>
					</div>
				</div>
			) : null}
		</>
	);
};

export default NotificationsModal;
