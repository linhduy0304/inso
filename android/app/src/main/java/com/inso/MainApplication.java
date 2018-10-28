package com.inso;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.github.xfumihiro.react_native_image_to_base64.ImageToBase64Package;
import org.reactnative.camera.RNCameraPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import io.underscope.react.fbak.RNAccountKitPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ImageToBase64Package(),
            new RNCameraPackage(),
            new ImageResizerPackage(),
            new RNAccountKitPackage(),
            new RNDeviceInfo(),
            new SvgPackage(),
            new LinearGradientPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
