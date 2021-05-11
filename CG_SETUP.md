# Codegrade

This is the solution repo for `https://github.com/LambdaSchool/web-sprint-challenge-authentication-and-testing`

## Project Setup

1. Run `npm i`
2. Run `npm run migrate`
3. Run `npm run seed`
4. Run `npm run server`
5. Run `npm test`

## Codegrade Setup

### Fixtures

These are the files that Codegrade needs:

1. `codegrade_mvp.test.js`
2. `jest.config.js`

If you make changes to the project or the tests, please go through this checklist:

1. Make sure that all tests are passing in your local.
2. Upload the updated fixtures to your template Codegrade assignment.

### Global setup script to run

```bash
cg-jest install
```

### Per-student setup script to run

```bash
mv $FIXTURES/* . && npm install
```

### Programs to test

#### Checking student code to grade compliance with project specifications

Weight: 0.9

```bash
NODE_ENV=testing cg-jest run -- codegrade_mvp.test.js --runInBand --forceExit
```

#### Checking student tests

Weight: 0.1

```bash
NODE_ENV=testing cg-jest run -- api/server.test.js --runInBand --forceExit
```
