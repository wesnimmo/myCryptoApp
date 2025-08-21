// app/msw.ts
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    import('../mocks/browser').then(({ worker }) => {
      worker.start({
        onUnhandledRequest: 'bypass',
      });
    });
  }
  