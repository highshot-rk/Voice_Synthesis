package com.ihave.sos.home;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Toast;

import com.ihave.sos.R;
import com.ihave.sos.base.BaseActivity;
import com.ihave.sos.main.LoginActivity;
import com.ihave.sos.main.RegisterActivity;

public class InputActivity extends BaseActivity {
    private Button btnOk;
    private EditText edtInput;
    private ImageView imgBack;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_input);
        this.getSupportActionBar().hide();
        initUI();
    }

    private void initUI() {
        imgBack = findViewById(R.id.imgBack);
        imgBack.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });
        edtInput = findViewById(R.id.edtInput);
        edtInput.setText("");
        btnOk = findViewById(R.id.btnOk);
        btnOk.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String string = edtInput.getText().toString();
                if (string.equals("")) {
                    showToast("Please input letters");
                }
                else {
                    gotoVideoPlayActivity();
                }
            }
        });
    }

    private void gotoVideoPlayActivity() {
        Intent intent = new Intent(InputActivity.this, VideoPlayActivity.class);
        startActivity(intent);
    }
}