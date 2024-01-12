import {
  Lucide,
  RadixUI,
  React,
  ShadcnUI,
  TailwindCSS,
  TailwindUI,
} from './links'

export default function About() {
  return (
    <article className="container prose prose-invert mt-8 lg:prose-xl prose-a:transition-colors">
      <h1>About</h1>
      <p>
        {`
        I've always found space fascinationg, but I feel like astronomy apps
        aren't really as focused on showing information about planets & stars as
        they are on rendering the sky. That's an important task, but sometimes I
        just want something a bit simpler. That's why I created this.
        `}
      </p>
      <h2>Tech Stack</h2>
      <p>
        This app is built with {React}, and styled using {TailwindCSS}. The core
        design is based on {ShadcnUI} & {TailwindUI}. Most icons are from{' '}
        {Lucide}, with a few others from {RadixUI}, which is also used
        under-the-hood in a lot of components.
      </p>
    </article>
  )
}

// For lazy-loading
export const Component = About
