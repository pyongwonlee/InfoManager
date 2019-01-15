import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CompanyRow = (props) => {
  return (
    <div className="row category-row">
      <div className="col-10 offset-1">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-6 text-left">
              <h4 style={{marginLeft:'20px'}}>{props.company.name}</h4>
            </div>
            <div className="col-2 offset-4 text-right">
              <Link to={`/company/${props.company.companyId}`}><i className="fas fa-edit"></i></Link>
              <Link to={`/company/delete/${props.company.companyId}`}><i className="fas fa-trash-alt"></i></Link>              
            </div>
          </div>
          <div className="row">
            <div className="col-10 offset-1">
                <div className="alert alert-info">
                  <ul>
                    <li>Category: {props.company.categoryName}</li>
                    <li>Description: {props.company.description}</li>
                    <li>Url: <a href={props.company.webAddress} target="_blank" rel="noopener noreferrer">{props.company.webAddress}</a></li>
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

CompanyRow.propTypes = {
  company: PropTypes.shape({
    companyId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    webAddress: PropTypes.string,
    categoryName: PropTypes.string.isRequired,
    categoryId: PropTypes.number.isRequired
  })
};

export default CompanyRow;