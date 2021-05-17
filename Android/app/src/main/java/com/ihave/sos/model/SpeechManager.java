package com.ihave.sos.model;

import java.io.Closeable;
import java.io.IOException;

/**
 * Author: Changemyminds.
 * Date: 2018/6/24.
 * Description:
 * Reference:
 */
public abstract class SpeechManager implements Closeable {
    protected SpeechManager mSpeechManger;

    public void setSupervisor(SpeechManager speechManger) {
        mSpeechManger = speechManger;
    }

    public abstract void startSpeak(String text);
    public abstract void stopSpeak();
    public abstract void pause();
    public abstract void resume();

    @Override
    public void close() throws IOException {
        dispose();
    }
    public abstract void dispose();
}
