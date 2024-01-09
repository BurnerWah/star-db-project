# Project structure info

- The root folder contains the entry point, global CSS files, and the vite env `d.ts` file needed for correct type inference.
- `assets` - static assets, mostly images.
- `components` - Components that are able to be used in a lot of places
- `components/forms` - Form components
- `components/ui` - [shadcn/ui](https://ui.shadcn.com/) components
- `constants` - Values that would show up in a lot of places
- `hooks` - Custom hooks, namely typed redux hooks
- `pages` - Pages that are used by the router
- `layouts` - Somewhere in-between `pages` and `components`. These are full page structures that can be reused.
- `lib` - Utility functions
- `redux` - Redux store, reducers, actions, and saga functions
