/// <reference types="vite/client" />

// Some module declarations related to vite-imagetools
declare module '*&as=srcset' {
  const srcset: string
  export default srcset
}

declare module '*&format=webp' {
  const src: string
  export default src
}
