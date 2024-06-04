const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
    .postCss('resources/css/app.css', 'public/css', [
        
    ]);
    mix.copyDirectory('resources/assets/svg', 'public/assets/svg');

    mix.webpackConfig({
        module: {
            rules: [
                {
                    test: /\.svg$/,
                    use: ['svgo-loader'],
                },
            ],
        },
    });
    