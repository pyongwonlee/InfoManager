import React from 'react';
import PropTypes from 'prop-types';

const CategoryForm = (props, ref) => {
  return (
    <form>
      <div className="form-group row">
        <label htmlFor="inputCategory" className="col-2 offset-1 col-form-label">Name</label>
        <div className="col-8">
          <input type="text" className="form-control" id="inputCategory" ref={ref} placeholder="Category Name" />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-10 offset-1">
          <button type="submit" className="btn btn-primary" onClick={props.onSave}>Create</button>
        </div>
      </div>
    </form>
  );
};

CategoryForm.propTypes = {
  onSave: PropTypes.func.isRequired
};

export default React.forwardRef(CategoryForm);