import { useReducer } from "react";

const initialState = { count: 0 };

const reducer = (currentState, action) => {
  console.log("currentState", currentState);
  console.log("action", action);
  switch (action.type) {
    case "increment":
      return { count: currentState.count + 1 };
    case "decrement":
      return { count: currentState.count - 1 };
    case "incrementBySetAmount":
      return { count: currentState.count + action.payload };
    default:
      return currentState;
  }
};

const UseReducerExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button
        onClick={() => dispatch({ type: "incrementBySetAmount", payload: 3 })}
      >
        Increment by 3
      </button>
    </div>
  );
};

export default UseReducerExample;
