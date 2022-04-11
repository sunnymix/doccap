import { defineConfig } from 'umi';

const basePath = '/doccap-ui/';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/**', component: '@/pages/index' },
  ],
  fastRefresh: {},
  base: basePath,
  favicon: `${basePath}img/favicon.ico`,
  publicPath: basePath,
  outputPath: `dist${basePath}`,
  devServer: {
    port: 8020,
  }
});
