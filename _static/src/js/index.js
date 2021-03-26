import './myjQuery';
import 'regenerator-runtime';

const init = async () => {
	console.log('this is main js.');
	await asyncFn();
}
// ------------------
// 以下サンブル文
// ------------------
async function asyncFn() {
	console.log('Im async function.');
}
init();

function sampleResolve(value) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(value * 2);
		}, 5000);
	})
}

function sample() {
	return sampleResolve(5).then(result => {
		return result + 5;
	});
}

sample().then(result => {
	console.log(result); // => 15
});