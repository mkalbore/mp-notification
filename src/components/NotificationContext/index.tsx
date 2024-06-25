import React, { createContext, useContext, useState, useEffect } from "react";
import type { Notification } from "../../types/NotificationProps";

interface NotificationContextType {
	notifications: Notification[];
	markAsRead: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined
);

export const useNotifications = () => {
	const context = useContext(NotificationContext);
	if (context === undefined) {
		throw new Error(
			"useNotifications must be used within a NotificationProvider"
		);
	}
	return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [notifications, setNotifications] = useState<Notification[]>([]);

	useEffect(() => {
		// Fetch notifications from JSON file or API
		// For this example, let's assume we have a function fetchNotifications that does this
		const fetchNotifications = async () => {
			// This could be replaced with an actual API call
			const notificationsData: Notification[] = await import(
				"./notifications.json"
			);
			setNotifications(notificationsData);
		};
		fetchNotifications();
	}, []);

	const markAsRead = (id: string) => {
		setNotifications(
			notifications.map(notification =>
				notification.id === id
					? { ...notification, isRead: true }
					: notification
			)
		);
	};

	return (
		<NotificationContext.Provider value={{ notifications, markAsRead }}>
			{children}
		</NotificationContext.Provider>
	);
};
