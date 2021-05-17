package com.ihave.sos.main;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.ihave.sos.R;
import com.ihave.sos.base.BaseActivity;
import com.ihave.sos.home.HomeActivity;
import com.ihave.sos.utils.GlobalUtil;
import com.ihave.sos.utils.dialog.CustomProgress;
import com.ihave.sos.utils.network.HttpCall;
import com.ihave.sos.utils.network.HttpRequest;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;

import static com.ihave.sos.utils.GlobalUtil._isTest;
import static com.ihave.sos.utils.GlobalUtil.userId;

public class LoginActivity extends BaseActivity {

    private Button btnLogin;
    private Button btnRegister;
    private EditText edtEmail;
    private EditText edtPassword;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        this.getSupportActionBar().hide();

        thisActivity = this;
        thisContext = this;
        thisView = findViewById(R.id.activity_login);

        initUI();
    }

    private void initUI() {
        edtEmail = findViewById(R.id.edtEmail);
        edtPassword = findViewById(R.id.edtPassword);
        btnLogin = findViewById(R.id.btnLogin);
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                tryUserLogin();
            }
        });
        btnRegister = findViewById(R.id.btnRegister);
        btnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                gotoRegisterActivity();
            }
        });
    }

    private void gotoRegisterActivity() {
        Intent intent = new Intent(LoginActivity.this, RegisterActivity.class);
        startActivity(intent);
        finish();
    }

    private void gotoHomeActivity() {
        Intent intent = new Intent(LoginActivity.this, HomeActivity.class);
        startActivity(intent);
        finish();
    }

    private void tryUserLogin() {
        String email = edtEmail.getText().toString();
        String password = edtPassword.getText().toString();

        if (_isTest) {
            email = "admin@hotmail.com";
            password = "admin";
        }

        if (checkInputValues(email, password)) {
            showProgressDialog(getString(R.string.message_content_loading));
            HttpCall httpCallPost = new HttpCall();
            httpCallPost.setMethodtype(HttpCall.POST);
            String url = "\n" + GlobalUtil.server_api_url + GlobalUtil.login_url;
            httpCallPost.setUrl(url);
            HashMap<String,String> paramsPost = new HashMap<>();
            paramsPost.put("email", email);
//            paramsPost.put("password", getMD5(password));
            paramsPost.put("password", password);
            httpCallPost.setParams(paramsPost);
            new HttpRequest(){
                @Override
                public void onResponse(String str) {
                    super.onResponse(str);
                    try {
                        JSONObject response = new JSONObject(str);
                        CustomProgress.dismissDialog();
                        userId = response.getString("id");
                        Log.i("Loginactivity", "userId: " + userId);
                        gotoHomeActivity();
//                        int responseCode = (int) response.get("code");
                    } catch (JSONException e) {
                        e.printStackTrace();
                        CustomProgress.dismissDialog();
                        showToast("Login Failed");
                    }

                }
            }.execute(httpCallPost);
        }

    }

    public boolean checkInputValues(String email, String password) {
        boolean isValue = true;
        if(email.equals("")) {
            showToast("Please input Email");
            isValue = false;
        }
        else if(password.equals("")) {
            showToast("Please input Password");
            isValue = false;
        }
        return isValue;
    }
}