const Digit = (props) => {
  return (
    <div className="button">
      <h2 id={props.id} onClick={props.enterDigit}>
        {props.digit}
      </h2>
    </div>
  );
};

export default Digit;
