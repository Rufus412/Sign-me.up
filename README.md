## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

Update the VITE_BASE_URL variable in .env.production with the full (including http) URL that the website will be hosted at. 

```sh
VITE_BASE_URL=https://path.to.my.root/path/from/root/
```

If that isn't the root, make sure to also add the path from the root as the BASE value in vite.config.js

```sh
export default defineConfig({
  base: '/path/from/root/',
  ...
  ...
})
```
Compile with
```sh
npm run build
```

## Query Parameters

When the website is launched it checks for certain parameters in the url.
* = required
