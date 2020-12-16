# Codegrade

## Setup

### Uploaded fixtures

These files must be re-uploaded to Codegrade whenever we make changes to them:

- `project.test.js`
- `jest.config.js`

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

7 points out of 10

```bash
NODE_ENV=testing cg-jest run -- project.test.js --runInBand --forceExit
```

3 points out of 10

#### Checking student tests

```bash
NODE_ENV=testing cg-jest run -- api/server.test.js --runInBand --forceExit
```
