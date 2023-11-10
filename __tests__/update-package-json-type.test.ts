
jest.mock('fs');
jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

describe('updatePackageJsonType', () => {
    const fs = require('fs')
    const {execSync} = require('child_process')

const bundledPackage = require('../dist/cjs')
const {getCurrentBranch} = bundledPackage;
const updatePackageJsonType = bundledPackage.default;
  const mockReadFileSync = jest.spyOn(fs, 'readFileSync');
  const mockWriteFileSync = jest.spyOn(fs, 'writeFileSync');
  const mockExecSync = execSync as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update the type field to module', () => {
    mockReadFileSync.mockReturnValue(JSON.stringify({ name: 'test-package' }));
    updatePackageJsonType('module');
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      './package.json',
      JSON.stringify({ name: 'test-package', type: 'module' }, null, 2)
    );
  });

  it('should remove the type field', () => {
    mockReadFileSync.mockReturnValue(JSON.stringify({ name: 'test-package', type: 'module' }));
    updatePackageJsonType(undefined, true);
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      './package.json',
      JSON.stringify({ name: 'test-package' }, null, 2)
    );
  });

  it('should remove the type field on a specific branch', () => {
    const currentBranchName = getCurrentBranch();
    console.log(currentBranchName)
    mockReadFileSync.mockReturnValue(JSON.stringify({ name: 'test-package', type: 'module' }));
    mockExecSync.mockReturnValue(currentBranchName);
    updatePackageJsonType(undefined, false, true, currentBranchName);
    expect(mockWriteFileSync).toHaveBeenCalledWith(
      './package.json',
      JSON.stringify({ name: 'test-package' }, null, 2)
    );
  });

  it('should not update package.json if there are no changes', () => {
    mockReadFileSync.mockReturnValue(JSON.stringify({ name: 'test-package', type: 'module' }));
    updatePackageJsonType('module');
    expect(mockWriteFileSync).not.toHaveBeenCalled();
  });

  // Add more tests for other scenarios and error handling
});
