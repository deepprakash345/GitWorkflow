# Class: CustomEvent

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.CustomEvent.md
[Events](../modules/Events.md).CustomEvent

=======
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/CustomEvent.md
Implementation of `custom event`.

## Hierarchy

- `ActionImpl`

  ↳ **`CustomEvent`**

## Table of contents

### Constructors

- [constructor](CustomEvent.md#constructor)

### Accessors

- [isCustomEvent](CustomEvent.md#iscustomevent)
- [metadata](CustomEvent.md#metadata)
- [payload](CustomEvent.md#payload)
- [target](CustomEvent.md#target)
- [type](CustomEvent.md#type)

### Methods

- [toJson](CustomEvent.md#tojson)
- [toString](CustomEvent.md#tostring)

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

• `get` **target**(): [`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md) \| [`FormModel`](../interfaces/FormModel.md)

#### Returns

[`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md) \| [`FormModel`](../interfaces/FormModel.md)

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
