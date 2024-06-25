import { describe, it, expect } from "vitest";
import { render} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NotificationComponent from "../../components/NotificationComponent";
import { NotificationProps } from "../../types/NotificationProps";
import "@testing-library/jest-dom";

// Additional imports for checking SVG presence
import { screen } from "@testing-library/react";

describe("NotificationComponent Icons", () => {
	it("renders the request icon for request notifications", () => {
		const requestNotification: NotificationProps = {
			notification: {
				id: "1",
				type: "request",
				message: "We have launched a new product!",
				timestamp: "yesterday",
				isRead: false,
			},
			markAsRead: mockMarkAsRead,
		};

		render(
			<MemoryRouter>
				<NotificationComponent {...requestNotification} />
			</MemoryRouter>
		);

		// Assuming the SVG for request has a unique test ID or role, adjust as necessary
		expect(screen.getByTestId("request-sent-16px")).toBeInTheDocument();
	});

	it("renders the status change icon for status-change notifications", () => {
		const statusChangeNotification: NotificationProps = {
			notification: {
				id: "2",
				type: "status-change",
				message: "Jan Nowak from XYZ sent you a message!",
				timestamp: "yesterday",
				isRead: true,
			},
			markAsRead: mockMarkAsRead,
		};

		render(
			<MemoryRouter>
				<NotificationComponent {...statusChangeNotification} />
			</MemoryRouter>
		);

		// Assuming the SVG for status-change has a unique test ID or role, adjust as necessary
		expect(
			screen.getByRole("img", { name: "status-change-icon" })
		).toBeInTheDocument();
	});

	it("renders the new feature icon for new-feature notifications", () => {
		const newFeatureNotification: NotificationProps = {
			notification: {
				id: "3",
				type: "new-feature",
				message: "Your subscription has been updated.",
				timestamp: "2 days ago",
				isRead: false,
			},
			markAsRead: mockMarkAsRead,
		};

		render(
			<MemoryRouter>
				<NotificationComponent {...newFeatureNotification} />
			</MemoryRouter>
		);

		// Assuming the SVG for new-feature has a unique test ID or role, adjust as necessary
		expect(
			screen.getByRole("img", { name: "new-feature-icon" })
		).toBeInTheDocument();
	});

	// More tests if necessary
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mockMarkAsRead(id: string): void {
	throw new Error("Function not implemented.");
}
