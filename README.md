# Android GUI Toolkit

adbの面倒くさいところをマウスポチポチでええ感じにするやつ
#### 機能
* 複数端末対応
* ショートカット
  * 設定
  * WIFI
  * 再起動
* ステータス一覧
* パッケージマネージャ
  * 一覧
  * install
* ファイルマネージャ
  * pull/push
* リモートコントロール
  * scrcpy を起動する
* ネットワーク
  * adb reverse
  * adb forward
  * プロキシ設定
* その他
  * 統合ADB/ 統合SCRCPY
  * スクリーンショット

#### TODO
* パッケージマネージャ
  * フィルタリング
  * 起動
  * backup
  * pull(base.apk想定)
* ファイルマネージャ
  * ファイルマネージャ
  * 機内モード
    * adb shell settings put global airplane_mode_on 1
    * adb shell am broadcast -a android.intent.action.AIRPLANE_MODE
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
