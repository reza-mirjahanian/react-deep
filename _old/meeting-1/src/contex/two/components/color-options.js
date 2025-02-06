// Libraries
import React from 'react';
// Components
import ColorButton from './color-button';
// Styles
import '../styles/color-options.css';

class ColorOptions extends React.PureComponent {
  render() {
    return (
      <div className="color-options">
        <ul className="color-options__list">
          <li className="color-options__list-item">
            <ColorButton color="red" />
          </li>
          <li className="color-options__list-item">
            <ColorButton color="green" />
          </li>
          <li className="color-options__list-item">
            <ColorButton color="blue" />
          </li>
        </ul>
      </div>
    );
  }
}

export default ColorOptions;
