import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryRow = (props) => {
  return (
    <div className="row category-row">
      <div className="col-10 offset-1">
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-3 text-left">
                <h4 style={{marginLeft:'20px'}}>{props.category.name}</h4>
              </div>
              <div className="col-2 offset-7 text-right">
                <Link to={`/category/${props.category.categoryId}`}><i className="fas fa-edit"></i></Link>
                <Link to={`/category/delete/${props.category.categoryId}`}><i className="fas fa-trash-alt"></i></Link>              
              </div>
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
};

CategoryRow.propTypes = {
  category: PropTypes.shape({
    categoryId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    companies: PropTypes.array
  })
};

export default CategoryRow;