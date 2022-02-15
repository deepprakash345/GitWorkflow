# Class: Invalid

[controller/Controller](../modules/controller_Controller.md).Invalid

Implementation of invalid event. The invalid event is triggered when a Field’s value becomes invalid after a change event or whenever its value property change

## Hierarchy

- `ActionImpl`

  ↳ **`Invalid`**

## Table of contents

### Properties

- [\_type](controller_Controller.Invalid.md#_type)

### Constructors

- [constructor](controller_Controller.Invalid.md#constructor)

### Accessors

- [isCustomEvent](controller_Controller.Invalid.md#iscustomevent)
- [metadata](controller_Controller.Invalid.md#metadata)
- [payload](controller_Controller.Invalid.md#payload)
- [target](controller_Controller.Invalid.md#target)
- [type](controller_Controller.Invalid.md#type)

### Methods

- [payloadToJson](controller_Controller.Invalid.md#payloadtojson)
- [toJson](controller_Controller.Invalid.md#tojson)
- [toString](controller_Controller.Invalid.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

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

• `get` **target**(): [`FormModel`](../interfaces/types_Model.FormModel.md) \| [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

#### Returns

[`FormModel`](../interfaces/types_Model.FormModel.md) \| [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

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

### payloadToJson

▸ `Protected` **payloadToJson**(): `any`

#### Returns

`any`

#### Inherited from

ActionImpl.payloadToJson

___

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
