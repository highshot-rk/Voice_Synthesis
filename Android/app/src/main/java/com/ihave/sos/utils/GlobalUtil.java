package com.ihave.sos.utils;

import android.text.TextUtils;
import android.util.Patterns;

import com.ihave.sos.model.VideosModel;

import org.json.JSONArray;
import org.json.JSONObject;

public class GlobalUtil {
    public static JSONObject user;
    public static VideosModel current_video_model;
    public static String[] addressStrings = {
            "香川県",
            "鹿児島",
            "神奈川",
            "高知県",
            "京都府",
            "熊本県",
            "群馬県",
            "岐阜県",
            "長野県",
            "長崎県",
            "奈良県",
            "新潟県",
            "富山県",
            "栃木県",
            "東京都",
            "徳島県",
            "鳥取県",
            "宮城県",
            "宮崎県",
            "三重県",
            "佐賀県",
            "埼玉県",
            "滋賀県",
            "島根県",
            "静岡県",
            "青森県",
            "愛知県",
            "秋田県",
            "山形県",
            "山口県",
            "山梨県",
            "愛媛県",
            "大阪府",
            "大分県",
            "岡山県",
            "沖縄県",
            "和歌山",
            "茨城県",
            "石川県",
            "岩手県",
            "千葉県",
            "北海道",
            "兵庫県",
            "福島県",
            "福岡県",
            "福井県",
            "広島県"
    };

    public static boolean _isTest = true;

    public static String server_api_url = "http://18.191.170.127:8000/api";
    public static String login_url = "/Members/login";
    public static String register_url = "/Members";


    public static String userId = "";


    public static boolean isValidEmail(CharSequence target) {
        return (!TextUtils.isEmpty(target) && Patterns.EMAIL_ADDRESS.matcher(target).matches());
    }
}
