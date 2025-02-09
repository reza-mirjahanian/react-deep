# React Hooks   

## **State Management Hooks**  
### **`useState`**  
- **Purpose**: Manages **simple, component-specific state** (e.g., form inputs, visibility toggles, counters).  
- **Usage**:  
  - Returns a **state variable** and **updater function**.  
  - Accepts **any initial value** (strings, numbers, objects).  
- **Frequency**: **Most common** hook.  

### **`useReducer`**  
- **Purpose**: Handles **complex state logic** (e.g., forms with multiple inputs, game logic).  
- **Usage**:  
  - Uses a **reducer function** to manage state updates.  
  - Returns **state** and **`dispatch`** function to trigger actions.  
- **Frequency**: **Rare**; used for deeply interconnected state.  

### **`useSyncExternalStore`**  
- **Purpose**: Integrates **non-React state stores** into React components.  
- **Usage**: Primarily for building custom state libraries.  
- **Frequency**: **Almost never** (niche use cases).  

---

## **Effect Hooks**  
### **`useEffect`**  
- **Purpose**: Synchronizes with **external systems** (e.g., browser APIs, subscriptions).  
- **Usage**:  
  - Runs **after render**; optional **dependencies array** controls execution.  
  - Avoid for data fetching (use frameworks like **React Query** instead).  
- **Frequency**: **Less common** than expected; prioritize event handlers.  

### **`useLayoutEffect`**  
- **Purpose**: Runs **synchronously before browser paint** (e.g., measuring DOM elements).  
- **Usage**: For tasks requiring **immediate UI updates** (e.g., tooltip positioning).  
- **Frequency**: **Rare**; replaces `useEffect` in specific layout scenarios.  

### **`useInsertionEffect`**  
- **Purpose**: **Inject dynamic styles** (e.g., CSS-in-JS libraries).  
- **Usage**: Runs **before** `useLayoutEffect` and `useEffect`.  
- **Frequency**: **Almost never** (for library authors).  

---

## **Ref Hooks**  
### **`useRef`**  
- **Purpose**: Stores **mutable values** without triggering re-renders (e.g., DOM elements, timer IDs).  
- **Usage**: Access via **`current`** property.  
- **Frequency**: **Common** for DOM manipulation or preserving values.  

### **`useImperativeHandle`**  
- **Purpose**: Expose **child component methods** to parents (e.g., focusing an input).  
- **Usage**: Paired with **`forwardRef`**.  
- **Frequency**: **Rare**; needed only for imperative parent-child interactions.  

---

## **Performance Hooks**  
### **`useMemo`**  
- **Purpose**: **Memoizes expensive computations** (e.g., sorting large arrays).  
- **Usage**: Recalculates only when **dependencies change**.  
- **Frequency**: **Occasional**; optimize heavy calculations.  

### **`useCallback`**  
- **Purpose**: **Memoizes callback functions** to prevent unnecessary re-renders.  
- **Usage**: Pass stable callbacks to **optimized child components**.  
- **Frequency**: **Occasional**; paired with `React.memo`.  

---

## **Context Hook**  
### **`useContext`**  
- **Purpose**: Reads **shared data** from a React Context Provider.  
- **Usage**: Access context values in nested components.  
- **Frequency**: **Common** for global state (e.g., themes, auth).  

---

## **Transition Hooks**  
### **`useTransition`**  
- **Purpose**: Marks state updates as **non-urgent** (e.g., filtering large lists).  
- **Usage**:  
  - Wraps state updates with **`startTransition`**.  
  - Shows **pending state** with `isPending` flag.  
- **Frequency**: **Rare**; improves responsiveness for heavy UI tasks.  

### **`useDeferredValue`**  
- **Purpose**: **Defers rendering** for slow updates (e.g., search inputs).  
- **Usage**: Automatically schedules deferred updates.  
- **Frequency**: **Rare**; alternative to `useTransition`.  

---

## **Random Hooks**  
### **`useDebugValue`**  
- **Purpose**: Labels **custom hooks** in React DevTools.  
- **Usage**: Debugging only.  
- **Frequency**: **Almost never** (for library developers).  

### **`useId`**  
- **Purpose**: Generates **unique IDs** (e.g., for form labels/inputs).  
- **Usage**: Avoid for list keys; ensures ID consistency.  
- **Frequency**: **Occasional** for reusable form components.  

---
