import type { RootState as Store } from './store'

// Apparently having selectors defined outside of components is a good practice

export const selectLoggedIn = (store: Store) => Boolean(store.user.id)
export const selectAdministrator = (store: Store) => store.user.administrator
