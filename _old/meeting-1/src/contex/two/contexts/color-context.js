// Dependencies
// ------------

// Libraries
import React from 'react';

// Internal
// --------

const ColorContext = React.createContext();

//

class ColorContextProvider extends React.PureComponent {
  state = {
    selectedColor: 'red'
  };

  selectColor = (color) => {
    this.setState({ selectedColor: color });
  };

  render() {
    return (
      <ColorContext.Provider
        value={{
          selectColor: this.selectColor,
          selectedColor: this.state.selectedColor
        }}
      >
        { this.props.children }
      </ColorContext.Provider>
    );
  }
}

//

const withColorContext = (Component) => (
  (props) => (

    <ColorContext.Consumer>

      { colorContextProps => {
          console.log({...props});
          console.log({...colorContextProps});
       return  <Component { ...{ ...props, ...colorContextProps } } />
      } }
    </ColorContext.Consumer>
  )
);

// Exports
// -------

export { ColorContextProvider, withColorContext };
