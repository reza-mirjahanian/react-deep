import dataContext from "./DataProvider";
import React from 'react'
export default  () => {
    const [data, setData] = React.useContext(dataContext)

    return (
        <>
            <h3>This is the consumer</h3>
            <p>
                <strong>Data:</strong> {data}
            </p>
            <button onClick={() => setData('Data has changed!')}>
                Click to change data!
            </button>
        </>
    )
}
