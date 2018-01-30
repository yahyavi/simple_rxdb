# Minimal repo to replicate the RxDB issue

simple test case to replicate the `winningRev is not a function` and `Database has a global failure DOMException: Uncaught exception in event handler` issues.

## Run
``` shell
npm install
npm run build
```

Update: using `pouchdb-adapter-idb: "6.4.1"` (strictly enforce 6.4.1) resolves the issue. It's a webpack-pouchdb problem.
