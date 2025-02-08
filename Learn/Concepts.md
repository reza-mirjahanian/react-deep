# React Concepts Breakdown

## **Components**  
- **Building blocks** of React apps (e.g., buttons, inputs, pages).  
- JavaScript functions returning **JSX** (not HTML).  
- **Cannot return multiple elements** without a parent element or **React Fragment** (empty wrapper).  

---

## **JSX**  
- **JavaScript in Disguise** (syntax extension).  
- **Optional** but preferred over `createElement` for readability.  
- **Attributes** use **camelCase** (e.g., `className` instead of `class`).  
- **Dynamic values** inserted via **curly braces** `{}` (strings, numbers, attributes, styles).  

---

## **Props**  
- **Custom attributes** to pass data between components.  
- Accessed via **parameters** in the component function.  
- **Children Prop**: Pass components between opening/closing tags (e.g., layout components).  
- **Key Prop**: Unique identifier for list items (required when using `map`).  

---

## **Rendering Process**  
1. **State Change** triggers **Virtual DOM** update.  
2. **Diffing**: Compares current and previous Virtual DOM.  
3. **Reconciliation**: Updates **real DOM** with detected changes.  

---

## **State Management**  
- **State**: Snapshot of app data at a given time.  
- Managed via **hooks** (e.g., `useState`, `useReducer`).  
- **Controlled Components**: Input values tied to state (predictable behavior).  

---

## **Hooks**  
- **State Hooks**: `useState`, `useReducer` (manage state).  
- **Context Hooks**: `useContext` (access shared data).  
- **Ref Hooks**: `useRef` (reference DOM elements).  
- **Effect Hooks**: `useEffect` (connect to external systems).  
- **Performance Hooks**: `useMemo`, `useCallback` (optimize renders).  

---

## **Purity**  
- **Pure Components**: Same input → same output (no side effects).  
- Avoid modifying external variables during rendering.  

---

## **Strict Mode**  
- **Development tool** to detect mistakes (e.g., impure components).  
- Wraps the app component for real-time feedback.  

---

## **Effects & Refs**  
- **Effects**: Code interacting with external systems (e.g., APIs, DOM).  
  - Run via `useEffect` or event handlers.  
- **Refs**: Direct DOM manipulation (e.g., focus inputs) using `useRef`.  

---

## **Context**  
- **Bypass prop drilling** by sharing data across components.  
- Steps:  
  1. Create context in a parent.  
  2. Wrap parent in a **Context Provider**.  
  3. Access data via `useContext` in child components.  

---

## **Portals**  
- Render components **outside parent DOM hierarchy** (e.g., modals, tooltips).  
- Use `createPortal` to specify target HTML element.  

---

## **Suspense**  
- **Display fallback UI** (e.g., loading spinner) while data/component loads.  
- Supports **lazy loading** (load components on demand).  

---

## **Error Boundaries**  
- **Catch app-breaking errors** during rendering.  
- Display fallback UI instead of crashing the app.