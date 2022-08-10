const Notification = ({ message, isWarning }) => {
  console.log('asdasdsd', message);
  if (!message) return;
  const NotificationStyle = {
    color: isWarning ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div style={NotificationStyle}>{message}</div>;
};

export default Notification;
