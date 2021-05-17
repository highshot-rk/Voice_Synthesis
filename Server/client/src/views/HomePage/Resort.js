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
import FileUpload from "../../components/FileUpload";
import Parse from 'html-react-parser'
class Resort extends Component {

  state = { data : { }}
  componentDidMount() {
    this.props.getAllResorts();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.resort&&nextProps.resort.length>0){
      let rows = []
      console.log(nextProps.resort);
      nextProps.resort.map(resort=>{
        let fullname = resort.member.firstName + resort.member.lastName;
        let email = resort.member.email;
        let imageurl = resort.imageOriginal;
        let imagedownladurl = resort.imageFile;
        let videodownladurl = resort.videoFile;
        let videourl = resort.videoOriginal;
        let freetype = resort.freeType == 0 ? "自由" : "価格";
        let tag = resort.tag;
        rows.push({"email": email, "imageurl": Parse(`<a href = 'http://18.191.170.127:8000/uploads/resort/${imagedownladurl}' style = 'font-weight : 600; color: blue' download>${imageurl}</a>`), "videourl": Parse(`<a href = 'http://18.191.170.127:8000/uploads/resort/${videodownladurl}' style = 'font-weight : 600; color: blue' download>${videourl}</a>`), "tag": tag, "freetype":freetype })
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
              "label": "画像_url",
              "field": "imageurl",
              "sort": "asc",
              "width": 250
            },
            {
              "label": "ビデオ_url",
              "field": "videourl",
              "sort": "asc",
              "width": 250
            },
            {
              "label": "鬼ごっこ",
              "field": "tag",
              "sort": "asc",
              "width": 200
            },
            {
              "label": "フリータイプ",
              "field": "freetype",
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
      <MDBContainer className='mt-3' id="resort">
        <MDBRow className='py-3'>
          <MDBCol md='12'>
         
            <SectionContainer header='シーン追加' noBorder className = "pt-3">
            <FileUpload />
              <MDBCard className = "mt-5">
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
  resort: state.homepageContents.resort
})

const actionCreators = {
  getAllResorts: homepageActions.getAllResorts
};

export default connect(mapStateToProps, actionCreators)(Resort);
