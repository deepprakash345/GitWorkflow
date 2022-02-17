# Class: Initialize

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.Initialize.md
[Events](../modules/Events.md).Initialize

=======
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/Initialize.md
Implementation of `initialize` event. The event is triggered on all the fields when the form initialisation is complete

## Hierarchy

- `ActionImpl`

  ↳ **`Initialize`**

## Table of contents

### Constructors

- [constructor](Initialize.md#constructor)

### Accessors

- [isCustomEvent](Initialize.md#iscustomevent)
- [metadata](Initialize.md#metadata)
- [payload](Initialize.md#payload)
- [target](Initialize.md#target)
- [type](Initialize.md#type)

### Methods

- [toJson](Initialize.md#tojson)
- [toString](Initialize.md#tostring)

## Constructors

### constructor

• **new Initialize**(`payload?`, `dispatch?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload?` | `any` | `undefined` |
| `dispatch` | `boolean` | `false` |

#### Overrides

ActionImpl.constructor

## Accessors

### isCustomEvent

• `get` **isCustomEvent**(): `boolean`

#### Returns

`boolean`

#### Inherited from

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
