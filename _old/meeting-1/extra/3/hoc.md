### Don’t Use HOCs Inside the render Method

React’s diffing algorithm (called  [Reconciliation](https://reactjs.org/docs/reconciliation.html)) uses component
identity to determine whether it should update the existing subtree or throw it away and mount a new one. If the
component returned from  `render`  is identical (`===`) to the component from the previous render, React recursively
updates the subtree by diffing it with the new one. If they’re not equal, the previous subtree is unmounted completely.

Normally, you shouldn’t need to think about this. But it matters for HOCs because it means you can’t apply a HOC to a
component within the render method of a component:

```javascript
render()
{
    // A new version of EnhancedComponent is created on every render
    // EnhancedComponent1 !== EnhancedComponent2
    const EnhancedComponent = enhance(MyComponent);
    // That causes the entire subtree to unmount/remount each time!
    return <EnhancedComponent/>;
}
```

The problem here isn’t just about performance — remounting a component causes the state of that component and all of its
children to be lost.

Instead, apply HOCs outside the component definition so that the resulting component is created only once. Then, its
identity will be consistent across renders. This is usually what you want, anyway.

In those rare cases where you need to apply a HOC dynamically, you can also do it inside a component’s lifecycle methods
or its constructor.

### Static Methods Must Be Copied Over

Sometimes it’s useful to define a static method on a React component. For example, Relay containers expose a static
method  `getFragment`  to facilitate the composition of GraphQL fragments.

### Refs Aren’t Passed Through

While the convention for higher-order components is to pass through all props to the wrapped component, this does not
work for refs. That’s because  `ref`  is not really a prop — like  `key`, it’s handled specially by React. If you add a
ref to an element whose component is the result of a HOC, the ref refers to an instance of the outermost container
component, not the wrapped component.

The solution for this problem is to use the  `React.forwardRef`  API
