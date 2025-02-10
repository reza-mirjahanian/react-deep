#### Caveats 

-   `useContext()` call in a component is not affected by providers returned from the *same* component. The corresponding `<Context.Provider>` **needs to be *above*** the component doing the `useContext()` call.
-   React **automatically re-renders** all the children that use a particular context starting from the provider that receives a different `value`. The previous and the next values are compared with the [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is) comparison. Skipping re-renders with [`memo`](https://react.dev/reference/react/memo) does not prevent the children receiving fresh context values.
-   If your build system produces duplicates modules in the output (which can happen with symlinks), this can break context. Passing something via context only works if `SomeContext` that you use to provide context and `SomeContext` that you use to read it are ***exactly* the same object**, as determined by a `===` comparison


--------------------

**useContext in React.js**

---

### **1. Overview**

- **Purpose:**  
  - Access and subscribe to a React Context within a functional component.
  - Avoid prop drilling by providing a centralized state or value.

- **Basic Syntax:**  
  ```jsx
  const value = useContext(MyContext);
  ```

---

### **2. Creating and Providing Context**

- **Creating a Context:**  
  ```jsx
  import React from 'react';
  const MyContext = React.createContext(defaultValue);
  ```

- **Providing Context Value:**  
  - Wrap the component tree with the Provider.
  - **Example:**
    ```jsx
    function MyProvider({ children }) {
      const [state, setState] = useState(initialValue);
      
      // Memoize the context value to prevent unnecessary re-renders
      const contextValue = useMemo(() => ({ state, setState }), [state]);
      
      return (
        <MyContext.Provider value={contextValue}>
          {children}
        </MyContext.Provider>
      );
    }
    ```

---

### **3. Consuming Context with useContext**

- **Basic Usage in a Component:**  
  ```jsx
  import { useContext } from 'react';

  function MyComponent() {
    const { state, setState } = useContext(MyContext);
    return <div>{state}</div>;
  }
  ```

- **Creating a Custom Hook for Context:**  
  - Encapsulate context logic and add error handling.
  - **Example:**
    ```jsx
    function useMyContext() {
      const context = useContext(MyContext);
      if (!context) {
        throw new Error("useMyContext must be used within a MyProvider");
      }
      return context;
    }
    ```

---

### **4. Performance Optimization**

- **Memoization:**  
  - **useMemo:**  
    - Use when constructing the value for the Provider.
    - Prevents consumers from re-rendering unnecessarily.
    - **Example:**
      ```jsx
      const contextValue = useMemo(() => ({ state, setState }), [state]);
      ```

- **Stable References:**  
  - Ensure that objects and functions passed as context values are not re-created on every render.
  - Use **useCallback** for functions if necessary.

- **Context Update Considerations:**  
  - Every consumer re-renders when the context value changes.
  - **Tip:** Split context into multiple contexts for unrelated pieces of state.

---

### **5. Best Practices**

- **Separation of Concerns:**
  - Use separate contexts for different domains (e.g., theme, auth, settings).
  
- **Error Handling:**
  - Provide default values or throw errors if the context is missing.
  - Example in custom hook (see above).

- **Modularity:**
  - Keep context creation, provider, and custom hooks in dedicated modules or files.

- **Avoid Overuse:**
  - Do not use context for frequently updating state (e.g., animations, high-frequency updates) due to performance impacts.

- **Testing:**
  - Mock context providers in unit tests to simulate context values.

---

### **6. Common Pitfalls**

- **Using useContext Outside Provider:**
  - Returns the default value if the component is not wrapped within the corresponding Provider.
  
- **Inline Object/Function as Value:**
  - **Issue:** Inline definitions cause a new reference on each render.
  - **Solution:** Wrap in **useMemo** or **useCallback**.

- **Nested Providers Overriding Context:**
  - Be cautious when nesting providers; ensure you’re accessing the intended context instance.

---

### **7. Advanced Patterns**

- **Combining with useReducer:**
  - Create a centralized state management solution.
  - **Example:**
    ```jsx
    const MyContext = React.createContext();

    function myReducer(state, action) {
      switch (action.type) {
        case 'update': return { ...state, ...action.payload };
        default: return state;
      }
    }

    function MyProvider({ children }) {
      const [state, dispatch] = useReducer(myReducer, initialState);
      const value = useMemo(() => ({ state, dispatch }), [state]);
      return (
        <MyContext.Provider value={value}>
          {children}
        </MyContext.Provider>
      );
    }
    ```

- **Handling Multiple Contexts:**
  - Consume multiple contexts within one component by calling useContext for each.
  - **Example:**
    ```jsx
    const theme = useContext(ThemeContext);
    const user = useContext(UserContext);
    ```

- **Lazy Loading Context Providers:**
  - Defer loading heavy context logic until needed.
  - Wrap provider logic in a dynamic import if the context is not required immediately.

---

### **8. Comparison: useContext vs. Context.Consumer**

| Aspect                   | useContext Hook                     | Context.Consumer               |
|--------------------------|-------------------------------------|--------------------------------|
| **Syntax**               | Cleaner and more concise            | Render prop pattern            |
| **Readability**          | Easier in functional components     | Can become verbose             |
| **Error Handling**       | Custom hooks can encapsulate errors | Manual error handling required |
| **Flexibility**          | Works only with functional components | Works with class and functional components |

---

### **9. Tips & Tricks Summary**

- **Memoize Provider Value:**  
  - Always memoize objects/functions passed to the provider.

- **Create Custom Hooks:**  
  - Wrap useContext in custom hooks to centralize logic and error handling.

- **Separate Contexts:**  
  - Use multiple contexts for distinct parts of the app to reduce unnecessary updates.

- **Combine with Reducers:**  
  - Use useReducer with useContext for scalable state management.

- **Test Providers Separately:**  
  - Isolate context testing by wrapping components in test providers.

- **Debugging:**  
  - Ensure components are correctly wrapped with the Provider.
  - Verify that context values are not inadvertently re-created.

---

