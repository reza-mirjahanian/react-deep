https://felixgerschau.com/react-rerender-components/#why-doesnt-my-react-component-update-when-its-props-change

Above we saw what causes a re-draw of our UI, but what is calling React's render function to begin with?

React schedules a render every time the state of a component changes.

Scheduling a render means that this doesn't happen immediately. React will try to find the best moment for this.

Changing the state means that React triggers an update when we call the setState function (in React hooks, you would use useState). This doesn't only mean the component's render function will be called, but also that all its subsequent child components will re-render, regardless of whether their props have changed or not.Above we saw what causes a re-draw of our UI, but what is calling React's render function to begin with?

React schedules a render every time the state of a component changes.

Scheduling a render means that this doesn't happen immediately. React will try to find the best moment for this.

Changing the state means that React triggers an update when we call the setState function (in React hooks, you would use useState). This doesn't only mean the component's render function will be called, but also that all its subsequent child components will re-render, regardless of whether their props have changed or not.


### Why doesn't my React component update when its props change?

There are two common reasons why React might not update a component even though its props have changed:

1.  The props weren't updated correctly via  `setState`
2.  The reference to the prop stayed the same

As we already saw before, React re-renders a component when you call the  `setState`  function to change the state (or the provided function from the  `useState`  hook in function components).

As a result, the child components only update when the parent component's state changes  **with one of those functions**.

**Directly mutating the props object is not allowed**  since this won't trigger any changes, and React doesn't notice the changes.

```javascript
this.props.user.name = 'Felix';
```


https://www.developerway.com/posts/how-to-write-performant-react-code

**Rule #1.** If the only reason you want to extract your inline functions in props into useCallback is to avoid re-renders of children components: don’t. It doesn’t work.

https://codesandbox.io/s/re-renders-simplified-memo-xcv5f?file=/src/country-settings/page.tsx

**Rule #2**. If your component manages state, find parts of the render tree that don’t depend on the changed state and memoise them to minimize their re-renders.

**Rule #3**. Never create new components inside the render function of another component.

**if a component uses context consumer, it will be re-rendered every time the context provider’s value is changed.**


https://codesandbox.io/s/context-before-good-duhgf?file=/src/country-settings/page.tsx

**Rule #4**: When using context, make sure that value property is always memoised if it’s not a number, string or boolean.


So let’s refresh  **when React components re-render**:

-   when component's state changed
-   when parent component re-renders
-   when a component uses context and the value of its provider changes



Let’s recap the rules of performant hooks before leaving:

-   every state change in a hook will cause its “host” component to re-render, regardless of whether this state is returned in the hook value and memoised or not
-   the same with chained hooks, every state change in a hook will cause all “parent” hooks to change until it reaches the “host” component, which again will trigger the re-render

And the things to watch out for, when writing or using custom hooks:

-   when using a custom hook, make sure that the state that this hook encapsulates is not used on the level it wouldn’t have been used with the components approach. Move it “down” to a smaller component if necessary
-   never implement “independent” state in a hook or use hooks with the independent state
-   when using a custom hook, make sure it doesn’t perform some independent state operations, that are not exposed in its return value
-   when using a custom hook, make sure that all hooks that it uses also follow the rules from the above
