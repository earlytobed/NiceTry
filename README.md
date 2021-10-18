# NiceTry

Yet another Private Tracker frontend, built with Vue 2 + Vuetify.

## Project setup
```
pnpm install
```

### Compiles and hot-reloads for development
```
pnpm run serve
```

### Compiles and minifies for production
```
pnpm run build
```

### Lints and fixes files
```
pnpm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Config

To configure Login API URL, please edit the [`auth.service.js`](./src/services/auth.service.js)

## To-do

- [ ] Require verification code when registering.
- [ ] Better error message for register and login.
- [ ] Fix register page name in side bar.
- [ ] Make the backgroud image configurable.
- [ ] i18n support (at least support Chinese & English).
- [ ] Configure a GitHub bot to upgrade dependencies automatically.
- [ ] Configure lint tool for better code.
- [ ] Design the main page and forum pages.
- [ ] Upgrade to Vue 3 + Vite + Vuetify when possiable.

## FAQ

- Q: Why Vue + Vuetify?
- A: Because I am more familiar with these, if you are a pro with some other tools, then feel free to open a Pull Request.

- Q: Why pnpm?
- A: https://pnpm.io/zh/motivation
