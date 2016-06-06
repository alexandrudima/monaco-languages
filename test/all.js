var requirejs = require("requirejs");
var jsdom = require('jsdom-no-contextify');

requirejs.config({
	baseUrl: '',
	paths: {
		'vs': 'node_modules/monaco-editor-core/dev/vs'
	},
	nodeRequire: require
});

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document.queryCommandSupported = function() {};
global.self = global.window = global.document.parentWindow;
global.navigator = global.window.navigator;

requirejs([
	'vs/editor/editor.main'
], function() {
	requirejs([
		'out/test/bat.test'
	], function() {
		run(); // We can launch the tests!
	});
});
