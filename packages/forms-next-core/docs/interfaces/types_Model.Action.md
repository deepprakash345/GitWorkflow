# Interface: Action

[types/Model](../modules/types_Model.md).Action

Generic Action/Event interface.
Defines common properties that each action/event should have

## Table of contents

### Properties

- [isCustomEvent](types_Model.Action.md#iscustomevent)
- [metadata](types_Model.Action.md#metadata)
- [originalAction](types_Model.Action.md#originalaction)
- [payload](types_Model.Action.md#payload)
- [target](types_Model.Action.md#target)
- [type](types_Model.Action.md#type)

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

• `Optional` `Readonly` **originalAction**: [`Action`](types_Model.Action.md)

Original event. If the event is dispatched, this refers the original event

___

### payload

• **payload**: `any`

Event payload as defined by the event.

___

### target

• `Readonly` **target**: [`FormModel`](types_Model.FormModel.md) \| [`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md)

The field element on which the event is triggered.

___

### type

• **type**: `string`

Name of the event.
