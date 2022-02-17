# Interface: Action

[FormModel](../modules/FormModel.md).Action

Generic Action/Event interface.
Defines common properties that each action/event should have

## Table of contents

### Properties

- [isCustomEvent](FormModel.Action.md#iscustomevent)
- [metadata](FormModel.Action.md#metadata)
- [originalAction](FormModel.Action.md#originalaction)
- [payload](FormModel.Action.md#payload)
- [target](FormModel.Action.md#target)
- [type](FormModel.Action.md#type)

## Properties

### isCustomEvent

• `Readonly` **isCustomEvent**: `boolean`

Is the event custom

___

### metadata

• **metadata**: `any`

Event metadata.

___

### originalAction

• `Optional` `Readonly` **originalAction**: [`Action`](FormModel.Action.md)

Original event. If the event is dispatched, this refers the original event

___

### payload

• **payload**: `any`

Event payload as defined by the event.

___

### target

• `Readonly` **target**: [`FormModel`](FormModel.FormModel-1.md) \| [`FieldModel`](FormModel.FieldModel.md) \| [`FieldsetModel`](FormModel.FieldsetModel.md)

The field element on which the event is triggered.

___

### type

• **type**: `string`

Name of the event.
