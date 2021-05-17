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

class Billing extends Component {

  state = { data : {  }}

  componentDidMount() {
    this.props.getAllPayments();     
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.billings&&nextProps.billings.length>0){
      let rows = []
        nextProps.billings.map(billing=>{
          let fullname = billing.member.firstName + billing.member.lastName;
          let email = billing.member.email;
          let amount = billing.amount;
          let status = billing.status;
          let type = billing.type;
          let pay_date = billing.paidDate;
          rows.push({"email": email, "amount": amount, "status": status, "type": type, "paieddate": pay_date})
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
              "label": "量",
              "field": "amount",
              "sort": "asc",
              "width": 250
            },
            {
              "label": "状態",
              "field": "status",
              "sort": "asc",
              "width": 150
            },
            {
              "label": "タイプ",
              "field": "type",
              "sort": "asc",
              "width": 100
            },
            {
              "label": "支払う日付",
              "field": "paieddate",
              "sort": "asc",
              "width": 200
            }
          ],
          rows
        }
        this.setState({data});
    }
  }
  render() {
    const data = this.state.data
    return (
      <MDBContainer className='mt-3' id="billing">
        <MDBRow className='py-3'>
          <MDBCol md='12'>
            <SectionContainer header='課金と広告収入' noBorder>
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
  billings: state.homepageContents.billings
})
const actionCreators = {
  getAllPayments: homepageActions.getAllPayments
};

export default connect(mapStateToProps, actionCreators)(Billing);
