# Class: Change

[controller/Controller](../modules/controller_Controller.md).Change

Implementation of change event. The change event is triggered on the field whenever the value of the field is changed

## Hierarchy

- `ActionImpl`

  ↳ **`Change`**

## Table of contents

### Properties

- [\_type](controller_Controller.Change.md#_type)

### Constructors

- [constructor](controller_Controller.Change.md#constructor)

### Accessors

- [isCustomEvent](controller_Controller.Change.md#iscustomevent)
- [metadata](controller_Controller.Change.md#metadata)
- [payload](controller_Controller.Change.md#payload)
- [target](controller_Controller.Change.md#target)
- [type](controller_Controller.Change.md#type)

### Methods

- [payloadToJson](controller_Controller.Change.md#payloadtojson)
- [toJson](controller_Controller.Change.md#tojson)
- [toString](controller_Controller.Change.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

## Constructors

### constructor

• **new Change**(`payload`, `dispatch?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`ChangePayload`](../modules/controller_Controller.md#changepayload) | `undefined` |
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
