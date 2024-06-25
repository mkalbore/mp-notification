//StatusChangePage.tsx
import NotificationComponent from "../NotificationComponent";

const StatusChangePage = () => {
	// Retrieve the notifications string from local storage
	const notificationsString = localStorage.getItem("notifications");

	// Parse the string back into an array
	const notifications = notificationsString
		? JSON.parse(notificationsString)
		: [];

	// Find the specific notification with id= "x"
	const specificNotification = notifications.find(
		(notification: { id: string }) => notification.id === "3"
	);

	// Now you can use `specificNotification` as needed
	if (specificNotification) {
		console.log("Found specific notification:", specificNotification);
	} else {
		console.log("Specific notification with id=1 not found");
	}

	return (
		<div className='bg-blue-300'>
			<h1 className='py-4 text-4xl font-semibold'>Status Change Page</h1>
			<div className='fixed top-0 right-0 m-8 z-100'>
				{specificNotification && (
					<NotificationComponent
						notification={specificNotification}
						markAsRead={(id: string) => {
							// Implement the markAsRead functionality
							console.log(`Marking notification with id=${id} as read`);
							// Update the notification's read status in your state or backend
						}}
					/>
				)}
			</div>
		</div>
	);
};

export default StatusChangePage;
