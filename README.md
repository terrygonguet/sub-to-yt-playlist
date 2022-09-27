# Sub2playlists proof of concept

## Structure

All the interface and data fetching in this extension is done in [Svelte](https://svelte.dev/), built by [vite](https://vitejs.dev/). The source files are in the `ui` directory along with everything needed to build the UI bundle that will end up in `ui/dist/ui.js`.

The other relevant files are in the `scripts/ui` folder. `loader.js` is getting the public url of the 2 other scripts (`index.js` and `ui/dist/ui.js`) and is loading them as ES modules so we can use `import`/`export`. Finally, `index.js` imports the Svelte components and insets the elements in the page.

It's quite involved but it's the cleanest way I found to be able to write sane code for the interface.

## Building

Only the interface, in the `ui` folder, needs a build step. Building requires node 16:

```sh
npm install
npm run build
```

The `ui.js` file is now in the `ui/dist` folder.
