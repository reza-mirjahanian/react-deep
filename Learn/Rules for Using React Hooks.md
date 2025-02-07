
---


#### **1. Only Call Hooks at the Top Level**
- **Rule:** Do not call Hooks inside loops, conditions, or nested functions. Always call them at the top level of your functional component or custom Hook.
- **Why:** This ensures that Hooks are called in the same order every time the component renders, maintaining consistency in state and behavior.

**Example (Correct):**
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // ✅ Correct: Called at the top level

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Example (Incorrect):**
```jsx
function Counter() {
  if (true) {
    const [count, setCount] = useState(0); // ❌ Incorrect: Inside a condition
  }

  return <div />;
}
```

---

#### **2. Only Call Hooks from React Functional Components or Custom Hooks**
- **Rule:** Do not call Hooks from regular JavaScript functions or class components. Hooks can only be used within functional components or other custom Hooks.
- **Why:** Hooks rely on React's internal mechanism to track state and side effects, which is only available in functional components or custom Hooks.

**Example (Correct):**
```jsx
import React, { useState } from 'react';

function MyComponent() {
  const [name, setName] = useState('John'); // ✅ Correct: Used in a functional component
  return <p>Hello, {name}!</p>;
}

function useCustomHook() {
  const [value, setValue] = useState(0); // ✅ Correct: Used in a custom Hook
  return { value, setValue };
}
```

**Example (Incorrect):**
```jsx
function regularFunction() {
  const [state, setState] = useState(0); // ❌ Incorrect: Used in a regular function
}
```

---

#### **3. Use Dependency Arrays in `useEffect`**
- **Rule:** When using `useEffect`, specify a dependency array to control when the effect runs. If no dependencies are provided, the effect will run after every render.
- **Why:** This prevents unnecessary re-execution of side effects and ensures performance optimization.

**Example (Correct):**
```jsx
import React, { useState, useEffect } from 'react';

function Component() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`; // Runs only when count changes
  }, [count]); // ✅ Correct: Dependency array specifies when to run

  return (
    <button onClick={() => setCount(count + 1)}>
      Click me
    </button>
  );
}
```

**Example (Incorrect):**
```jsx
useEffect(() => {
  document.title = `You clicked ${count} times`; // Runs after every render
}); // ❌ Incorrect: No dependency array means it runs unnecessarily
```

---

#### **4. Avoid Mutating State Directly**
- **Rule:** Never mutate state directly. Always use the setter function provided by `useState` or `useReducer`.
- **Why:** React relies on immutability to detect changes and trigger re-renders. Mutating state directly bypasses this mechanism.

**Example (Correct):**
```jsx
const [items, setItems] = useState([]);

function addItem() {
  setItems([...items, 'New Item']); // ✅ Correct: Creates a new array
}
```

**Example (Incorrect):**
```jsx
function addItem() {
  items.push('New Item'); // ❌ Incorrect: Directly mutates the state
}
```

---

#### **5. Use `useCallback` and `useMemo` for Optimization**
- **Rule:** Use `useCallback` to memoize functions and `useMemo` to memoize values to prevent unnecessary re-renders or recomputations.
- **Why:** This improves performance by avoiding redundant calculations or prop updates.

**Example (Correct):**
```jsx
import React, { useMemo, useCallback } from 'react';

function ParentComponent() {
  const expensiveCalculation = useMemo(() => {
    return computeSomethingHeavy(); // Memoized value
  }, []);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Memoized function

  return <ChildComponent onClick={handleClick} value={expensiveCalculation} />;
}
```

---

#### **6. Follow Naming Conventions for Custom Hooks**
- **Rule:** Prefix custom Hooks with `use` to indicate they are Hooks.
- **Why:** This makes it clear that the function is a Hook and follows React's conventions.

**Example (Correct):**
```jsx
function useCustomHook() {
  const [value, setValue] = useState(0);
  return { value, setValue };
}

function Component() {
  const { value, setValue } = useCustomHook(); // ✅ Correct: Proper naming
  return <p>{value}</p>;
}
```

**Example (Incorrect):**
```jsx
function customHook() {
  const [value, setValue] = useState(0);
  return { value, setValue };
}

function Component() {
  const { value, setValue } = customHook(); // ❌ Incorrect: Missing 'use' prefix
}
```

---

#### **7. Avoid Infinite Loops in `useEffect`**
- **Rule:** Ensure that `useEffect` does not cause infinite loops by properly managing dependencies.
- **Why:** If a dependency causes the effect to update the same dependency, it can result in an infinite loop.

**Example (Correct):**
```jsx
useEffect(() => {
  fetchData();
}, [dependency]); // ✅ Correct: Dependency array prevents infinite loops
```

**Example (Incorrect):**
```jsx
useEffect(() => {
  setCount(count + 1); // ❌ Incorrect: Causes infinite loop
}, [count]);
```

---

#### **8. Clean Up Side Effects in `useEffect`**
- **Rule:** If a `useEffect` creates a subscription, timer, or event listener, clean it up to avoid memory leaks.
- **Why:** Leaving side effects uncleaned can lead to resource wastage or unexpected behavior.

**Example (Correct):**
```jsx
useEffect(() => {
  const subscription = someAPI.subscribeToData();

  return () => {
    subscription.unsubscribe(); // ✅ Correct: Cleanup function
  };
}, []);
```

---
Here are the **key rules for using React Hooks**, as outlined in React's official documentation:

---

### **1. Only Call Hooks at the Top Level**  
- **Rule**: Never call hooks inside loops, conditions, or nested functions.  
- **Why**: React relies on the order of hooks to preserve state between re-renders. Changing the order (e.g., via conditionals) leads to bugs.  

**✅ Correct**:  
```javascript
function MyComponent() {
  const [count, setCount] = useState(0); // Top-level
  useEffect(() => { /* ... */ }); // Top-level
  // ...
}
```

**❌ Incorrect**:  
```javascript
function MyComponent() {
  if (condition) {
    useEffect(() => { /* ... */ }); // Inside a condition
  }
}
```

---

### **2. Only Call Hooks from React Functions**  
- **Rule**: Call hooks **only** in:  
  - Functional components.  
  - Custom hooks (functions starting with `use`).  
- **Never** use hooks in regular JavaScript functions, class components, or event handlers.  

**✅ Correct**:  
```javascript
function MyComponent() {
  const [data, setData] = useState(null); // Functional component
}

function useCustomHook() { // Custom hook
  const [value, setValue] = useState(0);
}
```

**❌ Incorrect**:  
```javascript
class MyClassComponent extends React.Component {
  render() {
    const [count] = useState(0); // Class component
  }
}

function regularFunction() {
  useEffect(() => { /* ... */ }); // Non-React function
}
```

---

### **3. Custom Hooks Must Follow Naming Conventions**  
- **Rule**: Name custom hooks starting with `use` (e.g., `useFetch`, `useLocalStorage`).  
- **Why**: This signals to React (and developers) that the function follows hook rules.  

**✅ Correct**:  
```javascript
function useToggle(initialState) {
  const [state, setState] = useState(initialState);
  const toggle = () => setState(!state);
  return [state, toggle];
}
```

---

### **4. Preserve Hook Order Between Renders**  
- **Rule**: The number and order of hooks **must remain consistent** across re-renders.  

**✅ Correct**:  
```javascript
function MyComponent() {
  const [name, setName] = useState(""); // Always first
  const [age, setAge] = useState(0); // Always second
}
```

**❌ Incorrect**:  
```javascript
function MyComponent() {
  if (condition) {
    const [name, setName] = useState(""); // Conditional hook
  }
  const [age, setAge] = useState(0); // Order changes if condition is false
}
```

---

### **5. Use the ESLint Plugin**  
- **Rule**: Enable the [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) package to enforce these rules automatically.  

**Installation**:  
```bash
npm install eslint-plugin-react-hooks --save-dev
```

**ESLint Config**:  
```json
{
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

---

### **Key Takeaways**  
1. **Top-level only**: No hooks in loops/conditions.  
2. **React functions only**: Functional components or custom hooks.  
3. **Order matters**: Keep hook order consistent.  
4. **Name custom hooks with `use`**.  
5. **Use the ESLint plugin** to enforce rules.  

Violating these rules leads to cryptic errors like:  
- `React Hook "useState" is called conditionally`.  
- `Hooks can only be called inside the body of a function component`.  

