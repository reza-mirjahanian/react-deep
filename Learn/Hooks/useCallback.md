### useCallback: Tips, Tricks, and Complete Reference

-   [Usage](https://react.dev/reference/react/useCallback#usage)
    -   [Skipping re-rendering of components](https://react.dev/reference/react/useCallback#skipping-re-rendering-of-components)
    -   [Updating state from a memoized callback](https://react.dev/reference/react/useCallback#updating-state-from-a-memoized-callback)
    -   [Preventing an Effect from firing too often](https://react.dev/reference/react/useCallback#preventing-an-effect-from-firing-too-often)
    -   [Optimizing a custom Hook](https://react.dev/reference/react/useCallback#optimizing-a-custom-hook)
-   [Troubleshooting](https://react.dev/reference/react/useCallback#troubleshooting)
    -   [Every time my component renders, `useCallback` returns a different function](https://react.dev/reference/react/useCallback#every-time-my-component-renders-usecallback-returns-a-different-function)
    -   [I need to call `useCallback` for each list item in a loop, but it's not allowed](https://react.dev/reference/react/useCallback#i-need-to-call-usememo-for-each-list-item-in-a-loop-but-its-not-allowed)



In JavaScript, a function () {} or () => {} always creates a different function, similar to how the {} object literal always creates a new object. Normally, this wouldn’t be a problem, but it means that ShippingForm props will never be the same, and your memo optimization won’t work. This is where useCallback comes in handy

**Purpose:** `useCallback` is a React hook that memoizes a function.  It returns a memoized version of the callback function that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders.

**Syntax:**

```javascript
const memoizedCallback = useCallback(
  () => {
    // Function logic here
  },
  [dependency1, dependency2, ...]
);
```

**Parameters:**

*   **`callback`**: The function you want to memoize.
*   **`dependencies`**: An array of values that the callback depends on.  If any of these values change between renders, the callback will be updated.

**Return Value:**

*   A memoized version of the `callback` function. This function will have the same identity (i.e., `===` comparison will return `true`) as long as the dependencies remain the same.

**Core Concepts & Use Cases:**

*   **Preventing Unnecessary Renders:** The primary use case.  If a child component re-renders because a callback prop changes, even if the callback's logic is the same, `useCallback` can prevent this.

    ```javascript
    // Parent Component
    import React, { useState, useCallback } from 'react';
    import ChildComponent from './ChildComponent';

    function ParentComponent() {
      const [count, setCount] = useState(0);

      // Without useCallback: A new function is created on every render
      const handleClickWithoutCallback = () => {
        console.log('Clicked without useCallback');
      };

      // With useCallback: The same function instance is used as long as 'count' doesn't change
      const handleClickWithCallback = useCallback(() => {        console.log('Clicked with useCallback. Count:', count);
      }, [count]); // Dependency array:  Re-create the callback only when 'count' changes

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={() => setCount(count + 1)}>Increment</button>
          <ChildComponent onClick={handleClickWithoutCallback} label="Without useCallback" />
          <ChildComponent onClick={handleClickWithCallback} label="With useCallback" />
        </div>
      );
    }

    export default ParentComponent;


    // Child Component (assumed to be memoized)
    import React from 'react';

    const ChildComponent = React.memo(({ onClick, label }) => {
      console.log(`ChildComponent "${label}" rendered`);
      return (
        <button onClick={onClick}>
          {label}
        </button>
      );
    });

    export default ChildComponent;
    ```

    In this example, `ChildComponent` is wrapped with `React.memo`. Without `useCallback`, `ChildComponent` will re-render every time `ParentComponent` re-renders, even if the `handleClickWithoutCallback` function's logic is the same. With `useCallback`, `ChildComponent` will only re-render when `count` changes, because the `handleClickWithCallback` function's identity only changes when `count` changes.

*   **Optimizing Custom Hooks:** When a custom hook returns a function, memoize it with `useCallback` to prevent unnecessary re-renders of components using the hook.

    ```javascript
    // Custom Hook
    import { useState, useCallback } from 'react';

    function useCounter() {
      const [count, setCount] = useState(0);

      const increment = useCallback(() => {
        setCount(c => c + 1);
      }, []); // No dependencies:  increment function never changes

      return { count, increment };
    }

    export default useCounter;


    // Component using the custom hook
    import React from 'react';
    import useCounter from './useCounter';

    const MyComponent = React.memo(() => {
      const { count, increment } = useCounter();
      console.log('MyComponent rendered');

      return (
        <div>
          <p>Count: {count}</p>
          <button onClick={increment}>Increment</button>
        </div>
      );
    });

    export default MyComponent;
    ```

    Here, `useCallback` ensures that the `increment` function returned by `useCounter` only changes if its dependencies change (in this case, it has no dependencies, so it never changes).  This prevents `MyComponent` from re-rendering unnecessarily.

*   **Passing Functions to `useEffect`:**  If a `useEffect` hook depends on a function that's defined within the component, memoize that function with `useCallback` to prevent the `useEffect` from running on every render.    ```javascript
    import React, { useState, useEffect, useCallback } from 'react';

    function MyComponent() {
      const [data, setData] = useState(null);
      const [query, setQuery] = useState('initial query');

      const fetchData = useCallback(async () => {
        console.log('Fetching data...');
        // Simulate fetching data from an API
        await new Promise(resolve => setTimeout(resolve, 500));
        setData(`Data for query: ${query}`);
      }, [query]); // fetchData only changes when 'query' changes

      useEffect(() => {
        fetchData(); // Call the memoized function
      }, [fetchData]); // useEffect only runs when fetchData changes

      return (
        <div>
          <p>Data: {data || 'Loading...'}</p>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
      );
    }

    export default MyComponent;
    ```

    Without `useCallback`, `fetchData` would be a new function on every render, causing `useEffect` to run on every render, potentially leading to infinite loops or performance issues.

**Common Mistakes & Pitfalls:**

*   **Omitting Dependencies:** Forgetting to include a dependency in the dependency array will result in the callback not being updated when that dependency changes. This can lead to stale closures and unexpected behavior.  React's ESLint plugin can help catch these errors.

    ```javascript
    // Incorrect: 'count' is used inside the callback but not in the dependency array
    const handleClick = useCallback(() => {
      console.log('Count:', count); // 'count' might be stale
    }, []);

    // Correct: 'count' is included in the dependency array
    const handleClick = useCallback(() => {
      console.log('Count:', count); // 'count' will always be the latest value
    }, [count]);
    ```

*   **Over-Using `useCallback`:**  Don't memoize every function.  `useCallback` has a cost: it requires React to track dependencies and perform comparisons.  Only use it when passing callbacks to optimized components or when the callback is a dependency of another hook (like `useEffect`).  Premature optimization can hurt performance.

*   **Inline Functions vs. `useCallback`:**  Sometimes, using an inline function directly in the JSX is simpler and more performant than using `useCallback`. This is especially true for simple functions that don't depend on any props or state.

    ```javascript
    // Sometimes this is simpler and more performant    <button onClick={() => console.log('Clicked')}>Click Me</button>

    // Than this (if the callback is very simple and has no dependencies)
    const handleClick = useCallback(() => console.log('Clicked'), []);
    <button onClick={handleClick}>Click Me</button>
    ```

*   **Mutable Values in Dependencies:** Be cautious when using mutable values (like objects or arrays) as dependencies.  If the *contents* of the object/array change but the object/array *reference* remains the same, `useCallback` won't update the callback.  Consider using immutable data structures or deriving a primitive value from the object/array to use as a dependency.

    ```javascript
    import React, { useState, useCallback } from 'react';

    function MyComponent() {
      const [items, setItems] = useState([{ id: 1, name: 'Item 1' }]);

      // Incorrect:  The callback won't update when the *contents* of 'items' change
      const handleClickIncorrect = useCallback(() => {
        console.log('Items:', items); // 'items' might be stale if its contents change
      }, [items]); // Only updates when the 'items' *reference* changes

      // Correct:  Use a derived primitive value as a dependency (e.g., items.length)
      const handleClickCorrect = useCallback(() => {
        console.log('Items:', items); // 'items' will be the latest value
      }, [items.length]); // Updates when the *length* of 'items' changes

      const addItem = () => {
        setItems([...items, { id: items.length + 1, name: `Item ${items.length + 1}` }]);
      };

      return (
        <div>
          <button onClick={handleClickIncorrect}>Click (Incorrect)</button>
          <button onClick={handleClickCorrect}>Click (Correct)</button>
          <button onClick={addItem}>Add Item</button>
        </div>
      );
    }

    export default MyComponent;
    ```

*   **`useCallback` vs. `useMemo`:** `useCallback` memoizes a *function*, while `useMemo` memoizes the *result* of a function call. Use `useCallback` when you need to preserve the identity of a function (e.g., for passing it as a prop to a memoized component). Use `useMemo` when you need to memoize a value that's expensive to compute.

**Best Practices:**

*   **Start Simple:**  Don't reach for `useCallback` prematurely. Profile your application to identify performance bottlenecks before adding memoization.
*   **Use React DevTools Profiler:**  Use the React DevTools profiler to measure the impact of `useCallback` on your application's performance.
*   **Linting:** Enable the `eslint-plugin-react-hooks` plugin in your ESLint configuration.  This plugin will help you catch common mistakes with hooks, such as missing dependencies.
*   **Immutability:**  Favor immutable data structures to make it easier to reason about dependencies and prevent unexpected behavior.
*   **Dependency Arrays:**  Carefully consider the dependencies for each `useCallback` hook.  Include all values that the callback depends on, and avoid including unnecessary values.
*   **Test:** Write unit tests to verify that your callbacks are behaving as expected.

**Example Table: When to Use `useCallback`**

| Scenario                                                                     | Recommended? | Justification                                                                                                                                                                                                                           |
| :--------------------------------------------------------------------------- | :----------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Passing a callback to a `React.memo` component.                            | Yes          | Prevents unnecessary re-renders of the child component.                                                                                                                                                                                 |
| Using a function as a dependency in `useEffect`.                              | Yes          | Prevents `useEffect` from running on every render.                                                                                                                                                                                     |
| Returning a function from a custom hook.                                     | Yes          | Prevents unnecessary re-renders of components using the hook.                                                                                                                                                                          |
| A simple callback that doesn't depend on any props or state.                | No           | Inline function is often simpler and more performant.                                                                                                                                                                                   |
| A callback that depends on a large number of props or state values.          | Consider     | Evaluate the performance impact.  If the callback is expensive, memoizing it might be beneficial.  Otherwise, the overhead of tracking dependencies might outweigh the benefits.                                                      |
| A callback used only within the component and not passed as a prop.          | No           | Generally not necessary unless the callback is very expensive to compute.                                                                                                                                                              |
| A callback that updates state based on the previous state (using updater form). | Yes          | Ensures that you're always working with the latest state value, even if the component has been re-rendered multiple times.  This is especially important when dealing with asynchronous updates or concurrent rendering. |

