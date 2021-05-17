
import { MDBBreadcrumbItem, MDBInputGroup, MDBInput } from "mdbreact";
import React, { Component } from "react";
import UploadService from "../_services/FileUploadService";
import { connect } from 'react-redux';
import { homepageActions } from '../actions/homepage.actions';

class UploadFiles extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedFiles: {
                image: "",
                video: "",
            },
            message: "",
            progress: 0,
            currentFile: false,
            fileInfos : [],
            tag: '',
            method: 0
        };
        this.handleChange = this.handleChange.bind(this);
    }

    selectFile = (type) => (event) => {
        this.setState({
            ...this.state,
            selectedFiles: {
                ...this.state.selectedFiles,
                [type]: event.target.files[0],
            }
        })
    };
    handleChange(e){
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    upload = () => {
        let currentFileImage = this.state.selectedFiles['image'];
        let currentFileVideo = this.state.selectedFiles['video'];
        let {user} = this.props;
        let {method, tag} = this.state;
        let userId = user.data.userId;
        this.setState({
            ...this.state,
            progress: 0,
            currentFile: true
        })
        if (currentFileImage == "" ){
            this.setState({
                ...this.state,
                message:'画像を挿入する必要があります!'
            })
        }
        if (currentFileVideo == ""){
            this.setState({
                ...this.state,
                message:'ビデオを挿入する必要があります!'
            })
        }
        if (tag == ""){
            this.setState({
                ...this.state,
                message:'タグを挿入する必要があります'
            })
        }
        if(currentFileImage != "" && currentFileVideo != "" && tag != ""){
            let payMethod = '';
            if (method == 0){
                payMethod = 0
            }
            else if(method == 1){
                payMethod = 1
            }
            
            let extraInfo = {
                userId: userId,
                payMethod: payMethod,
                tag:tag
            }
            UploadService.upload({
                image: currentFileImage,
                video: currentFileVideo,
            }, extraInfo, (event) => {
                this.setState({
                    ...this.state,
                    progress: Math.round((100 * event.loaded) / event.total)
                })
            })
            .then((response) => {
                if (response.status == 200){
                    this.props.setResort(response);
                    this.setState({
                        ...this.state,
                        message: 'ファイルのアップロードに成功しました！',
                        tag: ''
                    })
                    this.refs.image.value = ""
                    this.refs.video.value = ""
                }
                this.setState({
                    ...this.state,
                    fileInfos:response.data,
                    currentFile: false,
                    selectedFiles: {}
                })
            })
            .catch(() => {
                this.setState({
                    ...this.state,
                    progress: 0,
                    message: 'アップロードを提出できませんでした!',
                    currentFile: false,
                })
            });  
        }      
    };
    render() {
        const {selectedFiles, message, progress, currentFile, fileInfos, tag, method} = this.state;
        const {image, video} = this.state.selectedFiles;
        return (
        <div className = "container">
        {currentFile && (
            <div className="progress">
            <div
                className="progress-bar progress-bar-info progress-bar-striped"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: progress + "%" }}
            >
                {progress}%
            </div>
            </div>
        )}
        <div className = "row">
            <div className= "col-md-4">
                <label className="btn btn-default">
                    <input type="file" accept="image/*" ref="image" onChange={this.selectFile("image")} name = "image" />
                </label>
            </div>
            <div className = "col-md-4">
                <label className="btn btn-default">
                    <input type="file" accept="video/*" ref="video"  onChange={this.selectFile("video")} name = "video"/>
                </label>
            </div>
            <div className = "col-md-4">
                <MDBInputGroup
                    prepend='Options'
                    inputs={
                    <select className='browser-default custom-select'
                    name="method"
                    value={method}
                    onChange={this.handleChange}>
                        <option value='0'>無料で</option>
                        <option value='1'>コスト</option>
                    </select>
                    }
                />
            </div>
        </div>
        <div className="alert alert-light pt-0 pb-0" style ={{color:'red', fontSize:'0.7rem'}} role="alert">
            {message}
        </div>
        <div className = "row">
            <div className = "col-md-6">
                <input type="text" className="form-control" placeholder="タグを付ける" aria-label="Username" aria-describedby="basic-addon1" onChange = {this.handleChange} name = 'tag' value = {tag}/>   
            </div>
            <div className = "col-md-5">
            </div>
            <div className = "col-md-1">
                <button
                    className="btn btn-success"
                    disabled={!selectedFiles}
                    onClick={this.upload}
                >
                    <i className = "fa fa-upload"></i>
                </button>
            </div>
        </div>
        </div>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.authentication.user
})

const actionCreators = {
    setResort: homepageActions.setResort
};

export default connect(mapStateToProps, actionCreators)(UploadFiles);