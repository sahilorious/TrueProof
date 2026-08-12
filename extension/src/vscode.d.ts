declare module "vscode" {
  export enum StatusBarAlignment {
    Left = 1,
    Right = 2,
  }

  export class ExtensionContext {
    subscriptions: { dispose(): unknown }[];
  }

  export class StatusBarItem {
    text: string;
    show(): void;
    dispose(): void;
  }

  export const window: {
    activeTextEditor: { document: { uri: { fsPath: string }; getText(): string } } | undefined;
    createStatusBarItem(alignment: StatusBarAlignment, priority?: number): StatusBarItem;
    showWarningMessage(message: string): void;
    showInformationMessage(message: string): void;
  };

  export const commands: {
    registerCommand(
      command: string,
      callback: (...args: unknown[]) => unknown,
    ): { dispose(): unknown };
  };
}
