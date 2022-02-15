# Module: controller/Controller

## Table of contents

### Classes

- [AddItem](../classes/controller_Controller.AddItem.md)
- [Change](../classes/controller_Controller.Change.md)
- [Click](../classes/controller_Controller.Click.md)
- [CustomEvent](../classes/controller_Controller.CustomEvent.md)
- [Initialize](../classes/controller_Controller.Initialize.md)
- [Invalid](../classes/controller_Controller.Invalid.md)
- [RemoveItem](../classes/controller_Controller.RemoveItem.md)
- [Submit](../classes/controller_Controller.Submit.md)
- [Valid](../classes/controller_Controller.Valid.md)

### Type aliases

- [ChangePayload](controller_Controller.md#changepayload)

### Functions

- [propertyChange](controller_Controller.md#propertychange)

## Type aliases

### ChangePayload

Ƭ **ChangePayload**: `Object`

Payload of change event

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `changes` | { `currentValue`: `any` ; `prevValue?`: `any` ; `propertyName`: `string`  }[] | List of changes |

## Functions

### propertyChange

▸ `Const` **propertyChange**(`propertyName`, `currentValue`, `prevValue?`): [`Change`](../classes/controller_Controller.Change.md)

Creates a change event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyName` | `string` | name of the form field property |
| `currentValue` | `any` | current value |
| `prevValue?` | `any` | previous value |

#### Returns

[`Change`](../classes/controller_Controller.Change.md)

[Change](../classes/controller_Controller.Change.md) change event
