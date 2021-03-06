import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Navigator from '../../Student/studentNavbar';
import Content from './viewProfileContent';

export default class ViewCompanyProfile extends Component {
  constructor(props) {
    super(props);

    // State
    this.state = {
      company: [],
    };
    axios.get('/students/user')
      .then((res) => {
        console.log(res.data);
        if (!res.data.isStudent) {
          window.location.href = '/student-signin';
        }
      });
  }
  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`/companies/getCompany/${params.id}`)
      .then(({ data: user }) => {
        console.log('user', user);
        this.setState({ company: user });
      });
  }
  render() {
    return (
      <div>
        <Navigator />
        <Content state={this.state} />
      </div>
    );
  }
}
ViewCompanyProfile.propTypes = {
  match: PropTypes.node.isRequired,
};
