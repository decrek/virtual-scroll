# virtual-scroll

An attempt to build a performant and flexible virtual scroller in Vue.

Inspired by [Build your own Virtual Scroller by Adam Klein](https://dev.to/adamklein/build-your-own-virtual-scroll-part-i-11ib).

## Why?!

Because everybody wants infinity scrolling, but it sucks from a development and ux perspective. All implementations I found of infinite scrolling screw up performance, scroll position and accessibility. How hard can it be? Well I will find out the hard way by building one myself.

This project is a success if the example is:

- Performant, don't bloat the DOM and run at 60fps.
- Maintain scroll position over page navigations, so when you move to a detail page and back you are **exactly** where you stopped scrolling, without the page jumping all over the place.
- Accessible, maintain focus state. Describe the infinite scrolling list.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
