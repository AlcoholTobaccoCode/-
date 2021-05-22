# Android Studio 打包 h5 app 整理

## 基础代码

``` java
//* MainActivity

package com.example.workapp;//改成你的项目名

//import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
//import android.app.Activity;
import android.view.KeyEvent;
import android.webkit.WebView;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private WebView webview;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //* 实例化WebView对象
        webview = new WebView(this);
        //* 设置WebView属性，能够执行Javascript脚本
        webview.getSettings().setJavaScriptEnabled(true);
        //* 以下代码，加入可支持h5 localstore功能
        webview.getSettings().setDomStorageEnabled(true);
        //* 设置缓冲大小，我设的是8M
        webview.getSettings().setAppCacheMaxSize(1024*1024*8);
        //* 设置缓存目录
        String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath();
        webview.getSettings().setAppCachePath(appCachePath);
        //* 设置 app 可以读取文件缓存(manifest生效)
        webview.getSettings().setAllowFileAccess(true);
        //* 应用可以有缓存
        webview.getSettings().setAppCacheEnabled(true);
        //加载需要显示的网页
        //webview.loadUrl("D://java//index.html");//显示本地网页
//        webview.loadUrl("https://worker.cn.utools.club");//显示远程网页
        webview.loadUrl("http://duqs.cn1.utools.club");//显示远程网页
        //设置Web视图
        setContentView(webview);
    }

    @Override//设置回退
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && webview.canGoBack()) {
            webview.goBack(); //goBack()表示返回WebView的上一页面
            return true;
        }
        return false;
    }
}

```

### 拓展


``` java
//* AndroidManifest.xml

<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.example.workapp">

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar"
        >
 		//* android:theme="@style/Theme.AppCompat.NoActionBar" 取消 navbar
        <activity android:name=".MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
    //* 使应用能够具备访问网络的能力
    //* [具体查看](https://www.jianshu.com/p/75c770e86c7e)
    <uses-permission android:name="android.permission.INTERNET"/>
</manifest>
```

 1. 使用Android Studio自带的矢量图
``` mermaid
graph TB;
res.drawable==>New
New==>vertorAsset
vertorAsset==>新建一个内置xml图标
```
 2. 修改图标
``` mermaid
graph TB;
res.mipmap-anydpi-v26==>ic_launcher
ic_launcher==>background背景
ic_launcher==>foreground图标
```

