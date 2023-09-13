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
\* = required

### Base Mode

* \*RowKey= String
* \*PartitionKey= String
* \*Data= Base64 JSON

```javascript
const *Base64JSON = {
  "firstName": String,
  "phoneNumber": String,
  "tos": String(URL),
  "logoID": String(URL)
}
```

### QR Mode

* \*SignUpFlow=Qr  <--- Enters QR mode
* \*Data= Base64 JSON

```javascript

const Base64JSON = {
  *"itemNumber": String,
  "firstName": String,
  "phoneNumber": String,
  "tos": String(URL),
  "logoID": String(URL)
}
```

### Coupon Mode

* \*coupon = Base64 JSON  <--- Enters coupon mode

const Base64JSON = {
  *"id": String,
  "description": String //(Default: "Coupon Code")
}
```
