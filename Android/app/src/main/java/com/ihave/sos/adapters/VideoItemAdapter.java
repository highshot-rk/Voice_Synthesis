package com.ihave.sos.adapters;

import android.content.Context;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.ihave.sos.R;
import com.ihave.sos.model.VideosModel;
import com.ihave.sos.utils.GlobalUtil;

import org.json.JSONException;

import java.util.List;


public class VideoItemAdapter extends RecyclerView.Adapter<VideoItemAdapter.ViewHolder> {
    private List<VideosModel> mData;
    private LayoutInflater mInflater;
    private ItemClickListener mClickListener;
    int row_index = -1;

    // data is passed into the constructor
    public VideoItemAdapter(Context context, List<VideosModel> data) {
        this.mInflater = LayoutInflater.from(context);
        this.mData = data;
    }

    // inflates the row layout from xml when needed
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = mInflater.inflate(R.layout.item_video, parent, false);
        return new ViewHolder(view);
    }
    // binds the data to the TextView in each row
    @Override
    public void onBindViewHolder(ViewHolder holder, int position) {
        VideosModel item = mData.get(position);

        try {

            holder.layContainer.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    row_index = position;
                    notifyDataSetChanged();
                    if (mClickListener != null) {
                        try {
                            mClickListener.onChangeButtonStatus(position, mData.get(position));
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }
            });
            if(row_index ==position){
                holder.layContainer.setBackgroundColor(Color.parseColor("#68B42D"));
                GlobalUtil.current_video_model = mData.get(position);
            }
            else
            {
                holder.layContainer.setBackgroundColor(Color.parseColor("#ffffff"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // total number of rows
    @Override
    public int getItemCount() {
        return mData.size();
    }


    // stores and recycles views as they are scrolled off screen
    public class ViewHolder extends RecyclerView.ViewHolder {
        CardView cardView;
        RelativeLayout layContainer;
        TextView txtVideoName;

        ViewHolder(View itemView) {
            super(itemView);
            cardView = itemView.findViewById(R.id.cardView);
            layContainer = itemView.findViewById(R.id.layContainer);
            txtVideoName = itemView.findViewById(R.id.txtVideoName);
            layContainer.setOnClickListener(v -> {
            });

        }
    }
    // convenience method for getting data at click position
    VideosModel getItem(int id) {
        return mData.get(id);
    }
    // allows clicks events to be caught
    public void setClickListener(ItemClickListener itemClickListener) {
        this.mClickListener = itemClickListener;
    }
    // parent activity will implement this method to respond to click events
    public interface ItemClickListener {
        void onChangeButtonStatus(int position, VideosModel model) throws JSONException;
    }
}