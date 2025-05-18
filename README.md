
## 🖼️ 2. **Renderer** (e.g. `react-dom`, `react-native`)

### What it does:

- Takes the changes (from the reconciler) and **applies them to the actual UI**
    - For the web: uses `document.createElement`, `appendChild`, etc.
    - For React Native: interacts with native views
    - For custom environments: could update a terminal, a game canvas, etc.

==⇒How react rendering works????===⇒>>

| Term | Trigger | React Action |
| --- | --- | --- |
| Initial Render | First `render(<App />)` | Builds DOM for the first time |
| Re-render | State/prop/context changes | Runs function again, diffs, updates changed parts |
| Render | Generic term | Just means "run the component to build VDOM" |

## 🔁 What Is Reconciliation in React?

**Reconciliation** is the process React uses to **figure out what changed** in the UI when a component re-renders — and then update the real DOM **efficiently**.

In other words:

> Reconciliation = diffing + updating
> 
> 
> It compares the **new Virtual DOM** with the **previous one**, and figures out:
> 
> - What to update
> - What to keep the same
> - What to remove

---

## 🧠 Why Is It Needed?

The DOM is slow. Re-rendering the whole DOM on every update would be very inefficient.

So React:

- Keeps a copy of the **previous virtual DOM**
- Creates a **new virtual DOM** on each render
- Compares them (this is reconciliation)
- Updates only the **real DOM parts that changed**

==⇒>>>Strictmode on react <≤========

| Feature | Description |
| --- | --- |

| Purpose | Catch bugs, side effects, and legacy patterns early |
| --- | --- |

| Affects | Only in development (no impact in production) |
| --- | --- |

| What it does | Double-invokes lifecycle functions, shows warnings***** |
| --- | --- |

| When to use it | Always wrap root component in `<StrictMode>` during development |
| --- | --- |

=====⇒>>>>Memory leak =======⇒>>

Imagine you're going on a hike and carrying a **backpack**.

Every time you pick up something useful (like a snack, water, or map), you put it in the backpack.

But now imagine:

> You never take anything out, even after it's useless.
> 
> 
> Used wrappers? Still there.
> 
> Empty water bottles? Still there.
> 
> Old maps? Still there.
> 

At first, the backpack feels fine. But after a few hours...

- It's getting heavier
- You’re getting slower
- Eventually, you can't carry it anymore

👉 **That’s a memory leak**.

## In Programming Terms

- Your **backpack** = your app's memory (RAM)
- Each **item you add** = variables, listeners, timers, data
- If you **don’t remove old/unused stuff**, the app’s memory fills up over time.

`useEffect` only runs when the component **mounts** (appears) and **cleans up when it unmounts** (disappears) — **but only if** you write the cleanup logic!

## 🧩 What Happens with `useEffect`

```jsx
jsx
CopyEdit
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);
}, []);

```

### 🔹 What’s going on:

- This sets up a timer that runs **every second**
- But there's **no cleanup**
- So even if you **leave the page**, the timer **still runs in the background**

## ✅ Correct Way: Add Cleanup

```jsx
jsx
CopyEdit
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(timer); // ✅ Turn off the light
  };
}, []);

```

Now, when the user:

1. Navigates **to** the page → `useEffect` runs and sets timer
2. Navigates **away** from the page → cleanup runs, timer stops

==============⇒>>>Batching===============⇒

*This is called batch update

```tsx
import { useState } from "react";

const UseStateExample = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 1); 0
    setCounter(counter + 1); 0
    setCounter(counter + 1); 0
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleIncrement}>Increment by 3</button>
      <button onClick={() => setCounter((prvStatus) => prvStatus - 1)}>
        Decrement
      </button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
};
export default UseStateExample;

import { useState } from "react";

const UseStateExample = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prevState) => prevState + 1);
    setCounter((prevState) => prevState + 1);
    setCounter((prevState) => prevState + 1);
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleIncrement}>Increment by 3</button>
      <button onClick={() => setCounter((prvStatus) => prvStatus - 1)}>
        Decrement
      </button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
};
export default UseStateExample;
import { useState } from "react";

const UseStateExample = () => {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter(counter + 3);
  };
  const handleasyncIncrement = () => {
    setTimeout(() => {
      setCounter(counter + 1); initial state ta dore rakhe 
    }, 2000);
  };

  return (
    <div>
      <h1>{counter}</h1>
      <button onClick={handleIncrement}>Increment by 3</button>
      <button onClick={handleasyncIncrement}>asyncIncrement</button>
      <button onClick={() => setCounter(0)}>Reset</button>
    </div>
  );
};
export default UseStateExample;

📊 Summary Table
Type	Behavior	Final Counter
setCounter(counter + 1)	Uses old value 3 times → 1 effective call	1
setCounter(prev => prev + 1)	Each call sees updated value	3
```

1.state 3 ta thakle ebong prottek er number 3 kore na bede, sudu prothomber er junno e bade.react shobgula state change er junno ekshate state update kore.

**Batching**: To avoid re-rendering the UI multiple times.

**Scheduling and Prioritization** (React 18)

React is smart — it doesn't blindly update state immediately. Instead, it **schedules** updates and decides **when** to do them, depending on:

- App performance
- User interactions
- Network speed

This makes React apps **feel smoother**.

## ✅ Summary

| Why React waits? | Explanation |
| --- | --- |
| 🧠 Performance | Reduces re-renders by batching |
| 🎯 Smart scheduling | Helps React prioritize UI updates |
| ⚙️ Functional update support | Enables reliable async logic like `(prev) => prev + 1` |
| 🚀 Real benefit | Smooth, fast, scalable user experiences |

===========⇒Drilling(state lift up) ============

```tsx
import "./App.css";
import UseStateExample from "./pages/UseStateExample";
import { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <>
      <div>
        <h1>React App</h1>
        <UseStateExample counter={counter} setCounter={setCounter} />
      </div>
    </>
  );
}

export default App;

```

```tsx
type TCounter = {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
};

const UseStateExample = ({ counter, setCounter }: TCounter) => {
  return (
    <div>
      <h1>Counter:{counter}</h1>

      <button onClick={() => setCounter(counter + 1)}>Increment</button>
    </div>
  );
};

export default UseStateExample;

```

=============⇒Form ===============

## ✅ Summary Table

| Attribute | Purpose |
| --- | --- |
| `type="text"` | Input accepts single-line text |
| `onChange={}` | Runs a function when input value changes |
| `name="name"` | Identifies input in forms / multi-input handling |
| `id="name"` | Unique DOM identifier for styling, labels, accessibility |

```tsx
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

```

====⇒>>>useReducer   =======⇒>>>

## 🧠 What is `useReducer`?

`useReducer` is a **React Hook** used for state management, just like `useState`, but it's better when:

- You have **multiple related state values**
- You want **cleaner logic** for complex updates
- You like the Redux-style approach

> Think of useReducer as a more powerful useState.
> 

## 🧩 Basic Syntax:

```tsx
tsx
CopyEdit
const [state, dispatch] = useReducer(reducer, initialState);

```

- `state`: current state value
- `dispatch(action)`: function to send actions
- `reducer(state, action)`: function that returns a **new state**
- `initialState`: the starting value of your state

```tsx
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

```

### ✅ Generic Form with `useReducer`

```tsx
tsx
CopyEdit
import { useReducer } from "react";

const initialState = {
  name: "",
  email: "",
};

const reducer = (currentState, action) => {
  console.log("currentState", currentState);
  console.log("action", action);

  switch (action.type) {
    case "updateField":
      return {
        ...currentState,
        [action.field]: action.value,
      };
    default:
      return currentState;
  }
};

const UseReducerFormExample = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e) => {
    dispatch({
      type: "updateField",
      field: e.target.name,
      value: e.target.value,
    });
  };

  return (
    <div>
      <h2>Generic useReducer Form</h2>
      <inputtype="text"
        name="name"
        value={state.name}
        onChange={handleChange}
        placeholder="Enter name"
      />
      <br />
      <inputtype="email"
        name="email"
        value={state.email}
        onChange={handleChange}
        placeholder="Enter email"
      />
      <br />
      <p>👤 Name: {state.name}</p>
      <p>📧 Email: {state.email}</p>
    </div>
  );
};

export default UseReducerFormExample;

```

========⇒>>>>>>>>>useEffect======⇒>>>>>

| Feature | `useEffect` | `useMemo` |
| --- | --- | --- |
| When it runs | After render | During render |
| Purpose | Run side-effects | Return memoized values |
| Returns | Nothing or cleanup function | A computed value |
| Common use cases | API calls, DOM updates | Expensive computations, derived data |
| Not used for | Calculations during render | Side effects like fetching |

⇒Event = ami nije kicu trigger korle ghotbe.

⇒useEffect = kono ekta component load hole kono ekta kicu ghotbe.

## 🔍 Summary

| Concept | Description |
| --- | --- |
| `useEffect()` | Hook to run side-effects |
| `[]` | Runs once on mount |
| `[dep]` | Runs on mount + whenever `dep` changes |
| `return () => {}` | Cleanup function |

## ❌ Common Mistakes

| Mistake | Why it's bad |
| --- | --- |
| Forgetting cleanup | Can cause memory leaks (like in `setInterval`) |
| Missing dependencies | Can lead to stale values |
| Using effects to do things that should be handled inside the render | Makes component harder to understand |

```tsx
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
1.first ei component jhkn e load hbe thkn ei useEffect run hbe
2.dep jotobar trigger hbe totobar useEffect ta run be.
3.Interesting part=>clean up ta age run hbe, tarpor useEffect er pet er bitor ta run hbe.
⚙️ Cleanup Function
const [count, setCount] = useState(0);
useEffect(() => {
  const timer = setInterval(() => {
  setCount((prev) => prev + 1)
    console.log("running...");
  }, 1000);

  return () => clearInterval(timer); // Clean up when unmounting or re-running
}, []);
Use the return function to clean up timers, subscriptions, or listeners. Without cleanup, you risk memory leaks.
```

```tsx
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
1.first ei component jhkn e load hbe thkn ei useEffect run hbe
2.dep jotobar trigger hbe totobar useEffect ta run be.
3.Interesting part=>clean up ta age run hbe, tarpor useEffect er pet er bitor ta run hbe.
⚙️ Cleanup Function
const [count, setCount] = useState(0);
useEffect(() => {
  const timer = setInterval(() => {
  setCount((prev) => prev + 1)
    console.log("running...");
  }, 1000);

  return () => clearInterval(timer); // Clean up when unmounting or re-running
}, []);
Use the return function to clean up timers, subscriptions, or listeners. Without cleanup, you risk memory leaks.
```

### **Abort Fetch Requests (Advanced)**

```tsx

useEffect(() => {
  const controller = new AbortController();

  fetch("https://api.example.com", { signal: controller.signal })
    .then(res => res.json())
    .then(data => setData(data));

  return () => controller.abort();
}, []);

```

🔌 This prevents you from setting state on an unmounted component if the fetch is too slow.

## ✅ Value Types vs Reference Types in JavaScript

JavaScript has two main data type behaviors:

| Type | Examples | Compared By |
| --- | --- | --- |
| **Value types** | `number`, `string`, `boolean`, etc. | Compared by **value** |
| **Reference types** | `object`, `array`, `function` | Compared by **reference** |

const obj1 = {name:’zibran’,email:”zibran@gmail.com”}

const obj2 = {name:’zibran’,email:”zibran@gmail.com”}

console.log(obj1 == obj2); false⇒karon ei khetre ekta refference type toiri kore rakhe.

### Why is this false?

- Both `obj1` and `obj2` **look the same**.
- But they are **two different objects in memory** (two different reference addresses).
- So `obj1 == obj2` compares **their memory locations**, not content → and they're different.

🧠 Think of it like two different books with the same content — but they are still different **copies**.

const obj1 = {name:’zibran’,email:”zibran@gmail.com”}

const obj2 = obj1;

console.log(obj1 == obj2); true;

### Why is this true?

- `obj2` is not a new object — it’s a **reference to the same object** as `obj1`.
- So both `obj1` and `obj2` point to the **same memory location**.
- That means `obj1 == obj2` is true.

📦 You didn’t copy the object — you just gave the same object a second name.

### 🔁 Visual Analogy

| Code | Memory Reference |
| --- | --- |
| `const obj1 = {...}` | obj1 → 🧠 `Object123` |
| `const obj2 = {...}` | obj2 → 🧠 `Object456` (new one) |
| `const obj2 = obj1` | obj2 → same 🧠 `Object123` |

# **UseRef**

## 🏠 Real-Life Analogy: A **Sticky Note**

Imagine you're working at a desk, and you have a **sticky note** where you write something down to remember later — like:

> "Call John at 5 PM"
> 

Now:

- You **can look at that sticky note anytime**.
- You can **change it without telling anyone**.
- But it doesn’t **change what you're doing right now** — it's just there for reference.

**This is like `useRef`** in React:

- It **stores a value**
- You can **read and update it**
- It **doesn’t trigger anything automatically** like a re-render

---

## 🧪 Real-Life Example in React: Focusing an Input

Imagine you have an input box, and you want it to **automatically get focused** (cursor inside it) when the page loads. That’s something you’d do with `useRef`.

### ✅ Code:

```tsx
tsx
CopyEdit
import { useRef, useEffect } from "react";

function FocusExample() {
  const inputRef = useRef(null); // 📌 Create the sticky note (ref)

  useEffect(() => {
    inputRef.current.focus(); // 📌 When page loads, tell browser to focus input
  }, []);

  return (
    <div>
      <h2>Auto Focus Example</h2>
      <input ref={inputRef} placeholder="Type here..." />
    </div>
  );
}

```

### 🔍 What’s Happening:

- `useRef(null)` creates a special **sticky note** (`inputRef`)
- The input element gets connected to that sticky note using `ref={inputRef}`
- In `useEffect`, we say: “Hey browser, focus that input using `inputRef.current`”
- That’s like looking at your sticky note and doing something with what’s written there

### 🧠 What Happens Step-by-Step:

1. `myRef` is created (starts as `{ current: null }`)
2. The component renders, and the `input` element is linked to `myRef`
3. `useEffect` runs after render → calls `myRef.current.focus()` → input is focused automatically!

# We can also send useRef as a child

```tsx
import { useEffect, useRef } from "react";

import CustomInput from "../components/CustomInput";
const UseRefExample = () => {
  const myRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    myRef.current?.focus();
  }, []);
  return (
    <div>
      <h1>UseRef</h1>
      <form>
        <CustomInput ref={myRef} className="border border-red-500" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UseRefExample;

```

```tsx
import { forwardRef } from "react";

interface CustomInputProps {
  className?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ className }, ref) => {
    return (
      <input
        ref={ref}
        className={className}
        type="text"
        name="name"
        id="name"
      />
    );
  }
);

export default CustomInput;

```

**React Context Provider**

## 🧠 In Depth: Props vs Context in React

| **Use Props When...** | **Use Context When...** |
| --- | --- |
| ✅ **State is needed in a few specific places** (usually parent → child or two levels deep) | ✅ **State is needed in many places** across the component tree (e.g., header, footer, sidebar, etc.) |
| ✅ **You want component relationships to be explicit and predictable** | ✅ **You want components to be flexible and work independently of where they are in the tree** |
| ✅ **You're building isolated UI components or reusable logic** that should stay self-contained | ✅ **You're managing global concerns** like authentication, user preferences, theming, or app-wide data |
| ✅ **You need to pass a function or value that is temporary or one-off** | ✅ **The state must persist and synchronize across the app**, and be accessible from anywhere |
| ✅ **You want to keep data flow linear** to make testing/debugging easier in small apps | ✅ **You want to avoid prop drilling** (passing the same props through layers of components that don’t use them) |

src/context/ThemeProvider.tsx

```tsx
import React, {
  createContext,
  useState,
  type Dispatch,
  type ReactNode,
} from "react";

type TThemeContext = {
  dark: boolean;
  setDark: Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeContext = createContext<TThemeContext | undefined>(undefined);

type TThemeProviderProps = {
  children: ReactNode;
};

const ThemeProvider = ({ children }: TThemeProviderProps) => {
  const [dark, setDark] = useState(false);

  const values = {
    dark,
    setDark,
  };

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};
export default ThemeProvider;

```

main.tsx

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);

```

app.tsx

```tsx
import { useContext } from "react";
import "./App.css";
// import UseEffectExample from "./pages/UseEffectExample";
import UseRefExample from "./pages/UseRefExample";
import { ThemeContext } from "./context/ThemeProvider";
// import UseReducerExample from "./pages/UseReducerExample";
// import UseStateExample from "./pages/UseStateExample";

function App() {
  const { dark, setDark } = useContext(ThemeContext);
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
      <button onClick={() => setDark(!dark)}>Toggle</button>
      <UseRefExample />
    </div>
  );
}

export default App;

```

⇒Amra chaile context specific component er modde use korte pari.

```tsx
import { createContext, useContext } from "react";

const MenuContext = createContext(null);

export const MenuList = ({ children }) => {
  return (
    <MenuContext.Provider value={{ theme: "dark" }}>
      <ul>{children}</ul>
    </MenuContext.Provider>
  );
};

export const MenuItem = () => {
  const { theme } = useContext(MenuContext);
  console.log(theme);
  return <div>Menu Item</div>;
};

```

```tsx
import { useContext } from "react";
import "./App.css";
// import UseEffectExample from "./pages/UseEffectExample";
import UseRefExample from "./pages/UseRefExample";
import { ThemeContext, type TThemeContext } from "./context/ThemeProvider";
import { MenuItem, MenuList } from "./components/Menu";
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
      <MenuList>
        <MenuItem></MenuItem>
      </MenuList>
      <button onClick={() => setDark(!dark)}>Toggle</button>
      <UseRefExample />
    </div>
  );
}

export default App;

```

==⇒ Higher order component

### ✅ Definition (In JavaScript terms)

A **higher-order function** in JavaScript is a function that:

- Takes another function as a parameter, or
- Returns another function.

### Example 1: Passing a Function as an Argument

```jsx
javascript
CopyEdit
function greet(name) {
  return `Hello, ${name}!`;
}

function processUserInput(callback) {
  const name = "Alice";
  return callback(name);
}

console.log(processUserInput(greet)); // Output: Hello, Alice!

```

> Here, processUserInput is a higher-order function because it accepts greet (a function) as an argument.
> 

### 🔹 Example 2: Returning a Function

```jsx
javascript
CopyEdit
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // Output: 10

```

> multiplier is a higher-order function because it returns a new function.
> 

⇒>>>A **classic example of function composition** using higher-order functions.

```jsx
const wrapperFunction = (func) => {
  return (num) => {
    return func(num) * 2;
  };
};

const addOne = (num) => {
  return num + 1;
};
console.log(addOne(2));
const addOneAndDouble = wrapperFunction(addOne);
console.log(addOneAndDouble(4));

```

===⇒>>>Higher order component=====⇒>>>

```tsx
function App() {
  const { dark, setDark } = useContext(ThemeContext) as TThemeContext;
  console.log(dark);
  return (
    <div
      className={`h-screen w-full flex justify-center items-center ${
        dark ? "bg-black" : "bg-wite"
      }`}
    >
     
      <GameResult />
    </div>
  );
}

export default App;

```

```tsx
const UserAvater = ({ imageURL }) => {
  return (
    <div>
      <img
        className="w-15 h-15 rounded-full object-cover"
        alt="User Avatar"
        src={imageURL}
      />
    </div>
  );
};
export default UserAvater;

```

```tsx
const withBorder = (WrappedComponent) => {
  return (props) => (
    <div className="border-2 border-purple-500 border-rounded">
      <WrappedComponent {...props} />
    </div>
  );
};
export default withBorder;

```

```tsx
import UserAvater from "./UserAvater";
import withBorder from "./withBorder";

const UserWithBorder = withBorder(UserAvater);""""sending component into component

const GameResult = () => {
  return (
    <div className="flex flex-row gap-5">
      <UserAvater
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <UserWithBorder
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <UserAvater
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
      <UserAvater
        imageURL={
          "https://images.unsplash.com/photo-1745600132390-6e85c23ea13a?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      />
    </div>
  );
};
export default GameResult;

```

## ===⇒>>Container and Presentational Pattern

```tsx
import { useEffect, useState } from "react";

const UsersContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/users";
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      {data.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};
export default UsersContainer;

```

evabe kora jay, same component er moddei data fetching ebong rendering.

Right way:::

1.ek component e data fetch

2.arek component e rendering.

```tsx
import { useEffect, useState } from "react";
import UserList from "./UserList";

const UsersContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const url = "https://jsonplaceholder.typicode.com/users";
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <UserList data={data} error={error} isLoading={isLoading} />;
};
export default UsersContainer;

```

```tsx
const UserList = ({ isLoading, error, data }) => {
  if (isLoading && !error) {
    return <p>Loading....</p>;
  }
  if (error) {
    return <p>Something went wrong</p>;
  }
  return (
    <div>
      {data.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
};
export default UserList;

```

## ====⇒>Component composition with hooks(custom hooks)

```tsx
import { useEffect, useState } from "react";

const useUsersData = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const controller = new AbortController();
  const url = "https://jsonplaceholder.typicode.com/users";
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(url, { signal: controller.signal });
      const data = await res.json();
      setIsLoading(false);
      setData(data);
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    getUsers();
    return () => {
      controller.abort();
    };
  }, []);
  return { isLoading, error, data };
};
export default useUsersData;

```

```tsx
import UserList from "./UserList";
import useUsersData from "../hooks/useUsersData";

const UsersContainer = () => {
  const { data, error, isLoading } = useUsersData();
  return <UserList data={data} error={error} isLoading={isLoading} />;
};
export default UsersContainer;

```

## 🧠 What is `AbortController`?

- A **built-in JavaScript API** that allows you to **abort** (cancel) web requests like `fetch()`.
- When you pass an `AbortSignal` to a fetch call, you can later **cancel** that request by calling `.abort()` on the controller.

| Feature | Details |
| --- | --- |
| `AbortController` | Native JavaScript API to cancel `fetch()` |
| Is it a React hook? | ❌ No — but used **inside hooks** like `useEffect` |
| Why use it? | Prevents memory leaks and unwanted state updates after unmount |
| Where is `.abort()` called? | Inside the `return () => {}` cleanup of `useEffect` |

## ==⇒>>Compound component

1.ekta tsx thake chaile duita compo(func) export korte pari

[2.dot](http://2.dot) notation diye khub easily access kora jay.

```tsx
import UsersContainer from "./components/UsersContainer";
import Select from "./components/Select";
function App() {
  const { dark, setDark } = useContext(ThemeContext) as TThemeContext;
  console.log(dark);
  return (
    <div
      className={`h-screen w-full flex justify-center items-center ${
        dark ? "bg-black" : "bg-wite"
      }`}
    >
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

```

```tsx
const Select = ({ children }) => {
  return <select>{children}</select>;
};

const SelectOption = ({ value, children }) => {
  return <option value={value}>{children}</option>;
};

Select.SelectOption = SelectOption;
export default Select;

```

```tsx
import { createContext, useContext, useState } from "react";

const SelectContext = createContext(null);

const Select = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState("");
  return (
    <SelectContext.Provider value={{ selectedOption, setSelectedOption }}>
      <select onChange={(e) => setSelectedOption(e.target.value)}>
        {children}
      </select>
      ;
    </SelectContext.Provider>
  );
};

const SelectOption = ({ value, children }) => {
  const { selectedOption } = useContext(SelectContext);
  console.log(selectedOption);
  const isActive = selectedOption === value;
  return (
    <option
      className={`${isActive ? "bg-purple-300" : "bg-white"}`}
      value={value}
    >
      {children}
    </option>
  );
};

Select.SelectOption = SelectOption;
export default Select;

```

## ===⇒>>AntiPattern to avoid=====⇒>>

⇒ekadik props pathano antipattern er modde pode.

## ===⇒>>React file system/Architecture ====⇒>>>

⇒Page/Route

⇒components→UI,→Layout

⇒Hooks

⇒Context

⇒Types

⇒Utils

⇒Redux
