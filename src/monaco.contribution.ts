/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';

// TODO@TypeScript: Force TypeScript to generate AMD module
export var _ = 0;

declare var require:<T>(moduleId:[string], callback:(module:T)=>void)=>void;

interface ILang extends monaco.languages.ILanguageExtensionPoint {
	module: string;
}

interface ILangImpl {
	conf: monaco.languages.IRichLanguageConfiguration;
	language: monaco.languages.IMonarchLanguage;
}

function registerLanguage(def:ILang): void {
	let module = def.module;
	monaco.languages.register(def);
	monaco.languages.onLanguage(def.id, () => {
		require<ILangImpl>([def.module], (mod) => {
			monaco.languages.setMonarchTokensProvider(def.id, mod.language);
			monaco.languages.setLanguageConfiguration(def.id, mod.conf);
		});
	});
}


registerLanguage({
	id: 'bat',
	extensions: [ '.bat', '.cmd'],
	aliases: [ 'Batch', 'bat' ],
	module: './bat'
});
// registerLanguage({
// 	id: 'coffeescript',
// 	extensions: [ '.coffee' ],
// 	aliases: [ 'CoffeeScript', 'coffeescript', 'coffee' ],
// 	mimetypes: ['text/x-coffeescript', 'text/coffeescript'],
// 	module: './coffee'
// });
// registerLanguage({
// 	id: 'c',
// 	extensions: [ '.c', '.h' ],
// 	aliases: [ 'C', 'c' ],
// 	module: './cpp'
// });
// registerLanguage({
// 	id: 'cpp',
// 	extensions: [ '.cpp', '.cc', '.cxx', '.hpp', '.hh', '.hxx' ],
// 	aliases: [ 'C++', 'Cpp', 'cpp'],
// 	module: './cpp'
// });
// registerLanguage({
// 	id: 'csharp',
// 	extensions: [ '.cs', '.csx' ],
// 	aliases: [ 'C#', 'csharp' ],
// 	module: './csharp'
// });
// registerLanguage({
// 	id: 'dockerfile',
// 	extensions: [ '.dockerfile' ],
// 	filenames: [ 'Dockerfile' ],
// 	aliases: [ 'Dockerfile' ],
// 	module: './dockerfile'
// });
// registerLanguage({
// 	id: 'fsharp',
// 	extensions: [ '.fs', '.fsi', '.ml', '.mli', '.fsx', '.fsscript' ],
// 	aliases: [ 'F#', 'FSharp', 'fsharp' ],
// 	module: './fsharp'
// });
// registerLanguage({
// 	id: 'go',
// 	extensions: [ '.go' ],
// 	aliases: [ 'Go' ],
// 	module: './go'
// });
// registerLanguage({
// 	id: 'ini',
// 	extensions: [ '.ini', '.properties', '.gitconfig' ],
// 	filenames: ['config', '.gitattributes', '.gitconfig', '.editorconfig'],
// 	aliases: [ 'Ini', 'ini' ],
// 	module: './ini'
// });
// registerLanguage({
// 	id: 'jade',
// 	extensions: [ '.jade', '.pug' ],
// 	aliases: [ 'Jade', 'jade' ],
// 	module: './jade'
// });
// registerLanguage({
// 	id: 'java',
// 	extensions: [ '.java', '.jav' ],
// 	aliases: [ 'Java', 'java' ],
// 	mimetypes: ['text/x-java-source', 'text/x-java'],
// 	module: './java'
// });
// registerLanguage({
// 	id: 'lua',
// 	extensions: [ '.lua' ],
// 	aliases: [ 'Lua', 'lua' ],
// 	module: './lua'
// });
// registerLanguage({
// 	id: 'objective-c',
// 	extensions: [ '.m' ],
// 	aliases: [ 'Objective-C'],
// 	module: './objective-c'
// });
// registerLanguage({
// 	id: 'powershell',
// 	extensions: [ '.ps1', '.psm1', '.psd1' ],
// 	aliases: [ 'PowerShell', 'powershell', 'ps', 'ps1' ],
// 	module: './powershell'
// });
// registerLanguage({
// 	id: 'python',
// 	extensions: [ '.py', '.rpy', '.pyw', '.cpy', '.gyp', '.gypi' ],
// 	aliases: [ 'Python', 'py' ],
// 	firstLine: '^#!/.*\\bpython[0-9.-]*\\b',
// 	module: './python'
// });
// registerLanguage({
// 	id: 'r',
// 	extensions: [ '.r', '.rhistory', '.rprofile', '.rt' ],
// 	aliases: [ 'R', 'r' ],
// 	module: './r'
// });
// registerLanguage({
// 	id: 'ruby',
// 	extensions: [ '.rb', '.rbx', '.rjs', '.gemspec', '.pp' ],
// 	filenames: [ 'rakefile' ],
// 	aliases: [ 'Ruby', 'rb' ],
// 	module: './ruby'
// });
// registerLanguage({
// 	id: 'swift',
// 	aliases: ['Swift','swift'],
// 	extensions: ['.swift'],
// 	mimetypes: ['text/swift'],
// 	module: './swift'
// });
// registerLanguage({
// 	id: 'sql',
// 	extensions: [ '.sql' ],
// 	aliases: [ 'SQL' ],
// 	module: './sql'
// });
// registerLanguage({
// 	id: 'vb',
// 	extensions: [ '.vb' ],
// 	aliases: [ 'Visual Basic', 'vb' ],
// 	module: './vb'
// });
// registerLanguage({
// 	id: 'xml',
// 	extensions: [ '.xml', '.dtd', '.ascx', '.csproj', '.config', '.wxi', '.wxl', '.wxs', '.xaml', '.svg', '.svgz' ],
// 	firstLine : '(\\<\\?xml.*)|(\\<svg)|(\\<\\!doctype\\s+svg)',
// 	aliases: [ 'XML', 'xml' ],
// 	mimetypes: ['text/xml', 'application/xml', 'application/xaml+xml', 'application/xml-dtd'],
// 	module: './xml'
// });
