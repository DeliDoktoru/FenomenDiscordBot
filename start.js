const {
	exec
} = require('child_process');

function createProcess() {

	const ls = exec('cd ' + __dirname + ' && node bot');

	ls.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	ls.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	ls.on('close', (code) => {
		createProcess();
		console.log(`child process exited with code ${code}`);
	});

	

}
createProcess();