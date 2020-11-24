# Codegrade

## Setup

### Uploaded fixtures

These files must be re-uploaded to Codegrade whenever we make changes to them:

- `project.test.js`
- `package.json`
- `jest.config.js`
- `knexfile.js`
- `data/dbConfig.js`

### Global setup script to run

```bash
cg-jest install
```

### Per-student setup script to run

```bash
mv $FIXTURES/* . && mv ./dbConfig.js ./data && npm install
```

### Programs to test

```bash
NODE_ENV=testing cg-jest run -- project.test.js --runInBand
```

```bash
NODE_ENV=testing cg-jest run -- api/server.test.js --runInBand
```
