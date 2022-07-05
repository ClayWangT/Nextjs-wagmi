/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (webpackConfig) => {

    webpackConfig.module.rules.forEach((rule) => {
      if (rule.oneOf) {
        // scss module pattern edit, support *.m.scss
        const moduleScssPattern = /\.(module|m).(scss|sass)/
        rule.oneOf.filter(
          (r) =>
            r.test && !r.exclude && new RegExp(r.test).test('*.module.scss'),
        ).forEach(r => {
          r.test = moduleScssPattern;

          Array.isArray(r.use) && r.use.forEach(u => {
            if (u.loader?.includes('css-loader')) {
              // css-loader options.modules.exportLocalsConvention = "camelCase"
              if (u.options?.modules?.exportLocalsConvention) {
                u.options.modules.exportLocalsConvention = "camelCase"
              }
            }
          })
        })
      }
    })
    return webpackConfig
  }
}

module.exports = nextConfig
