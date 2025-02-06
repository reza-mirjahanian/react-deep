import {Component} from "react";
import {DataProvider} from "./DataProvider";
import Nested from "./Nested";

export class ContextOne extends Component {
    render() {
        return <DataProvider>
            <h1>Hello!</h1>
            <Nested></Nested>
        </DataProvider>;
    }
}
