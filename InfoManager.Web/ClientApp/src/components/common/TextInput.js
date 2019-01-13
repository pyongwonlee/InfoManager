import React from 'react';
import PropTypes from 'prop-types';

const TextInput = ({name, placeholder, value, label, onChange}) => {
  return (
    <div className="form-group row">
      <label htmlFor={name} className="col-2 offset-1 col-form-label">{label}</label>
      <div className="col-8">
        <input type="text" className="form-control" 
          name={name} id={name}
          onChange={onChange} 
          placeholder={placeholder}
          value={value} />
      </div>
    </div>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
};

export default TextInput;
