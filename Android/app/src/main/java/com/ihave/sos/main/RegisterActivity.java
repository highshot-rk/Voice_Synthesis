package com.ihave.sos.main;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;

import com.ihave.sos.R;
import com.ihave.sos.base.BaseActivity;
import com.ihave.sos.record.RecordActivity;
import com.ihave.sos.utils.GlobalUtil;
import com.ihave.sos.utils.dialog.CustomProgress;
import com.ihave.sos.utils.network.HttpCall;
import com.ihave.sos.utils.network.HttpRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import static com.ihave.sos.utils.GlobalUtil.addressStrings;
import static com.ihave.sos.utils.GlobalUtil.userId;

public class RegisterActivity extends BaseActivity {

    private Spinner spinnerAge;
    private List<String> ageStrings;

    private Spinner spinnerAddress;
    private Button btnRegister;
    private EditText edtEmail;
    private EditText edtNickName;
    private EditText edtPassword;
    private EditText edtConfirmPassword;
    private EditText edtJob;
    private ImageView imgBack;
    private TextView txtTitle;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        this.getSupportActionBar().hide();

        thisActivity = this;
        thisContext = this;
        thisView = findViewById(R.id.activity_register);

        initUI();
    }

    private void initUI() {
        imgBack = findViewById(R.id.imgBack);
        imgBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                gotoLoginActivity();
            }
        });
        txtTitle = findViewById(R.id.txtTitle);
        txtTitle.setText(getResources().getString(R.string.str_register));

        edtEmail = findViewById(R.id.edtEmail);
        edtNickName = findViewById(R.id.edtNickName);
        edtPassword = findViewById(R.id.edtPassword);
        edtConfirmPassword = findViewById(R.id.edtConfirmPassword);
        edtJob = findViewById(R.id.edtJob);
        btnRegister = findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                gotoRecordActivity();
                tryRegister();
            }
        });
        spinnerAge = findViewById(R.id.spinnerAge);
        ageStrings = new ArrayList<>();
        for (int i = 0; i < 121; i++) {
            ageStrings.add(i + "");
        }
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, ageStrings);
        spinnerAge.setAdapter(adapter);

        spinnerAddress = findViewById(R.id.spinnerAddress);
        ArrayAdapter<String> adapter1 = new ArrayAdapter<>(this, android.R.layout.simple_spinner_dropdown_item, addressStrings);
        spinnerAddress.setAdapter(adapter1);
    }

    private void tryRegister() {
        String email = edtEmail.getText().toString();
        String nickName = edtNickName.getText().toString();
        String password = edtPassword.getText().toString();
        String confirmPassword = edtConfirmPassword.getText().toString();
        String job = edtJob.getText().toString();
        String age = spinnerAge.getSelectedItem().toString();
        String address = spinnerAddress.getSelectedItem().toString();
        Log.i("RegisterActivity", "age: " + age + ", address: " + address);

        if (checkInputValue(email, nickName, password, confirmPassword, job, age, address)) {
            showProgressDialog(getString(R.string.message_content_loading));
            HttpCall httpCallPost = new HttpCall();
            httpCallPost.setMethodtype(HttpCall.POST);
            String url = "\n" + GlobalUtil.server_api_url + GlobalUtil.register_url;
            httpCallPost.setUrl(url);
            HashMap<String,String> paramsPost = new HashMap<>();
            paramsPost.put("email", email);
//            paramsPost.put("password", getMD5(password));
            paramsPost.put("password", password);
            paramsPost.put("firstName", "");
            paramsPost.put("lastName", "");
            paramsPost.put("nickName", nickName);
            paramsPost.put("sex", "true");
            paramsPost.put("age", age);
            paramsPost.put("job", job);
            httpCallPost.setParams(paramsPost);
            new HttpRequest(){
                @Override
                public void onResponse(String str) {
                    super.onResponse(str);
                    try {
                        JSONObject response = new JSONObject(str);
                        CustomProgress.dismissDialog();
                        userId = response.getString("id");
                        Log.i("RegisterActivity", "userId: " + userId);
                        gotoRecordActivity();
//                        int responseCode = (int) response.get("code");
                    } catch (JSONException e) {
                        e.printStackTrace();
                        CustomProgress.dismissDialog();
                        showToast("Register Failed");
                    }

                }
            }.execute(httpCallPost);
        }
    }

    private boolean checkInputValue(String email, String nickName, String password, String confirmPassword, String job, String age, String address){
        boolean isValue = true;
        if(email.equals("")){
            showToast("Please input email");
            isValue = false;
        }
        else if (!isEmailValid(email)){
            showToast("Please input correct email address");
            isValue = false;
        }
        else if (nickName.equals("")){
            showToast("Please input nickName");
            isValue = false;
        }
        else if(password.equals("")){
            showToast("Please input password");
            isValue = false;
        }
        else if(confirmPassword.equals("")){
            showToast("Please input Confirm password");
            isValue = false;
        }
        else if (!confirmPassword.equals(password)){
            showToast("Please input correct password");
            isValue = false;
        }
        else if(job.equals("")){
            showToast("Please input job");
            isValue = false;
        }
        else if(age.equals("")){
            showToast("Please select age");
            isValue = false;
        }
        else if(address.equals("")){
            showToast("Please select address");
            isValue = false;
        }
        return isValue;
    }

    private void gotoLoginActivity() {
        Intent intent = new Intent(RegisterActivity.this, LoginActivity.class);
        startActivity(intent);
        finish();
    }

    private void gotoRecordActivity() {
        Intent intent = new Intent(RegisterActivity.this, RecordActivity.class);
        startActivity(intent);
//        finish();
    }
}