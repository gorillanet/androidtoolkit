# Android GUI Toolkit

adbの面倒くさいところをマウスポチポチでええ感じにするやつ
#### 機能
* 複数端末対応
* ショートカット
  * 設定
  * WIFI
  * 再起動
* ステータス一覧

#### TODO
* パッケージマネージャ
  * 一覧
  * フィルタリング
  * 起動
  * backup
  * pull(base.apk想定)
  * install
* ファイルマネージャ
  * pull/push
  * ファイルマネージャ
* ネットワーク
  * adb reverse
  * プロキシ設定
    * adb shell settings put global http_proxy 192.168.xx.xxx:8888　こんな感じで行けるらしい
  * 機内モード
    * adb shell settings put global airplane_mode_on 1
    * adb shell am broadcast -a android.intent.action.AIRPLANE_MODE
* リモートコントロール
  * scrcpy を起動する
* ADB on the wifi
* Smart Logcat

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run electron:serve
```

### Compiles and minifies for production
```
npm run electron:build
```
