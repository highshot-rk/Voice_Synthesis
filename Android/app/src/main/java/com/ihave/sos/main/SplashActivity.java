package com.ihave.sos.main;

import android.app.Activity;
import android.content.Intent;
import android.graphics.LinearGradient;
import android.graphics.Shader;
import android.os.Build;
import android.os.Handler;
import androidx.annotation.RequiresApi;
import android.os.Bundle;
import android.widget.TextView;

import com.ihave.sos.R;

public class SplashActivity extends Activity {

    private TextView txtIhave;
    private TextView txtSos;
    private int totalTimerCount = 3;
    int timerCount = 0;
    private final int interval = 1000; // 1 Second
    private Handler handler = new Handler();
    Runnable runnable;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        timerCount = 0;
        initUI();
        handle();
    }

    private void initUI() {
        txtIhave = findViewById(R.id.txtIhave);
        Shader shader1 = new LinearGradient(0,0,0,txtIhave.getLineHeight(),
                getResources().getColor(R.color.colorRed), getResources().getColor(R.color.colorPink), Shader.TileMode.REPEAT);
        txtIhave.getPaint().setShader(shader1);

        txtSos = findViewById(R.id.txtSos);
        Shader shader = new LinearGradient(0,0,0,txtSos.getLineHeight(),
                getResources().getColor(R.color.colorRed), getResources().getColor(R.color.colorPink), Shader.TileMode.REPEAT);
        txtSos.getPaint().setShader(shader);
    }

    private void handle() {
        handler = new Handler();
        runnable = new Runnable() {
            @RequiresApi(api = Build.VERSION_CODES.P)
            @Override
            public void run() {
                if (timerCount < totalTimerCount) {
                    timerCount++;
                    handle();
//                    txtIhave.setText(System.currentTimeMillis() + "");
                }
                else {
                    gotoLoginActivity();
                }
            }
        };
        handler.postDelayed(runnable, 500);
    }

    private void gotoRegisterActivity() {
        Intent intent = new Intent(SplashActivity.this, RegisterActivity.class);
        SplashActivity.this.startActivity(intent);
        finish();
    }
    private void gotoLoginActivity() {
        Intent intent = new Intent(SplashActivity.this, LoginActivity.class);
        startActivity(intent);
        finish();
    }
}

