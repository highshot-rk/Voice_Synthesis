package com.ihave.sos.home;

import androidx.annotation.NonNull;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.view.Gravity;
import android.view.MenuItem;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.material.navigation.NavigationView;
import com.ihave.sos.R;
import com.ihave.sos.base.BaseActivity;
import com.ihave.sos.base.BaseFragment;
import com.ihave.sos.fragments.ChangeVoiceFragment;
import com.ihave.sos.fragments.EditProfileFragment;
import com.ihave.sos.fragments.HomeFragment;

public class HomeActivity extends BaseActivity implements NavigationView.OnNavigationItemSelectedListener {

    public Fragment currentFragment;
    NavigationView navigationView;
    ImageView sideTogButton;
    TextView txtTitle;

    @SuppressLint("CutPasteId")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        this.getSupportActionBar().hide();

        thisActivity = this;
        thisContext = this;
        thisView = findViewById(R.id.drawer_layout);

        txtTitle = findViewById(R.id.txtTitle);

        navigationView = findViewById(R.id.nav_view);
        sideTogButton = findViewById(R.id.sideToggleButton);
        sideTogButton.setOnClickListener(v -> {
            DrawerLayout navDrawer = findViewById(R.id.drawer_layout);
            if(!navDrawer.isDrawerOpen(Gravity.LEFT)) navDrawer.openDrawer(Gravity.LEFT);
            else navDrawer.closeDrawer(Gravity.LEFT);
        });
        navigationView.setNavigationItemSelectedListener(this);

        currentFragment = new HomeFragment(this);
        transactFragment(currentFragment);
    }

    @Override
    public boolean onNavigationItemSelected(@NonNull MenuItem item) {

        int id = item.getItemId();
        if (id == R.id.nav_home){
            if(!(getActiveFragment() instanceof HomeFragment)) {
                Fragment newFragment = HomeFragment.newInstance("", "");
                transactFragment(newFragment);
                currentFragment = newFragment;
            }
        }
        else if (id == R.id.nav_edit_profile){
            if(!(getActiveFragment() instanceof EditProfileFragment)) {
                Fragment newFragment = EditProfileFragment.newInstance("", "");
                transactFragment(newFragment);
                currentFragment = newFragment;
            }
        }
        else if (id == R.id.nav_change_voice) {
            if(!(getActiveFragment() instanceof ChangeVoiceFragment)) {
                Fragment newFragment = ChangeVoiceFragment.newInstance("", "");
                transactFragment(newFragment);
                currentFragment = newFragment;
            }
        }
        DrawerLayout drawer = findViewById(R.id.drawer_layout);
        drawer.closeDrawer(Gravity.LEFT);
        for (int i = 0; i < navigationView.getMenu().size(); i++) {
            navigationView.getMenu().getItem(i).setChecked(false);
        }
        return true;
    }

    private Fragment getActiveFragment(){
        Fragment fragment = getSupportFragmentManager().findFragmentById(R.id.main_fragment);
        if(fragment instanceof BaseFragment){
            return fragment;
        }
        return null;
    }

    public void transactFragment(Fragment fragment){
        //replacing the fragment
        if (fragment != null) {
            FragmentTransaction ft = getSupportFragmentManager().beginTransaction();
            ft.replace(R.id.main_fragment, fragment);
            ft.addToBackStack(null);
            ft.detach(fragment).attach(fragment).commitAllowingStateLoss();
        }
    }

    public void setTitle(String title){
        txtTitle.setText(title);
    }
}