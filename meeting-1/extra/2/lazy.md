
## `import()`

The best way to introduce code-splitting into your app is through the dynamic  `import()`  syntax.

**Before:**

```
import { add } from './math';

console.log(add(16, 26));
```

**After:**

```
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

```javascript
import React, { Suspense } from 'react';
import Tabs from './Tabs';
import Glimmer from './Glimmer';

const Comments = React.lazy(() => import('./Comments'));
const Photos = React.lazy(() => import('./Photos'));

function MyComponent() {
  const [tab, setTab] = React.useState('photos');
  
  function handleTabSelect(tab) {
    setTab(tab);
  };

  return (
    <div>
      <Tabs onTabSelect={handleTabSelect} />
      <Suspense fallback={<Glimmer />}>
        {tab === 'photos' ? <Photos /> : <Comments />}
      </Suspense>
    </div>
  );
}
```

However, sometimes this user experience is not desirable. In particular, it is sometimes better to show the “old” UI while the new UI is being prepared. You can use the new  [`startTransition`](https://reactjs.org/docs/react-api.html#starttransition)  API to make React do this:

```
function handleTabSelect(tab) {
  startTransition(() => {
    setTab(tab);
  });
}
```

Here, you tell React that setting tab to  `'comments'`  is not an urgent update, but is a  [transition](https://reactjs.org/docs/react-api.html#transitions)  that may take some time. React will then keep the old UI in place and interactive, and will switch to showing  `<Comments />`  when it is ready


## Named Exports

`React.lazy`  currently only supports default exports. If the module you want to import uses named exports, you can create an intermediate module that reexports it as the default. This ensures that tree shaking keeps working and that you don’t pull in unused components.

```
// ManyComponents.js
export const MyComponent = /* ... */;
export const MyUnusedComponent = /* ... */;
```

```
// MyComponent.js
export { MyComponent as default } from "./ManyComponents.js";
```

```
// MyApp.js
import React, { lazy } from 'react';
const MyComponent = lazy(() => import("./MyComponent.js"));
```
