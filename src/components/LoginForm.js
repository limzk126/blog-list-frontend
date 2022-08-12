import Notification from './Notification';

const LoginForm = ({
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  message,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Notification message={message.text} isWarning={message.isWarning} />
        <div>
          Username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => handleUsernameChange(target.value)}
            id="usernameInput"
          />
        </div>
        <div>
          Password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => handlePasswordChange(target.value)}
            id="passwordInput"
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
