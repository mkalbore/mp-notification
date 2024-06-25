export interface Notification {
	id: string;
	message: string;
	timestamp: string;
	isRead: boolean;
	type: "request" | "status-change" | "new-feature";
}

export interface NotificationProps {
	notification: Notification;
	markAsRead: (id: string) => void;
}
