import React from 'react';
import PropTypes from 'prop-types';

const Category = (props) => {
  return (
    <div className="row category-row">
      <div className="col-10 offset-1">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <h4>{props.category.name}</h4>
          </div>
          <div className="row">
            <div className="col-1 text-right">
                <span className="badge badge-info">{props.category.companies ? props.category.companies.length : 0 }</span>
            </div>
            <div className="col-10">
                <div className="alert alert-info">
                  <ul>
                  {
                    props.category.companies.map((company, index) => {
                        return (
                          <li key={index}>{company.name} - <a href={company.webAddress} target="_blank" rel="noopener noreferrer">{company.webAddress}</a></li>
                        );
                      })
                  }
                  </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

Category.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    companies: PropTypes.array
  })
};

export default Category;