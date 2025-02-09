import {useActionState, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
const id = 1;
async  function action (preState, formData){
    await new Promise(resolve => setTimeout(resolve, 1000));
    const username = formData.get("username");
    const id = formData.get("id") ;

    if (username.length < 3) {
        return {
            success: false,
            message: "Username must be at least 3 characters long",
        };
    }

    return {
        success: true,
        message: `User ${id} updated to ${username}`,
    };
}


function App() {
  const [count, setCount] = useState(0)
    const [state, formAction, isPending] = useActionState(action, undefined);
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Reza Mirj</h1>
      <div className="card">

          <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
          </button>
          <p>
              Edit <code>src/App.jsx</code> and save to test HMR
          </p>
          <form action={formAction} className="flex flex-col gap-2">
              <input type="hidden" name="id" value={id} />
              <input type="text" name="username" />
              <button type="submit">{isPending ? "Submitting..." : "Submit"}</button>

              {state?.message && (
                  <p className={state.success ? "text-green-500" : "text-red-500"}>
                      {state.message}
                  </p>
              )}
          </form>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
