import {useContext} from "react";
import {ThemeContext} from "./context.js";


export default function Form(){
    const contextValue = useContext(ThemeContext);
    return (
        <form  className="flex flex-col gap-2">
            <input type="hidden" name={contextValue} />

            <input type="text" name="username" />

        </form>
    )
}