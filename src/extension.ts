// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jetbrains-ides-keybindings.toggleCase', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			var selection = editor.selection;

			if (selection.isEmpty) {
				const wordRange = document.getWordRangeAtPosition(selection.active);
				if (wordRange) {
					editor.selection = new vscode.Selection(wordRange.start, wordRange.end);
					selection = editor.selection;
				}
			}
			const text = editor.document.getText(selection);

			const newText = text.toUpperCase() === text ? text.toLowerCase() : text.toUpperCase();
			editor.edit(editBuilder => {
				editBuilder.replace(selection, newText);
			});
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
