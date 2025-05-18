import { useState } from "react";

const UseStateExample = () => {
  const [user, setUser] = useState({ name: "", email: "" });

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputName = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [inputName]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleChange} name="name" id="name" />
      <input type="text" onChange={handleChange} name="email" id="email" />
      <button type="submit">Submit</button>
    </form>
  );
};
export default UseStateExample;
