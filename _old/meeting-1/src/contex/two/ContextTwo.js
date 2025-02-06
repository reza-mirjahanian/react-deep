import {ColorContextProvider} from "./contexts/color-context";
import ColorSummary from "./components/color-summary";
import ColorOptions from "./components/color-options";


export default function () {
     return (
        <ColorContextProvider>
            <ColorSummary />
            <ColorOptions />
        </ColorContextProvider>
    );
}
