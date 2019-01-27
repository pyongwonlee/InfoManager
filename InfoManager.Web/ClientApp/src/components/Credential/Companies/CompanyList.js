import React from 'react';
import PropTypes from 'prop-types';
import CompanyRow from './CompanyRow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import companyActions from '../../../actions/companyActions';

class CompanyList extends React.Component {

  static propTypes = {
    actions: PropTypes.object.isRequired,
    totalCount: PropTypes.number.isRequired,
    companies: PropTypes.array
  }

  componentDidMount() {
    this.props.actions.getCompanies();
  }

  render() {
    const {totalCount, companies} = this.props;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <h2>Companies</h2>
            <p className="text-info">(Total Count: {totalCount})</p>              
            <hr />
          </div>
        </div>
        <div className="row create-row">
          <div className="col-5 offset-1">
            <Link className="btn btn-primary" to="/company/0">Create a New Company</Link>
          </div>
        </div>
        { 
          companies.map((company, index) =>
            <CompanyRow company={company} key={index} />)
        }
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    companies: state.companyList.companies,
    totalCount: state.companyList.totalCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(companyActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyList);