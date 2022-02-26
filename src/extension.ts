import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	vscode.workspace.onDidChangeTextDocument((e) => {
		const contentChanges = e.contentChanges[0];
		if (contentChanges.text !== '<') { return; } // 确认目标字符
		const characterNum = contentChanges.range.start.character;
		if (characterNum === 0) { return; } // 确认不是行首
		const lineNum = contentChanges.range.start.line;
		const positionStart = new vscode.Position(lineNum, characterNum - 1);
		const positionEnd = new vscode.Position(lineNum, characterNum);
		const rangeWanted = new vscode.Range(positionStart, positionEnd);
		const textWanted = e.document.getText(rangeWanted);
		if (textWanted === ' ') { return; } // 确认不是空格

		const editor = vscode.window.activeTextEditor;
		editor?.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(lineNum, characterNum + 1), '>');

			const newCursorPosition = new vscode.Position(lineNum, characterNum + 1);
			setTimeout(() => {
				editor.selection = new vscode.Selection(newCursorPosition, newCursorPosition);
			}, 0);
		});
	});

}

// this method is called when your extension is deactivated
export function deactivate() { }
