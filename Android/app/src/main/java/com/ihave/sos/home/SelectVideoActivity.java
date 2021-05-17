package com.ihave.sos.home;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import com.ihave.sos.R;
import com.ihave.sos.adapters.VideoItemAdapter;
import com.ihave.sos.base.BaseActivity;
import com.ihave.sos.main.LoginActivity;
import com.ihave.sos.model.VideosModel;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import butterknife.BindView;
import butterknife.ButterKnife;

public class SelectVideoActivity extends BaseActivity {

    @BindView(R.id.videoRecyclerView)
    RecyclerView videoRecyclerView;
    SwipeRefreshLayout mSwipeRefreshLayout;
    VideoItemAdapter adapter;
    List<VideosModel> videosModels;
    private ImageView imgBack;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_select_video);
        this.getSupportActionBar().hide();
        ButterKnife.bind(this);

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
        GridLayoutManager layoutManager
                = new GridLayoutManager(this, 2, RecyclerView.VERTICAL, false);
        videoRecyclerView.setLayoutManager(layoutManager);
        videosModels = new ArrayList<>();
        for (int i = 0; i < 10; i ++) {
            String title = "test";
            VideosModel videosModel = new VideosModel();
            videosModel.setName(title);
            videosModels.add(videosModel);
        }
        adapter = new VideoItemAdapter(this, videosModels);
        videoRecyclerView.setAdapter(adapter);

        adapter.setClickListener(new VideoItemAdapter.ItemClickListener() {
            @Override
            public void onChangeButtonStatus(int position, VideosModel model) throws JSONException {
                gotoInputActivity();
            }
        });

        mSwipeRefreshLayout = findViewById(R.id.refresh_layout);
        mSwipeRefreshLayout.setColorSchemeColors(getResources().getColor(R.color.colorPrimary));
        mSwipeRefreshLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                mSwipeRefreshLayout.setRefreshing(false);
            }
        });

    }

    private void gotoInputActivity() {
        Intent intent = new Intent(SelectVideoActivity.this, InputActivity.class);
        startActivity(intent);
    }
}