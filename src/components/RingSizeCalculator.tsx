
import { useState } from 'react';
import { convertRingSize, findClosestSize } from '../utils/ringSizeConverter';

interface RingSizeResult {
  us: string;
  uk: string;
  eu: string;
  diameter: string;
}

const RingSizeCalculator = () => {
  const [inputSize, setInputSize] = useState('');
  const [results, setResults] = useState<RingSizeResult>({
    us: '-',
    uk: '-',
    eu: '-',
    diameter: '-'
  });
  const [error, setError] = useState('');

  const calculateSize = () => {
    setError('');
    
    // Parse the input
    const input = inputSize.trim();
    if (!input) {
      setError('Please enter a ring size');
      return;
    }
    
    // Check if it's a number followed by unit
    const numericMatch = input.match(/^(\d+\.?\d*)\s*(us|uk|eu|mm)?$/i);
    
    if (!numericMatch) {
      setError('Invalid format. Try something like "52 EU" or "6 US"');
      return;
    }
    
    const value = parseFloat(numericMatch[1]);
    let unit = (numericMatch[2] || 'eu').toLowerCase();
    
    // Handle mm as diameter
    if (unit === 'mm') {
      unit = 'diameter';
    }
    
    let mapping;
    if (unit === 'uk') {
      // Special case for UK sizes which are letters
      setError('UK sizes should be entered as letters (e.g., "J")');
      return;
    } else if (unit === 'us' || unit === 'eu' || unit === 'diameter') {
      mapping = findClosestSize(value, unit as 'us' | 'eu' | 'diameter');
    }
    
    if (mapping) {
      setResults({
        us: mapping.us.toString(),
        uk: mapping.uk,
        eu: mapping.eu.toString(),
        diameter: mapping.diameter.toFixed(1) + ' mm'
      });
    } else {
      setError('Could not find a matching size');
    }
  };

  return (
    <div className="calculator-container">
      <div className="input-group">
        <label htmlFor="ring-size">Enter your ring size:</label>
        <input 
          type="text" 
          id="ring-size" 
          placeholder="e.g., 52 EU" 
          value={inputSize}
          onChange={(e) => setInputSize(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <button className="calculate-btn" onClick={calculateSize}>Calculate</button>
      <div className="results">
        <table>
          <thead>
            <tr>
              <th>Region</th>
              <th>Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>US</td>
              <td>{results.us}</td>
            </tr>
            <tr>
              <td>UK</td>
              <td>{results.uk}</td>
            </tr>
            <tr>
              <td>EU</td>
              <td>{results.eu}</td>
            </tr>
            <tr>
              <td>Diameter (mm)</td>
              <td>{results.diameter}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RingSizeCalculator;
