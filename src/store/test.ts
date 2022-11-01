import create from 'zustand'

interface SearchState {
  test: string
  setTest: (test: string) => void
}

export const useTestStore = create<SearchState>(set => ({
  test: '',
  setTest: test =>
    set({
      test
    })
}))
