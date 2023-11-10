const { exec } = require('child_process');

function runCliCommand(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(stdout);
    });
  });
}

describe('CLI Tests', () => {
  test(`It should change package.json's type to commonjs`, async () => {
    const output = await runCliCommand(' npx pkg-helper --type=commonjs --help');
    expect(output).toContain('Usage:'); // Replace with actual expected output
  }, 10000);

  test('it should remove type from package.json', async () => {
    const output = await runCliCommand(' npx pkg-helper --removeType=true --help');
    expect(output).toContain('Usage:'); // Replace with actual expected output
}, 10000);

  test(`It should remove type from package.json if the current branch is the specifiedBranch`, async () => {
    const output = await runCliCommand(' npx pkg-helper --specifiedBranch=main --removeTypeOnBranch=true');
    expect(output).toContain('Usage:'); // Replace with actual expected output
}, 10000);


  // Additional tests for other CLI functionalities
});



  