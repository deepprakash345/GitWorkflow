# Class: CustomEvent

[Events](../modules/Events.md).CustomEvent

Implementation of `custom event`.

## Hierarchy

- `ActionImpl`

  ↳ **`CustomEvent`**

## Table of contents

### Constructors

- [constructor](Events.CustomEvent.md#constructor)

### Accessors

- [isCustomEvent](Events.CustomEvent.md#iscustomevent)
- [metadata](Events.CustomEvent.md#metadata)
- [payload](Events.CustomEvent.md#payload)
- [target](Events.CustomEvent.md#target)
- [type](Events.CustomEvent.md#type)

### Methods

- [toJson](Events.CustomEvent.md#tojson)
- [toString](Events.CustomEvent.md#tostring)

## Constructors

### constructor

• **new CustomEvent**(`eventName`, `payload?`, `dispatch?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `eventName` | `string` | `undefined` |
| `payload` | `any` | `{}` |
| `dispatch` | `boolean` | `false` |

#### Overrides

ActionImpl.constructor

## Accessors

### isCustomEvent

• `get` **isCustomEvent**(): `boolean`

Defines if the event is custom

#### Returns

`boolean`

#### Overrides

ActionImpl.isCustomEvent

___

### metadata

• `get` **metadata**(): `any`

#### Returns

`any`

#### Inherited from

ActionImpl.metadata

___

### payload

• `get` **payload**(): `any`

#### Returns

`any`

#### Inherited from

ActionImpl.payload

___

### target

• `get` **target**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md) \| [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md) \| [`FieldModel`](../interfaces/FormModel.FieldModel.md) \| [`FieldsetModel`](../interfaces/FormModel.FieldsetModel.md)

#### Inherited from

ActionImpl.target

___

### type

• `get` **type**(): `string`

#### Returns

`string`

#### Inherited from

ActionImpl.type

## Methods

### toJson

▸ **toJson**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `isCustomEvent` | `boolean` |
| `payload` | `any` |
| `type` | `string` |

#### Inherited from

ActionImpl.toJson

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Inherited from

ActionImpl.toString
