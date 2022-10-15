Note

Error boundaries do  **not**  catch errors for:

- Event handlers ([learn more](https://reactjs.org/docs/error-boundaries.html#how-about-event-handlers))
- Asynchronous code (e.g.  `setTimeout`  or  `requestAnimationFrame`  callbacks)
- Server side rendering
- Errors thrown in the error boundary itself (rather than its children)
