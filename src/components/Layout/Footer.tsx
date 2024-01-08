// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

export default function Footer() {
  return (
    <footer className="mt-20 p-5 text-center">&copy; Jaden Pleasants</footer>
  )
}
