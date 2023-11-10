const { exec, execSync } = require('child_process');

function logCurrentDirectory() {
    let command = process.platform === "win32" ? 'echo %cd%' : 'pwd';
    const currentDir = execSync(command).toString().trim();
    console.log('Current directory:', currentDir);
}

function runCommand(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject({ error, stdout, stderr });
                return;
            }
            resolve(stdout.trim());
        });
    });
}

async function checkAndRelinkPackage(packageName, directories) {
    try {
        console.log(`Checking if '${packageName}' is already linked...`);
        let linkOutput = await runCommand(`yarn link "${packageName}"`);

        if (linkOutput.includes("warning There's already a package called")) {
            console.log(`Package '${packageName}' is already linked. Unlinking and relinking...`);
            await runCommand(`yarn unlink "${packageName}"`);
            linkOutput = await runCommand(`yarn link "${packageName}"`);
        }
        
        console.log(`Package '${packageName}' linked successfully.`);

        for (const dir of directories) {
            console.log(`Linking in directory: ${dir}`);
            const changeDirCommand = process.platform === "win32" ? `cd ${dir} && echo %cd% &&` : `cd ${dir} && pwd &&`;
            await runCommand(`${changeDirCommand} yarn link "${packageName}"`);
        }
    } catch (error) {
        console.error(`An error occurred: ${error}`);
    }
}

const packageName = '@devlander/package-json-helper';
const directories = ['example'];
checkAndRelinkPackage(packageName, directories);
