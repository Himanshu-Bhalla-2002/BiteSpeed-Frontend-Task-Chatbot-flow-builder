// Display error or success notification based on props
const Notification = ({ errorMessage, messageColor }) => {
  return errorMessage ? (
    <div className={messageColor}>{errorMessage}</div>
  ) : (
    <div className="notification-placeholder" style={{ padding: 19 }}></div>
  );
};

export default Notification;
