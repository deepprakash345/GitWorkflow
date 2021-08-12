import {FormsRuntime} from '@adobe/forms-next-expression-parser/dist/types/jsonformula';

export class AFRuntime implements FormsRuntime {
    addInstance(): void {
    }

    exportData(): string {
        return '';
    }

    importData(dataRef: string): void {
    }

    invokeFDM(): void {
    }

    removeInstance(): void {
    }

    submitForm(): void {
    }
}

export default new AFRuntime();