# Class: Invalid

[Events](../modules/Events.md).Invalid

Implementation of invalid event. The invalid event is triggered when a Field’s value becomes invalid after a change event or whenever its value property change

## Hierarchy

- `ActionImpl`

  ↳ **`Invalid`**

## Table of contents

### Constructors

- [constructor](Events.Invalid.md#constructor)

### Accessors

- [isCustomEvent](Events.Invalid.md#iscustomevent)
- [metadata](Events.Invalid.md#metadata)
- [payload](Events.Invalid.md#payload)
- [target](Events.Invalid.md#target)
- [type](Events.Invalid.md#type)

### Methods

- [toJson](Events.Invalid.md#tojson)
- [toString](Events.Invalid.md#tostring)

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
