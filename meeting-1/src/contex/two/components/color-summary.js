// Libraries
import React from 'react';
// HOCs
import { withColorContext } from '../contexts/color-context';
// Styles
import '../styles/color-summary.css';

class ColorSummary extends React.PureComponent {
  render() {
    const {
      selectedColor
    } = this.props;

    return (
      <p className="color-summary">
        Selected Color: { selectedColor || 'None' }
      </p>
    );
  }
}

export default withColorContext(ColorSummary);
