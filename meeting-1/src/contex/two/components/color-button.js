// Libraries
import React from 'react';
// HOCs
import { withColorContext } from '../contexts/color-context';
// Styles
import '../styles/color-button.css';

class ColorButton extends React.PureComponent {
  render() {
    const {
      color,
      selectColor,
      selectedColor
    } = this.props;

    return (
      <button
        className={ `color-button ${ selectedColor === color ? ' color-button--selected' : '' }` }
        onClick={ () => { selectColor(color); } }
      >
        { color }
      </button>
    );
  }
}

export default withColorContext(ColorButton);
