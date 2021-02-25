module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "AndroidToolkit",
        appId: "com.zer0xff.androidtoolkit.app",
        win: {
          icon: 'src/assets/icon.ipng',
          target: [
            {
              target: 'zip', // 'zip', 'nsis', 'portable'
              arch: ['x64'] // 'x64', 'ia32'
            }
          ]
        }
      }
    }
  }
}
