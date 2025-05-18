import { useEffect, useState } from "react";

const UseEffectExample = () => {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    console.log("render");
  }, [hidden]);

  return (
    <div>
      <button onClick={() => setHidden((prev) => !prev)}>Click</button>
    </div>
  );
};
export default UseEffectExample;
