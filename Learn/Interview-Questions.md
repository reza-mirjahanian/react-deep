
---

#### **Core React Concepts**  
1. **What is React.js?**  
   - **Answer**: A JavaScript library for building user interfaces, focusing on component-based architecture, declarative syntax, and efficient DOM updates via the virtual DOM.  

2. **Explain JSX.**  
   - **Answer**: JSX is a syntax extension for JavaScript that allows writing HTML-like code in React. It is transpiled to `React.createElement()` calls.  

3. **What are components?**  
   - **Answer**: Reusable UI building blocks. Two types:  
     - **Functional**: Stateless (pre-hooks) or stateful (with hooks).  
     - **Class**: Stateful, with lifecycle methods.  

4. **What is the virtual DOM?**  
   - **Answer**: A lightweight in-memory representation of the real DOM. React compares it with the real DOM (via "diffing") to optimize updates.  

5. **What are props and state?**  
   - **Answer**:  
     - **Props**: Immutable data passed from parent to child.  
     - **State**: Mutable data managed within a component (via `useState` or `this.state`).  

6. **What are React lifecycle methods?**  
   - **Answer**: Class component methods like `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` for managing side effects.  

7. **What are React Hooks?**  
   - **Answer**: Functions (e.g., `useState`, `useEffect`) that let functional components use state and lifecycle features.  

8. **Why are keys important in lists?**  
   - **Answer**: Keys help React identify which items have changed/added/removed, improving rendering performance.  

9. **What is a higher-order component (HOC)?**  
   - **Answer**: A function that takes a component and returns a new component with enhanced functionality (e.g., Redux `connect`).  

---

#### **Intermediate React Concepts**  
10. **Explain state management in React.**  
    - **Answer**:  
      - **Local State**: Managed within a component (e.g., `useState`).  
      - **Context API**: For prop drilling avoidance.  
      - **Redux**: Global state management with actions, reducers, and a store.  

11. **How does React Router work?**  
    - **Answer**: A library for declarative routing (e.g., `<Route>`, `<Link>`). Example:  
      ```jsx
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      ```  

12. **What are controlled vs. uncontrolled components?**  
    - **Answer**:  
      - **Controlled**: Form data handled by React state (e.g., `<input value={value} onChange={...}>`).  
      - **Uncontrolled**: Form data handled by the DOM (e.g., using `ref`).  

13. **How to optimize React performance?**  
    - **Answer**:  
      - Memoization: `React.memo`, `useMemo`, `useCallback`.  
      - Lazy loading: `React.lazy` + `Suspense`.  
      - Code splitting via Webpack.  

14. **What are error boundaries?**  
    - **Answer**: Class components that catch JavaScript errors in their child component tree using `static getDerivedStateFromError` and `componentDidCatch`.  

15. **Explain React refs.**  
    - **Answer**: Refs provide access to DOM nodes or React elements (e.g., `useRef` for focusing an input).  

16. **What are React Fragments?**  
    - **Answer**: `<Fragment>` or `<>...</>` syntax to group elements without adding extra DOM nodes.  

17. **What are React Portals?**  
    - **Answer**: Render children into a DOM node outside the parent component (e.g., modals) using `ReactDOM.createPortal()`.  

18. **What is server-side rendering (SSR) in React?**  
    - **Answer**: Rendering React on the server (e.g., Next.js) for SEO, faster initial load.  

---

#### **Advanced React Concepts**  
19. **Class vs. Functional Components**  
    - **Answer**:  
      - **Class**: Lifecycle methods, `this.state`, legacy code.  
      - **Functional**: Simpler syntax, hooks (preferred post-React 16.8).  

20. **What is React Fiber?**  
    - **Answer**: A reimplementation of React’s core algorithm for better rendering performance and prioritization (e.g., incremental rendering).  

21. **Explain the React reconciliation process.**  
    - **Answer**: The algorithm React uses to diff the virtual DOM and update the real DOM efficiently.  

22. **How to create custom hooks?**  
    - **Answer**: Functions starting with `use` that compose built-in hooks (e.g., `useFetch` for API calls).  

23. **Testing React components**  
    - **Answer**: Use Jest + React Testing Library. Example:  
      ```javascript
      test('renders button', () => {
        render(<Button />);
        expect(screen.getByText('Click')).toBeInTheDocument();
      });
      ```  

24. **What is Strict Mode in React?**  
    - **Answer**: A tool (`<React.StrictMode>`) for highlighting potential issues (e.g., deprecated lifecycle methods).  

25. **PropTypes vs. TypeScript**  
    - **Answer**:  
      - **PropTypes**: Runtime type checking.  
      - **TypeScript**: Static type checking (preferred for large apps).  

26. **React.memo vs. useMemo**  
    - **Answer**:  
      - **React.memo**: Memoizes component renders.  
      - **useMemo**: Memoizes computed values.  

---

### **Sheet Quick Reference**  
| Concept              | Key Points                                                                 |  
|----------------------|----------------------------------------------------------------------------|  
| **Virtual DOM**       | Lightweight DOM copy; efficient diffing for updates.                       |  
| **Hooks Rules**       | Only call hooks at the top level (not in loops/conditions).                |  
| **Redux Flow**        | Action → Reducer → Store → View.                                           |  
| **Context API**       | `createContext()`, `Provider`, `useContext`. Avoid overuse for frequent updates. |  
| **Error Boundaries**  | Class components with `componentDidCatch`.                                |  
| **React Fiber**       | Enables async rendering and task prioritization.                           |  

---

Use this guide to structure interviews and evaluate candidates’ depth of React.js knowledge! 🚀