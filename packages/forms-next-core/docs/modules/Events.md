# Module: Events

Defines all form events

## Table of contents

### Classes

- [AddItem](../classes/Events.AddItem.md)
- [Change](../classes/Events.Change.md)
- [Click](../classes/Events.Click.md)
- [CustomEvent](../classes/Events.CustomEvent.md)
- [FieldChanged](../classes/Events.FieldChanged.md)
- [Initialize](../classes/Events.Initialize.md)
- [Invalid](../classes/Events.Invalid.md)
- [RemoveItem](../classes/Events.RemoveItem.md)
- [Submit](../classes/Events.Submit.md)
- [Valid](../classes/Events.Valid.md)
- [Validate](../classes/Events.Validate.md)

### Type aliases

- [ChangePayload](Events.md#changepayload)

### Functions

- [propertyChange](Events.md#propertychange)

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

▸ `Const` **propertyChange**(`propertyName`, `currentValue`, `prevValue?`): [`Change`](../classes/Events.Change.md)

Creates a change event

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `propertyName` | `string` | name of the form field property |
| `currentValue` | `any` | current value |
| `prevValue?` | `any` | previous value |

#### Returns

[`Change`](../classes/Events.Change.md)

[Change](../classes/Events.Change.md) change event
