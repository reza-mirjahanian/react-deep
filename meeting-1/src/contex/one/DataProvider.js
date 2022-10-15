import React from 'react'

const dataContext = React.createContext()
export default dataContext

export const DataProvider = ({ children }) => {
    const [data, setData] = React.useState('This is the data!')

    return (
        <dataContext.Provider value={[data, setData]}>
            {children}
        </dataContext.Provider>
    )
}
