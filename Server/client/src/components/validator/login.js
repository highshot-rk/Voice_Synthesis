  
import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
  let errors = {};
  
  if (Validator.isEmpty(data.email)) {
    errors.email = 'メールが必要です！';
  }
  if (!Validator.isEmpty(data.email)&&!Validator.isEmail(data.email)){
    errors.email = 'メールが無効です！'
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'パスワードが必要です！';
  }
  if (Validator.isEmail(data.email)&&data.email != "admin@hotmail.com" ){
    errors.email = "あなたは管理者ではありません！";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}