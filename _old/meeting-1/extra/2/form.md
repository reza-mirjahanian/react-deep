## Controlled Components

In HTML, form elements such as  `<input>`,  `<textarea>`, and  `<select>`  typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with  [`setState()`](https://reactjs.org/docs/react-component.html#setstate).

We can combine the two by making the React state be the “single source of truth”. Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a “controlled component”.

## You can pass an array into the  `value`  attribute, allowing you to select multiple options in a  `select`  tag:

```javascript
<select multiple={true} value={['B', 'C']}>
```

## The file input Tag  is an uncontrolled component 



## Handling Multiple Inputs

When you need to handle multiple controlled  `input`  elements, you can add a  `name`  attribute to each element and let the handler function choose what to do based on the value of  `event.target.name`.

## Controlled Input Null Value

Specifying the  `value`  prop on a  [controlled component](https://reactjs.org/docs/forms.html#controlled-components)  prevents the user from changing the input unless you desire so. If you’ve specified a  `value`  but the input is still editable, you may have accidentally set  `value`  to  `undefined`  or  `null`.

The following code demonstrates this. (The input is locked at first but becomes editable after a short delay.)

```javascript
ReactDOM.createRoot(mountNode).render(<input value="hi" />);

setTimeout(function() {
  ReactDOM.createRoot(mountNode).render(<input value={null} />);
}, 1000);
```
