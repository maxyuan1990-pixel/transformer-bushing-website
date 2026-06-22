import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Ds3zbm6S.mjs';
import { manifest } from './manifest_Dbsl_pr1.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/about.astro.mjs');
const _page2 = () => import('./pages/api/contact.astro.mjs');
const _page3 = () => import('./pages/applications/_slug_.astro.mjs');
const _page4 = () => import('./pages/applications.astro.mjs');
const _page5 = () => import('./pages/contact.astro.mjs');
const _page6 = () => import('./pages/downloads.astro.mjs');
const _page7 = () => import('./pages/products/gis-bushing.astro.mjs');
const _page8 = () => import('./pages/products/high-current-bushing.astro.mjs');
const _page9 = () => import('./pages/products/oil-air-bushing.astro.mjs');
const _page10 = () => import('./pages/products/oil-oil-bushing.astro.mjs');
const _page11 = () => import('./pages/products/oil-sf6-bushing.astro.mjs');
const _page12 = () => import('./pages/products/wall-bushing.astro.mjs');
const _page13 = () => import('./pages/products.astro.mjs');
const _page14 = () => import('./pages/thanks.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/about.astro", _page1],
    ["src/pages/api/contact.ts", _page2],
    ["src/pages/applications/[slug].astro", _page3],
    ["src/pages/applications.astro", _page4],
    ["src/pages/contact.astro", _page5],
    ["src/pages/downloads.astro", _page6],
    ["src/pages/products/gis-bushing.astro", _page7],
    ["src/pages/products/high-current-bushing.astro", _page8],
    ["src/pages/products/oil-air-bushing.astro", _page9],
    ["src/pages/products/oil-oil-bushing.astro", _page10],
    ["src/pages/products/oil-sf6-bushing.astro", _page11],
    ["src/pages/products/wall-bushing.astro", _page12],
    ["src/pages/products.astro", _page13],
    ["src/pages/thanks.astro", _page14],
    ["src/pages/index.astro", _page15]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "0b195383-5e18-43f9-836f-69052789f2c0",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
