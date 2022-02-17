# Module: FormModel

Defines generic interface's for form runtime model

## Table of contents

### Interfaces

- [Action](../interfaces/FormModel.Action.md)
- [BaseModel](../interfaces/FormModel.BaseModel.md)
- [ContainerModel](../interfaces/FormModel.ContainerModel.md)
- [FieldModel](../interfaces/FormModel.FieldModel.md)
- [FieldsetModel](../interfaces/FormModel.FieldsetModel.md)
- [FormMetaDataModel](../interfaces/FormModel.FormMetaDataModel.md)
- [FormModel](../interfaces/FormModel.FormModel-1.md)
- [IFileObject](../interfaces/FormModel.IFileObject.md)
- [ScriptableField](../interfaces/FormModel.ScriptableField.md)

### Type aliases

- [State](FormModel.md#state)

## Type aliases

### State

Ƭ **State**<`T`\>: `T` extends [`ContainerJson`](FormJsonTypes.md#containerjson) ? `T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  } : `T` & { `id`: `string`  }

Generic type for a form object state

#### Type parameters

| Name |
| :------ |
| `T` |
