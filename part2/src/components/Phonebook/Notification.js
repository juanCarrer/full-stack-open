export const Notification = ({ message, error = false }) => {
	if (message === null) {
		return null
	}

	return (
		<div className={`notification ${error ? 'notification--error' : 'notification--ok'}`}>
			<b>{message}</b>
		</div>
	)
}