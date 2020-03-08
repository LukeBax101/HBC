module.exports = {
    publicPath: '/hbc',
    pwa: {
	name: 'Holiday Bible Club',
	themeColor: '#FF8857',
	appleMobileWebAppCapable: 'yes',
	appleMobileWebAppStatusBarStyle: 'black',
	iconPaths: {
	    favicon32: 'img/icons/hbc-favicon-32x32.png',
	    favicon16: 'img/icons/hbc-favicon-16x16.png',
	    appleTouchIcon: 'img/icons/hbc-apple-touch-icon.png'
        },
	manifestOptions: {
	    short_name: 'HBC',
	    background_color: '#E8A643',
	    icons: [
                {
                    'src': 'img/icons/hbc-android-chrome-192x192.png',
                    'sizes': '192x192',
                    'type': 'image/png',
                },
                {
                    'src': 'img/icons/hbc-android-chrome-512x512.png',
                    'sizes': '512x512',
                    'type': 'image/png',
                }
            ]
	}
    },
    chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'Holiday Bible Club';
        return args;
      });
  }
};
