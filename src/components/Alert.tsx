interface AlertProps {
  message: string;
}

function Alert({ message }: AlertProps) {
  return (
    <div className="toast">
      <div className="alert alert-error">
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Alert;
