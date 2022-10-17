## Usage

A  `Profiler`  can be added anywhere in a React tree to measure the cost of rendering that part of the tree. It requires
two props: an  `id`  (string) and an  `onRender`  callback (function) which React calls any time a component within the
tree “commits” an update.

For example, to profile a  `Navigation`  component and its descendants:

```javascript
render(
    <App>
        <Profiler id="Navigation" onRender={callback}>
            <Navigation {...props} />
        </Profiler>
        <Main {...props} />
    </App>
);
```
