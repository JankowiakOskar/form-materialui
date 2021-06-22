import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@material-ui/lab";

const Notification = ({ type, message, onCloseHandler = undefined }) => (
	<Alert severity={type} {...(onCloseHandler && { onClose: onCloseHandler })}>
		<AlertTitle>{type === "success" ? "Success" : "Error"}</AlertTitle>
		{message}
	</Alert>
);

Notification.propTypes = {
	type: PropTypes.oneOf(["success", "error"]).isRequired,
	message: PropTypes.string.isRequired,
	onCloseHandler: PropTypes.func,
};

export default Notification;
