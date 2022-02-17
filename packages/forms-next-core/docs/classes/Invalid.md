# Class: Invalid

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.Invalid.md
[Events](../modules/Events.md).Invalid

=======
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/Invalid.md
Implementation of `invalid` event. The invalid event is triggered when a Field’s value becomes invalid after a change event or whenever its value property change

## Hierarchy

- `ActionImpl`

  ↳ **`Invalid`**

## Table of contents

### Constructors

- [constructor](Invalid.md#constructor)

### Accessors

- [isCustomEvent](Invalid.md#iscustomevent)
- [metadata](Invalid.md#metadata)
- [payload](Invalid.md#payload)
- [target](Invalid.md#target)
- [type](Invalid.md#type)

### Methods

- [toJson](Invalid.md#tojson)
- [toString](Invalid.md#tostring)

## Constructors

### constructor

• **new Invalid**(`payload?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | `any` |

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
