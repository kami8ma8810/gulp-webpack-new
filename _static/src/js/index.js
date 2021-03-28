"use strict";

import './myjQuery';

const HOGE = async () => {
	console.log('ホゲホゲ');
};
HOGE();

const init = async () => {
	console.log('this is main js.');
	await asyncFn();
};
// ------------------
// 以下サンブル文
// ------------------
async function asyncFn() {
	console.log([1, 2, 3].includes(0));
	console.log('Im async function.');
}
init();

function sampleResolve(value) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(value * 2);
		}, 5000);
	});
}

function sample() {
	return sampleResolve(5).then(result => {
		return result + 5;
	});
}

sample().then(result => {
	console.log(result); // => 15
});

// テキストを取得
const text = $('#myText').text();
jQuery('#myText')
	.empty() // 一旦、空にする
	.show(); // 表示する

const arr = text.split(''); // 一文字ずつ、配列に格納
const elements = [];

// 一文字ずつ、spanタグで包む
arr.map((str, index) => {
	elements[index] = $(`<span>${str}</span>`);
	$('#myText').append(elements[index]); // 元の場所に挿入
});

// エフェクトの適用
elements.map((element, index) => {
	element.delay(20 * index).queue(function () {
		$(this).addClass('motion');
	});
});