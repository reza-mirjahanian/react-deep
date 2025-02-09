
**useActionState Hook Reference**

---

### **Concept & Purpose**

- **Purpose:**  
  A custom hook designed to manage the state of asynchronous actions, encapsulating the common states such as _loading_, _success_, and _error_.
  
- **Use Case:**  
  Ideal for handling API calls, form submissions, or any side-effect that involves asynchronous operations while keeping UI state in sync.

---

### **API Signature**

```javascript
const [state, executeAction] = useActionState(actionFunction, initialState?);
```

- **Parameters:**
  - **`actionFunction`** (Function):  
    An asynchronous function (typically returning a Promise) that encapsulates the action to perform.
  - **`initialState`** (Optional Object):  
    An object to initialize the hook’s state. Defaults typically include:
    - `isLoading`: `false`
    - `data`: `null`
    - `error`: `null`

- **Return Value:**  
  An array (or object) containing:
  - **`state`** (Object):  
    Contains the current state with properties such as:
    - **`isLoading`** (Boolean): Indicates if the action is in progress.
    - **`data`** (Any): Holds the successful result.
    - **`error`** (Any): Captures error information if the action fails.
  - **`executeAction`** (Function):  
    A function to trigger the asynchronous action. It typically returns a Promise.

---

### **Basic Implementation Example**

```javascript
import { useState, useCallback } from 'react';

function useActionState(actionFunction, initialState = {}) {
  const [state, setState] = useState({
    isLoading: false,
    data: null,
    error: null,
    ...initialState,
  });

  const executeAction = useCallback(async (...args) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      const result = await actionFunction(...args);
      setState({ isLoading: false, data: result, error: null });
      return result;
    } catch (error) {
      setState({ isLoading: false, data: null, error });
      throw error;
    }
  }, [actionFunction]);

  return [state, executeAction];
}
```

---

### **Common Usage Patterns**

- **Triggering an API Call:**

  ```javascript
  // Example async action
  async function fetchUserData(userId) {
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  // Usage in a component
  function UserProfile({ userId }) {
    const [state, fetchUser] = useActionState(fetchUserData);

    const handleFetch = () => {
      fetchUser(userId);
    };

    return (
      <div>
        {state.isLoading && <p>Loading...</p>}
        {state.error && <p>Error: {state.error.message}</p>}
        {state.data && <div>{/* Render user data */}</div>}
        <button onClick={handleFetch}>Load User</button>
      </div>
    );
  }
  ```

- **Handling Form Submissions:**

  ```javascript
  async function submitForm(data) {
    // perform submission logic
    const response = await fetch('/api/submit', { method: 'POST', body: JSON.stringify(data) });
    if (!response.ok) {
      throw new Error('Submission failed');
    }
    return response.json();
  }

  function ContactForm() {
    const [formState, submitContactForm] = useActionState(submitForm);

    const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      try {
        await submitContactForm(Object.fromEntries(formData.entries()));
        // Handle success (e.g., show a success message)
      } catch (error) {
        // Error is already captured in formState.error
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        {/* form fields */}
        <button type="submit" disabled={formState.isLoading}>Submit</button>
        {formState.error && <div>Error: {formState.error.message}</div>}
      </form>
    );
  }
  ```

---

### **State Transition Table**

| **Action**          | **State Before**         | **State During**                     | **State After (Success)**                | **State After (Failure)**              |
|---------------------|--------------------------|--------------------------------------|------------------------------------------|----------------------------------------|
| **Initial**         | `isLoading: false`       | N/A                                  | N/A                                      | N/A                                    |
| **Trigger Action**  | `isLoading: false`       | `isLoading: true`, `error: null`      | `isLoading: false`, `data: result`       | `isLoading: false`, `error: error`      |

---

### **Tips & Tricks**

- **Memoization with `useCallback`:**  
  Wrap the `executeAction` function in `useCallback` to prevent unnecessary re-renders or re-creations of the function when dependencies haven’t changed.

- **Extending Initial State:**  
  Merge any additional state properties you may need using the `initialState` parameter.  
  _Example:_
  ```javascript
  const [state, executeAction] = useActionState(fetchData, { extraInfo: {} });
  ```

- **Error Propagation:**  
  Ensure that errors are re-thrown after setting state so that calling components can optionally handle them with `try/catch`.

- **Optimistic Updates:**  
  For actions that modify data, consider updating the state optimistically before the action completes, then rolling back if the action fails.

- **Cancellation & Cleanup:**  
  When dealing with component unmounting during a pending action, implement a cancellation mechanism (e.g., a mounted flag) to prevent state updates on unmounted components.

- **Integration with Other Hooks:**  
  Combine with `useReducer` for more complex state logic, or with state management libraries if the action state needs to be global.

- **Testing Asynchronous Behavior:**  
  When unit testing, mock the asynchronous action function to simulate different outcomes (success, error) and assert the state transitions.

---

### **Advanced Patterns**

- **Using `useReducer` Instead of `useState`:**

  ```javascript
  function actionStateReducer(state, action) {
    switch (action.type) {
      case 'REQUEST':
        return { ...state, isLoading: true, error: null };
      case 'SUCCESS':
        return { isLoading: false, data: action.payload, error: null };
      case 'FAILURE':
        return { isLoading: false, data: null, error: action.payload };
      default:
        return state;
    }
  }

  function useActionState(actionFunction, initialState = {}) {
    const [state, dispatch] = useReducer(actionStateReducer, {
      isLoading: false,
      data: null,
      error: null,
      ...initialState,
    });

    const executeAction = useCallback(async (...args) => {
      dispatch({ type: 'REQUEST' });
      try {
        const result = await actionFunction(...args);
        dispatch({ type: 'SUCCESS', payload: result });
        return result;
      } catch (error) {
        dispatch({ type: 'FAILURE', payload: error });
        throw error;
      }
    }, [actionFunction]);

    return [state, executeAction];
  }
  ```

- **Debouncing or Throttling Actions:**  
  Integrate with libraries like [lodash.debounce](https://www.npmjs.com/package/lodash.debounce) to control rapid-fire invocations of the action.

- **Chaining Actions:**  
  In scenarios where one asynchronous action depends on the result of another, chain them within the `executeAction` or handle them sequentially in the component logic.

---

### **Common Pitfalls & Best Practices**

- **Stale State/Closure Issues:**  
  - Ensure that the `actionFunction` and dependencies are correctly managed in `useCallback` or `useEffect` to avoid using stale values.
  
- **Error Handling:**  
  - Always re-throw caught errors if further error handling is required outside the hook.
  
- **Component Unmounts:**  
  - Guard against setting state on unmounted components, especially in long-running asynchronous actions.
  
- **Avoid Over-Abstraction:**  
  - While the hook abstracts common patterns, tailor it to your specific needs. Over-generalizing can lead to complexities in debugging.

- **Consistent Naming Conventions:**  
  - Maintain consistency in naming state properties (e.g., `isLoading`, `data`, `error`) across your codebase for clarity.

---

### **Summary Table of Key Properties**

| **Property**    | **Type**  | **Description**                                |
|-----------------|-----------|------------------------------------------------|
| `isLoading`     | Boolean   | Indicates if the action is currently running.  |
| `data`          | Any       | Holds the result of a successful action.       |
| `error`         | Any       | Captures error details if the action fails.    |
| `executeAction` | Function  | Function to trigger the asynchronous action.   |

---

### **Code Example Recap**

```javascript
// Define your asynchronous action
async function performAction(params) {
  // Simulate an API call
  const response = await fetch('/api/action', { method: 'POST', body: JSON.stringify(params) });
  if (!response.ok) {
    throw new Error('Action failed');
  }
  return response.json();
}

// Utilize the useActionState hook in a component
function ActionButton() {
  const [state, executeAction] = useActionState(performAction);

  const handleClick = async () => {
    try {
      const result = await executeAction({ key: 'value' });
      console.log('Action successful:', result);
    } catch (error) {
      console.error('Action error:', error);
    }
  };

  return (
    <button onClick={handleClick} disabled={state.isLoading}>
      {state.isLoading ? 'Processing...' : 'Perform Action'}
    </button>
  );
}
```


# **`useActionState` (React 19+)**  

## **Core Features**  
- Manages **state** for async actions (e.g., form submissions, API calls).  
- Tracks **pending state**, **errors**, and **results**.  
- Designed for **optimistic updates** and seamless error handling.  

---

## **Basic Syntax**  
```jsx
const [state, action, pending] = useActionState(actionFn, initialState);
```  
- **`actionFn`**: Async function handling the action (receives `previousState` and input data).  
- **`initialState`**: Initial state object (e.g., `{ data: null, error: null }`).  
- **Returns**:  
  - **`state`**: Current state (includes `error`, `data`, etc.).  
  - **`action`**: Function to trigger the action (passes data to `actionFn`).  
  - **`pending`**: Boolean indicating if the action is in progress.  

---

## **Key Use Cases**  

### **1. Form Submissions**  
```jsx
const [state, submitForm, isPending] = useActionState(async (prevState, formData) => {
  try {
    const res = await fetch("/api/submit", { method: "POST", body: formData });
    return { data: await res.json(), error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}, { data: null, error: null });

return (
  <form action={submitForm}>
    <input name="email" type="email" />
    <button disabled={isPending}>{isPending ? "Submitting..." : "Submit"}</button>
    {state.error && <p>Error: {state.error}</p>}
  </form>
);
```  
- **Disable buttons** during submission using `pending`.  
- **Display errors** directly from `state`.  

---

### **2. Optimistic Updates**  
```jsx
const [state, addComment, isPending] = useActionState(async (prevState, newComment) => {
  // Immediately update UI optimistically
  const optimisticComments = [...prevState.comments, { ...newComment, status: "pending" }];
  
  try {
    await saveCommentToServer(newComment); // Simulate API call
    return { comments: optimisticComments.map(c => ({ ...c, status: "confirmed" })) };
  } catch (err) {
    // Revert on error
    return { comments: prevState.comments };
  }
}, { comments: [] });

return (
  <div>
    {state.comments.map(comment => (
      <div key={comment.id} className={comment.status}>{comment.text}</div>
    ))}
    <button onClick={() => addComment({ id: Date.now(), text: "New comment" })}>
      Add Comment
    </button>
  </div>
);
```  
- **Update UI before confirmation** and revert on failure.  

---

## **Advanced Tips**  

### **Error Handling**  
- **Catch errors in `actionFn`** and return them in state:  
  ```jsx
  async (prevState, data) => {
    try {
      // ... action
    } catch (err) {
      return { ...prevState, error: err.message };
    }
  }
  ```  

### **State Structure**  
- **Include all relevant fields**:  
  ```js
  initialState = { data: null, error: null, metadata: {} }
  ```  

### **Combining with `useOptimistic`**  
- Use `useOptimistic` for **immediate UI feedback** alongside `useActionState`:  
  ```jsx
  const [optimisticState, addOptimistic] = useOptimistic(
    state.comments,
    (prev, newComment) => [...prev, { ...newComment, status: "pending" }]
  );
  ```  

---

## **Common Pitfalls & Fixes**  

| **Pitfall** | **Solution** |  
|-------------|--------------|  
| **Unhandled errors** crashing UI | Wrap async logic in `try/catch` and update `state.error`. |  
| **Stale state** after submission | Return a **new state object** in `actionFn` (don’t mutate `prevState`). |  
| **Duplicate submissions** | Disable buttons using `pending` flag. |  

---

## **Performance Optimization**  
- **Memoize action functions** if passed to child components:  
  ```jsx
  const memoizedAction = useCallback(() => action(data), [action, data]);
  ```  

---

## **Comparison with Other Hooks**  

| **Hook** | **Use Case** |  
|----------|--------------|  
| `useState` | Simple, non-async state. |  
| `useTransition` | Non-urgent UI updates (e.g., filtering). |  
| `useActionState` | Async actions with state/error/pending tracking. |  

---

## **Best Practices**  
1. **Separate concerns**: Keep `actionFn` focused on data handling (not UI logic).  
2. **Reset state** after success:  
   ```jsx
   if (state.success) return <SuccessScreen />; // Redirect or reset state
   ```  
3. **Test edge cases**: Slow networks, server errors, and race conditions.


----------------

