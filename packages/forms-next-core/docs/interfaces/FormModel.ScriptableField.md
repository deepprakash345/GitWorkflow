# Interface: ScriptableField

[FormModel](../modules/FormModel.md).ScriptableField

Generic Scriptable field interface. All non-transparent fields which support rule/events
should implement this interface

## Hierarchy

- **`ScriptableField`**

  ↳ [`FieldModel`](FormModel.FieldModel.md)

  ↳ [`ContainerModel`](FormModel.ContainerModel.md)

## Implemented by

- [`default`](../classes/Scriptable.default.md)

## Table of contents

### Properties

- [events](FormModel.ScriptableField.md#events)
- [rules](FormModel.ScriptableField.md#rules)

## Properties

### events

• `Optional` **events**: `Object`

Events is a dictionary of eventName to the actions to perform.

#### Index signature

▪ [key: `string`]: `string`

___

### rules

• `Optional` **rules**: `Object`

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Index signature

▪ [key: `string`]: `string`
