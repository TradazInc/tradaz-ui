// Dummy factories that mimic the TanStack React Query shapes the UI consumes,
// so the app compiles and runs on static data while testing. These replace the
// deleted entity hooks that used to call a real backend.

export function dummyQuery<T>(data: T) {
  return {
    data,
    isLoading: false,
    isPending: false,
    isError: false,
    isSuccess: true,
    error: null as unknown,
    status: "success" as const,
    isFetching: false,
    refetch: async () => ({ data }),
  };
}

export function dummyMutation() {
  return {
    mutateAsync: async (
      _variables?: unknown,
      _options?: unknown,
    ): Promise<unknown> => undefined,
    mutate: (_variables?: unknown, _options?: unknown) => {},
    isPending: false,
    isError: false,
    isSuccess: false,
    error: null as unknown,
    data: undefined as unknown,
    reset: () => {},
    status: "idle" as const,
  };
}
