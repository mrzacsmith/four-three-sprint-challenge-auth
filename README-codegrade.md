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

Weight: 0.9

```bash
NODE_ENV=testing cg-jest run -- project.test.js --runInBand --forceExit
```

#### Checking student tests

Weight: 0.9

```bash
NODE_ENV=testing cg-jest run -- api/server.test.js --runInBand --forceExit
```
