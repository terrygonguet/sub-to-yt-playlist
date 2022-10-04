# Subscribe to YouTube Playlists

Easily check your added playlists for new videos!

## Structure

All the interface and data fetching in this extension is done in [Svelte](https://svelte.dev/), built by [vite](https://vitejs.dev/). The source files are in the `ui` directory along with everything needed to build the UI bundle.

The other relevant files are in the `scripts` folder. `loader.js` is getting the public url of the 2 other scripts (`index.js` and `ui.js`) and is loading them as ES modules so we can use `import`/`export`. Finally, `index.js` imports the Svelte components and insets the elements in the page.

It's quite involved but it's the cleanest way I found to be able to write sane code for the interface.

## Building

Building requires node 16 and the build script uses [zx](https://www.npmjs.com/package/zx):

```sh
zx build.mjs
# or
chmod +x ./build.mjs
./build.mjs
```

Use the `-v` or `--verbose` flag to turn on detailed logging.

Use the `-s` or `--skip-build` flag to skip building the UI bundle and only package the extension.

Use the `--mv2` and `--mv3` flags to build only for manifest V2 or V3 respectively.

The `dist` folder now contains all the extension files.
