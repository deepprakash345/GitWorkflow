# Class: CustomEvent

[controller/Controller](../modules/controller_Controller.md).CustomEvent

Implementation of custom event.

## Hierarchy

- `ActionImpl`

  ↳ **`CustomEvent`**

## Table of contents

### Properties

- [\_type](controller_Controller.CustomEvent.md#_type)

### Constructors

- [constructor](controller_Controller.CustomEvent.md#constructor)

### Accessors

- [isCustomEvent](controller_Controller.CustomEvent.md#iscustomevent)
- [metadata](controller_Controller.CustomEvent.md#metadata)
- [payload](controller_Controller.CustomEvent.md#payload)
- [target](controller_Controller.CustomEvent.md#target)
- [type](controller_Controller.CustomEvent.md#type)

### Methods

- [payloadToJson](controller_Controller.CustomEvent.md#payloadtojson)
- [toJson](controller_Controller.CustomEvent.md#tojson)
- [toString](controller_Controller.CustomEvent.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

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
