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
import SectionContainer from '../../components/sectionContainer';
import { connect } from 'react-redux';
import { homepageActions } from '../../actions/homepage.actions';
import './DataTable.css';


class CryHistory extends Component {

  state = { data : { }}
  componentDidMount() {
    this.props.getAllHistories();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.cryhistory && nextProps.cryhistory.length > 0){
      let rows = []
      nextProps.cryhistory.map(cry=>{
        let fullname = cry.member.firstName + cry.member.lastName;
        let email = cry.member.email;
        let resort = cry.resort.tag;
        let word = cry.word;
        //let registerDate = cry.created_at;
        rows.push({"email": email, "resort": resort, "word": word })
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
            "label": "リゾート",
            "field": "resort",
            "sort": "asc",
            "width": 250
          },
          {
            "label": "語",
            "field": "word",
            "sort": "asc",
            "width": 250
          },
          // {
          //   "label": "登録日付",
          //   "field": "registereddate",
          //   "sort": "asc",
          //   "width": 200
          // }
        ],
        rows
      }
      this.setState({data});
    }
  }
  render() {
    const data = this.state.data;
    return (
      <MDBContainer className='mt-3' id = "cryhistory">
        <MDBRow className='py-3'>
          <MDBCol md='12'>
            <SectionContainer header='心の叫び' noBorder>
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
  cryhistory: state.homepageContents.cryhistory
})
const actionCreators = {
  getAllHistories: homepageActions.getAllHistories
};

export default connect(mapStateToProps, actionCreators)(CryHistory);
