import http from "./http-common";
import { authHeader } from '../_helpers';
import axios from "axios";
import { config } from '../_helpers/config'

const upload = (files, extraInfo, onUploadProgress) => {
    let formData = new FormData();

    formData.append("media", files.image);
    formData.append("media", files.video);
    let authH = authHeader()
    return axios.post("http://localhost:8000/api/Resorts/uploadMedia", formData ,{
      headers: {
        ...authH,
        "Content-Type": "multipart/form-data",
      },
      params: {
        extraInfo: 
        {
          "userId": extraInfo.userId,
          "paymethod": extraInfo.payMethod,
          "tag" : extraInfo.tag
        }
      },
      onUploadProgress,
    })
  };
  
  // const getFiles = () => {
  //   return http.get("/files");
  // };
  
  export default {
    upload,
    // getFiles,
  };