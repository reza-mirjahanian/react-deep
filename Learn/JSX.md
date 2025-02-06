### **JSX in React: Complete Reference**

---

#### **1. Basic Syntax**
- **HTML-like syntax** embedded in JavaScript.
- **Must return a single root element** (use fragments `<>...</>` for multiple elements).
- **Self-closing tags** require `/` (e.g., `<img />`, `<input />`).

  ```jsx
  const element = <div>Hello React</div>;
  ```

---

#### **2. Embedding JavaScript Expressions**
- **Wrap JavaScript in `{}`** for dynamic content.
- **Valid for**: variables, function calls, ternary operators, etc.

  ```jsx
  const name = "Alice";
  const element = <h1>Hello {name.toUpperCase()}</h1>;
  ```

---

#### **3. Components & JSX**
- **Uppercase naming** for custom components (e.g., `<MyComponent />`).
- **Lowercase** for HTML tags (e.g., `<div>`).
- **Nest components** like HTML tags.

  ```jsx
  function App() {
    return <UserProfile />;
  }
  ```

---

#### **4. Props in JSX**
- **Pass props** as HTML attributes.
- **Dynamic values** use `{}`.
- **Spread operator** for multiple props: `<Component {...props} />`.

  ```jsx
  <Button color="blue" onClick={handleClick} disabled={isDisabled} />
  ```

---

#### **5. Conditional Rendering**
- **Use `&&` for simple conditions**.
- **Ternary operator** for if-else logic.
- **Avoid `if` statements directly in JSX** (wrap in IIFE or function).

  ```jsx
  {isLoggedIn && <Dashboard />}
  {score > 50 ? <Pass /> : <Fail />}
  ```

---

#### **6. Rendering Lists**
- **Use `map()`** to iterate arrays.
- **Add a unique `key` prop** for performance and React's reconciliation.

  ```jsx
  {users.map(user => (
    <li key={user.id}>{user.name}</li>
  ))}
  ```

---

#### **7. Fragments**
- **Group elements without a wrapper DOM node**.
- Syntax: `<></>` or `<Fragment></Fragment>`.

  ```jsx
  return (
    <>
      <Header />
      <MainContent />
    </>
  );
  ```

---

#### **8. Styling**
- **Inline styles**: Use objects with camelCase properties.
- **CSS classes**: Apply via `className` (not `class`).
- **CSS-in-JS**: Libraries like styled-components.

  ```jsx
  <div style={{ color: "red", fontSize: "20px" }} className="container"></div>
  ```

---

#### **9. Event Handling**
- **CamelCase event names**: `onClick`, `onChange`.
- **Pass function references**, not calls (avoid `onClick={handleClick()}`).

  ```jsx
  <button onClick={() => console.log("Clicked")}>Click Me</button>
  ```

---

#### **10. JSX vs HTML Differences**
| **Feature**       | **HTML**              | **JSX**                     |
|--------------------|-----------------------|-----------------------------|
| Attributes         | `class`, `for`        | `className`, `htmlFor`      |
| Inline styles      | String (e.g., `style="color: red"`) | Object (e.g., `style={{color: "red"}}`) |
| Self-closing tags  | Optional `/` (e.g., `<img>`) | Required `/` (e.g., `<img />`) |

---

#### **11. Tooling**
- **Babel**: Transpiles JSX to `React.createElement()` calls.
- **ESLint**: Use plugins like `eslint-plugin-react` for JSX linting.

---

#### **12. Common Pitfalls**
- **Returning multiple elements** without a fragment.
- **Missing keys** in list items.
- **Mixing JS expressions with JSX incorrectly** (e.g., `{if (x) {}}` is invalid).
- **Using reserved keywords** like `class` instead of `className`.

---

#### **13. Best Practices**
- **Keep JSX clean**: Extract complex logic into helper functions.
- **Use destructuring** for props to improve readability.
- **Avoid inline arrow functions** in render for performance (use event handlers with memoization if needed).

  ```jsx
  // Destructuring props
  function Greet({ name, age }) {
    return <div>{name} is {age} years old</div>;
  }
  ```

---------------
