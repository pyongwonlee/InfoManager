import React from 'react';
import PropTypes from 'prop-types';

const SelectInput = ({name, reference, options, label}) => {
  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-2 offset-1 col-form-label">Name:</label>
      <div className="col-8">
        <select className="form-control" 
          name={name} id={name}
          ref={reference}>
            {options.map((option, index) => {
              return (
                <option key={index} value={option.value}>{option.text}</option>
              );
              }
            )}
        </select>
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  reference: PropTypes.object,
  options: PropTypes.array,
  label: PropTypes.string.isRequired,
};

export default SelectInput;
