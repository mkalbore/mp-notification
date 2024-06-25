import React from "react";
import { useNavigate } from "react-router-dom";
import type { NotificationProps } from "../../types/NotificationProps";

const NotificationComponent: React.FC<NotificationProps> = ({
	notification,
	markAsRead,
}) => {
	const navigate = useNavigate();

	const renderIcon = (type: string) => {
		switch (type) {
			case "request":
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='#000000'
						width='30px'
						height='30px'
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
				);
			case "status-change":
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='30px'
						height='30px'
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
				);
			case "new-feature":
				return (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='30px'
						height='30px'
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
				);
			default:
				return null;
		}
	};

	const handleNotificationClick = () => {
		markAsRead(notification.id);
		switch (notification.type) {
			case "request":
				navigate("/request");
				break;
			case "status-change":
				navigate("/status-change");
				break;
			case "new-feature":
				navigate("/new-feature");
				break;
			default:
				return null;
		}
	};

	return (
		<div
			className={`flex p-4 text-black justify-start rounded-xl notification items-start gap-8 hover:cursor-pointer hover:opacity-75 ${
				notification.isRead ? "read bg-[#FFFFFF]" : "unread bg-[#F3F3F7]"
			}`}
			onClick={handleNotificationClick}>
			<div
				className='rounded-full w-1 h-full p-6'
				id='notification-avatar select-none'>
				{renderIcon(notification.type)}
			</div>
			<div className='flex flex-col items-start gap-2' id='notification-text'>
				<p className={`${notification.isRead ? "" : "font-semibold"}`}>
					{notification.message}
				</p>
				<small className='text-[#455063] text-opacity-50 font-semibold'>
					{notification.timestamp}
				</small>
			</div>
			{!notification.isRead && (
				<p
					className='flex p-2 rounded-full w-1 h-full select-none bg-[#1C79FF]'
					id='notification-status'
					onClick={() => markAsRead(notification.id)}></p>
			)}
		</div>
	);
};

export default NotificationComponent;
