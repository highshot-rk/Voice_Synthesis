import React, { Component } from 'react';
import {
  MDBDataTable,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBadge
} from 'mdbreact';
import PropTypes from 'prop-types';
import SectionContainer from '../../components/sectionContainer';
import { connect } from 'react-redux';
import { homepageActions } from '../../actions/homepage.actions';
import './DataTable.css';

class Member extends Component {

  constructor(props){
    super(props);
    this.state = 
    { data : {}
    }
  }
  
  componentDidMount() {
      this.props.getAllUsers();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users && nextProps.users.length > 0){
      let rows = []
        nextProps.users.map(user=>{
          let fullname = user.firstName + user.lastName;
          let email = user.email;
          let nickName = user.nickName;
          let gender = (user.sex == true) ? "male" : "female";
          let age = user.age;
          let address = user.address;
          let job = user.job;
          let voiceFile = user.voiceUrl;
          rows.push({"email": email, "nickname": nickName, "age": age, "address": address, "job": job})
        })
        let data = {};
        data = {
          "columns": [
            // {
            //   "label": "名前",
            //   "field": "name",
            //   "sort": "asc",
            //   "width": 250
            // },
            {
              "label": "Email",
              "field": "email",
              "sort": "asc",
              "width": 200
            },
            {
              "label": "ニックネーム",
              "field": "nickname",
              "sort": "asc",
              "width": 250
            },
            // {
            //   "label": "性別",
            //   "field": "gender",
            //   "sort": "asc",
            //   "width": 150
            // },
            {
              "label": "年齢",
              "field": "age",
              "sort": "asc",
              "width": 100
            },
            {
              "label": "住所",
              "field": "address",
              "sort": "asc",
              "width": 300
            },
            {
              "label": "ジョブ",
              "field": "job",
              "sort": "asc",
              "width": 250
            },
            // {
            //   "label": "ボイス_url",
            //   "field": "voiceurl",
            //   "sort": "asc",
            //   "width": 250
            // },
          ],
          rows
        }
        this.setState({data});
    }
  }
  render() {
    const {data} = this.state
    return (
      <MDBContainer className='mt-3' id="member">
        <MDBRow className='py-3'>
          <MDBCol md='12'>
            <SectionContainer header='ユーザー管理' noBorder>
              <MDBCard>
                <MDBCardBody>
                  <MDBDataTable
                    striped
                    bordered
                    hover
                    data={data}
                    noRecordsFoundLabel = "検索結果はありません！"
                    entriesLabel = "エントリを表示"
                    paginationLabel = {['前','次']}
                    infoLabel =  {["表示中","の","に","エントリ"]}
                  /> 
                </MDBCardBody>
              </MDBCard>
            </SectionContainer>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.homepageContents.users
})
const actionCreators = {
  getAllUsers: homepageActions.getAllUsers
};

export default connect(mapStateToProps, actionCreators)(Member);
