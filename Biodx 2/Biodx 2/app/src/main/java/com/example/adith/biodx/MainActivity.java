package com.example.adith.biodx;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.BatteryManager;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.hardware.SensorEventListener;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

public class MainActivity extends AppCompatActivity implements SensorEventListener, StepListener, LocationListener {

    EditText editTextAddress, editTextPort;
    Button buttonConnect;
    Button disconnect;
    TextView textViewState, textViewRx;

    UdpClientHandler udpClientHandler;
    UdpClientThread udpClientThread;

    public static Boolean flag;
    private TextView xText, yText, zText, temperature;
    private SensorManager SM;
    private Sensor mySensor;
    private static ArrayList<Double> AccValue = new ArrayList<Double>();
    private static double[] Arr = new double[3];
    private static String blah = null;
    public SensorEvent sensorEvent;

    private StepDetector simpleStepDetector;
    private static final String TEXT_NUM_STEPS = "Number of Steps: ";
    private int numSteps;
    private TextView TvSteps, BtnStart, BtnStop;
    private String t1 = null;
    Button getLocationBtn;
    TextView locationText;
    String latitude;
    String longitude;


    LocationManager locationManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        /*
        senSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
        senAccelerometer = senSensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        senSensorManager.registerListener((SensorEventListener) this, senAccelerometer , SensorManager.SENSOR_DELAY_NORMAL);
        */

        SM = (SensorManager) getSystemService(SENSOR_SERVICE);
        mySensor = SM.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
        SM.registerListener(this, mySensor, SensorManager.SENSOR_DELAY_NORMAL);

        //step sensor
        simpleStepDetector = new StepDetector();
        simpleStepDetector.registerListener((StepListener) this);

        //buttons for steps
        TvSteps = (TextView) findViewById(R.id.tv_steps);
        BtnStart = (Button) findViewById(R.id.btn_start);
        BtnStop = (Button) findViewById(R.id.btn_stop);

        temperature = (TextView) findViewById(R.id.temp);
        t1 = batteryTemperature(this);
        temperature.setText(t1);
        //Assign textviews
        xText = (TextView) findViewById(R.id.xText);
        yText = (TextView) findViewById(R.id.yText);
        zText = (TextView) findViewById(R.id.zText);

        editTextAddress = (EditText) findViewById(R.id.address);
        editTextPort = (EditText) findViewById(R.id.port);
        buttonConnect = (Button) findViewById(R.id.connect);
        disconnect = (Button) findViewById(R.id.disconnect);
        textViewState = (TextView) findViewById(R.id.state);
        textViewRx = (TextView) findViewById(R.id.received);

        //UDP Client
        buttonConnect.setOnClickListener(buttonConnectOnClickListener);
        udpClientHandler = new UdpClientHandler(this);

        disconnect.setOnClickListener(disconnectOnClickListener);

        locationManager = (LocationManager) getSystemService(this.LOCATION_SERVICE);
        getLocationBtn = (Button)findViewById(R.id.getLocationBtn);
        locationText = (TextView)findViewById(R.id.locationText);

        //location

        if (ContextCompat.checkSelfPermission(getApplicationContext(), android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED && ActivityCompat.checkSelfPermission(getApplicationContext(), android.Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED) {

            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.ACCESS_FINE_LOCATION, android.Manifest.permission.ACCESS_COARSE_LOCATION}, 101);

        }


        BtnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getLocation();
            }
        });

        getLocationBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                getLocation();
            }
        });

    }

    public void getLocation() {

        try {
            locationManager = (LocationManager) getSystemService(Context.LOCATION_SERVICE);
            locationManager.requestLocationUpdates(LocationManager.NETWORK_PROVIDER, 5000, 5, this);
        }
        catch(SecurityException e) {
            e.printStackTrace();
        }
    }


    //onCreate end

    public static ArrayList<Double> getAccValue() {
        for (int i = 0; i < Arr.length; i++)
            AccValue.add(Arr[i]);

        return AccValue;
    }

    public static String getSTR() {
        return blah;
    }

    public static Boolean getFlag() {
        return flag;
    }

    public void setFlag() {
        flag = this.flag;
    }

    public void setLatitude(String str) {
       this.latitude = str ;
    }
    public void setLongitude(String str) {
        this.longitude = str;
    }

    public String getLatitude() {
        return latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setAccValue() {
        AccValue = this.AccValue;
    }

    @Override
    public void onSensorChanged(SensorEvent event) {

        // for acc meter
        sensorEvent = event;

        xText.setText("X: " + event.values[0]);
        yText.setText("Y: " + event.values[1]);
        zText.setText("Z: " + event.values[2]);



        blah = Float.toString(event.values[0]) + ", " + Float.toString(event.values[1]) + ", " + Float.toString(event.values[2])
                + ", " + numSteps + ", " + t1 + ", " + getLatitude() + ", " + getLongitude();

        Arr[0] = event.values[0];
        Arr[1] = event.values[1];
        Arr[2] = event.values[2];

        //Arr = event.values;

        //for steps

        if (event.sensor.getType() == Sensor.TYPE_ACCELEROMETER) {
            StepFuction(event);
        }


    }

    void StepFuction(SensorEvent event){
        simpleStepDetector.updateAccel(
                event.timestamp, event.values[0], event.values[1], event.values[2]);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {

    }


    View.OnClickListener buttonConnectOnClickListener =
            new View.OnClickListener() {

                @Override
                public void onClick(View arg0) {

                    UDP();

                    flag = true;

                    buttonConnect.setEnabled(true);
                }
            };

    View.OnClickListener disconnectOnClickListener =
            new View.OnClickListener() {

                @Override
                public void onClick(View arg0) {


                    clientEnd();
                    flag = false;


                }
            };

    public void UDP() {

        udpClientThread = new UdpClientThread(editTextAddress.getText().toString(),
                Integer.parseInt(editTextPort.getText().toString()),
                udpClientHandler);
        udpClientThread.start();

    }

    private void updateState(String state) {
        textViewState.setText(state);
    }

    private void updateRxMsg(String rxmsg) {
        textViewRx.append(rxmsg + "\n");
    }

    private void clientEnd() {
        udpClientThread = null;
        textViewState.setText("clientEnd()");
        buttonConnect.setEnabled(true);

    }

    @Override
    public void step(long timeNs) {
        numSteps++;
        TvSteps.setText(TEXT_NUM_STEPS + numSteps);
    }

    //location stuff
    @Override
    public void onLocationChanged(Location location) {
        locationText.setText("Latitude: " + location.getLatitude() + "\n Longitude: " + location.getLongitude());
        latitude = Double.toString(location.getLatitude());
        longitude = Double.toString(location.getLongitude());
        setLatitude(latitude);
        setLongitude(longitude);
        try {
            Geocoder geocoder = new Geocoder(this, Locale.getDefault());
            List<Address> addresses = geocoder.getFromLocation(location.getLatitude(), location.getLongitude(), 1);
            locationText.setText(locationText.getText() + "\n"+addresses.get(0).getAddressLine(0)+", "+
                    addresses.get(0).getAddressLine(1)+", "+addresses.get(0).getAddressLine(2));
        }catch(Exception e)
        {

        }
    }

    @Override
    public void onStatusChanged(String s, int i, Bundle bundle) {

    }

    @Override
    public void onProviderEnabled(String s) {

    }

    @Override
    public void onProviderDisabled(String s) {
        Toast.makeText(MainActivity.this, "Please Enable GPS and Internet", Toast.LENGTH_SHORT).show();
    }
    //location stuff ends

    public static class UdpClientHandler extends Handler {
        public static final int UPDATE_STATE = 0;
        public static final int UPDATE_MSG = 1;
        public static final int UPDATE_END = 2;
        private MainActivity parent;

        public UdpClientHandler(MainActivity parent) {
            super();
            this.parent = parent;
        }

        @Override
        public void handleMessage(Message msg) {

            switch (msg.what){
                case UPDATE_STATE:
                    parent.updateState((String)msg.obj);
                    break;
                case UPDATE_MSG:
                    parent.updateRxMsg((String)msg.obj);
                    break;
                case UPDATE_END:
                    //parent.clientEnd();
                    break;
                default:
                    super.handleMessage(msg);
            }

        }
    }

    public static String batteryTemperature(Context context)
    {
        Intent intent = context.registerReceiver(null, new IntentFilter(Intent.ACTION_BATTERY_CHANGED));
        float  temp   = ((float) intent.getIntExtra(BatteryManager.EXTRA_TEMPERATURE,0)) / 10;
        return String.valueOf(temp);
    }
}