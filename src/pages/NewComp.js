import React from "react";
import { useSelector, useDispatch } from "react-redux";

function NewComp() {
  const message = useSelector((state) => state.commonReducer.message);
  const dispatch = useDispatch();
  function ButtonChange() {
    dispatch({ type: "message change" });
  }
  return (
    <div className="App">
      <h3>{message}</h3>
      <button onClick={ButtonChange}>Subscribe</button>
    </div>
  );
}

// const mapStatetoProps = (state) => {
//   console.log(state);
//   return {
//     message: state.commonReducer.message,
//   };
// };

// const mapDispatchtoProps = (dispatch) => {
//   return {
//     ButtonChange: () => {
//       dispatch({ type: "message change" });
//     },
//   };
// };

export default NewComp;
