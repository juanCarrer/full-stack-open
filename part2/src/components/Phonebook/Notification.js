export const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return (
		<div className="notification--ok">
			<b>{message}</b>
		</div>
	)
}