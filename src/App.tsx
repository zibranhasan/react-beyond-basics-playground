import { useContext } from "react";
import "./App.css";
// import UseEffectExample from "./pages/UseEffectExample";
import UseRefExample from "./pages/UseRefExample";
import { ThemeContext, type TThemeContext } from "./context/ThemeProvider";
import { MenuItem, MenuList } from "./components/Menu";
import Profile from "./components/Profile";
import GameResult from "./components/GameResult";
import UsersContainer from "./components/UsersContainer";
import Select from "./components/Select";
// import UseReducerExample from "./pages/UseReducerExample";
// import UseStateExample from "./pages/UseStateExample";

function App() {
  const { dark, setDark } = useContext(ThemeContext) as TThemeContext;
  console.log(dark);
  return (
    <div
      className={`h-screen w-full flex justify-center items-center ${
        dark ? "bg-black" : "bg-wite"
      }`}
    >
      {/* <UseStateExample />
      <UseReducerExample /> */}
      {/* <UseEffectExample /> */}
      {/* <MenuList>
        <MenuItem></MenuItem>
      </MenuList>
      <button onClick={() => setDark(!dark)}>Toggle</button>
      <UseRefExample /> */}
      {/* <Profile /> */}
      {/* <GameResult />
      <UsersContainer /> */}
      <Select>
        <Select.SelectOption value="option1">Option 1</Select.SelectOption>
        <Select.SelectOption value="option2">Option 2</Select.SelectOption>
        <Select.SelectOption value="option3">Option 3</Select.SelectOption>
        <Select.SelectOption value="option4">Option 4</Select.SelectOption>
      </Select>
    </div>
  );
}

export default App;
