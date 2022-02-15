# Class: Initialize

[controller/Controller](../modules/controller_Controller.md).Initialize

Implementation of initialize event. The event is triggered on all the fields when the form initialisation is complete

## Hierarchy

- `ActionImpl`

  ↳ **`Initialize`**

## Table of contents

### Properties

- [\_type](controller_Controller.Initialize.md#_type)

### Constructors

- [constructor](controller_Controller.Initialize.md#constructor)

### Accessors

- [isCustomEvent](controller_Controller.Initialize.md#iscustomevent)
- [metadata](controller_Controller.Initialize.md#metadata)
- [payload](controller_Controller.Initialize.md#payload)
- [target](controller_Controller.Initialize.md#target)
- [type](controller_Controller.Initialize.md#type)

### Methods

- [payloadToJson](controller_Controller.Initialize.md#payloadtojson)
- [toJson](controller_Controller.Initialize.md#tojson)
- [toString](controller_Controller.Initialize.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

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
