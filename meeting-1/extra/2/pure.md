### A pure function is a function which:

Given the same input, always returns the same output.
Produces no side effects.


### Pure Components in React
Pure Components in React are the components which do not re-renders when the value of state and props has been updated with the same values. If the value of the previous state or props and the new state or props is the same, the component is not re-rendered. Pure Components restricts the re-rendering ensuring the higher performance of the Component

###  Features of React Pure Components

Prevents re-rendering of Component if props or state is the same
Takes care of “shouldComponentUpdate” implicitly
State and Props are Shallow Compared
Pure Components are more performant in certain cases

###  We can convert component to pure component as below:

For class components react provides React.PureComponent base class.
For Functional component react provides React.memo HOC (Higher Order Component).
