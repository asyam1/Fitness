package com.example.adith.biodx;

/**
 * Created by Adith on 2018-03-08.
 */

import android.os.Message;
import android.support.annotation.MainThread;

import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.concurrent.TimeUnit;

public class UdpClientThread extends Thread {

    String dstAddress;
    int dstPort;
    private boolean running;
    MainActivity.UdpClientHandler handler;

    DatagramSocket socket;
    InetAddress address;

    public UdpClientThread(String addr, int port, MainActivity.UdpClientHandler handler) {
        super();
        dstAddress = addr;
        dstPort = port;
        this.handler = handler;
    }

    public void setRunning(boolean running){
        this.running = running;
    }

    private void sendState(String state){
        handler.sendMessage(Message.obtain(handler, MainActivity.UdpClientHandler.UPDATE_STATE, state));
    }

    @Override
    public void run() {
        sendState("connecting...");

        running = true;

        try {
            sendState("inside try");
            socket = new DatagramSocket();
            address = InetAddress.getByName(dstAddress);

            //int size = acc.length();
            String temp[] = new String[10000];

            // send request


                Boolean Flag = MainActivity.getFlag();

            String complete = null;

                while(Flag) {

                        sendState("inside for loop");
                        String acc = new String();
                        acc = MainActivity.getSTR();
                        Flag = MainActivity.getFlag();
                        acc = MainActivity.getSTR();
                        byte[] buf = acc.getBytes();

                        DatagramPacket packet = new DatagramPacket(buf, buf.length, address, dstPort);
                        socket.send(packet);
                        sendState("connected");

                        TimeUnit.MILLISECONDS.sleep(50);




                }



            // get response
           /*
            packet = new DatagramPacket(buf, buf.length);



            socket.receive(packet);
            String line = new String(packet.getData(), 0, packet.getLength());

            handler.sendMessage(
                    Message.obtain(handler, MainActivity.UdpClientHandler.UPDATE_MSG, line));
            */
        } catch (SocketException e) {
            e.printStackTrace();
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            if(socket != null){
                socket.close();
                handler.sendEmptyMessage(MainActivity.UdpClientHandler.UPDATE_END);
            }
        }

    }
}
