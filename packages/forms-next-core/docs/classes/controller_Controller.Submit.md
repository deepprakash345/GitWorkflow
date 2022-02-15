# Class: Submit

[controller/Controller](../modules/controller_Controller.md).Submit

Implementation of submit event. The submit event is triggered on the Form.
To trigger the submit event, submit function needs to be invoked or one can invoke dispatchEvent API.

## Hierarchy

- `ActionImpl`

  ↳ **`Submit`**

## Table of contents

### Properties

- [\_type](controller_Controller.Submit.md#_type)

### Constructors

- [constructor](controller_Controller.Submit.md#constructor)

### Accessors

- [isCustomEvent](controller_Controller.Submit.md#iscustomevent)
- [metadata](controller_Controller.Submit.md#metadata)
- [payload](controller_Controller.Submit.md#payload)
- [target](controller_Controller.Submit.md#target)
- [type](controller_Controller.Submit.md#type)

### Methods

- [payloadToJson](controller_Controller.Submit.md#payloadtojson)
- [toJson](controller_Controller.Submit.md#tojson)
- [toString](controller_Controller.Submit.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

## Constructors

### constructor

• **new Submit**(`payload?`, `dispatch?`)

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
