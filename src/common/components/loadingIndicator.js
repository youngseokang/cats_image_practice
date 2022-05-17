import "../../styles/loadingIndicator.css";

function LoadingIndicator() {
  return (
    <div className="lds-ellipsis">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default LoadingIndicator;
