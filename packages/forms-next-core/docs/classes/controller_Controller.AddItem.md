# Class: AddItem

[controller/Controller](../modules/controller_Controller.md).AddItem

Implementation of additem event. The event is triggered on a panel to add a new instance of items inside it.

## Hierarchy

- `ActionImpl`

  ↳ **`AddItem`**

## Table of contents

### Properties

- [\_type](controller_Controller.AddItem.md#_type)

### Constructors

- [constructor](controller_Controller.AddItem.md#constructor)

### Accessors

- [isCustomEvent](controller_Controller.AddItem.md#iscustomevent)
- [metadata](controller_Controller.AddItem.md#metadata)
- [payload](controller_Controller.AddItem.md#payload)
- [target](controller_Controller.AddItem.md#target)
- [type](controller_Controller.AddItem.md#type)

### Methods

- [payloadToJson](controller_Controller.AddItem.md#payloadtojson)
- [toJson](controller_Controller.AddItem.md#tojson)
- [toString](controller_Controller.AddItem.md#tostring)

## Properties

### \_type

• `Protected` **\_type**: `string`

#### Inherited from

ActionImpl.\_type

## Constructors

### constructor

• **new AddItem**(`payload?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload?` | `number` |

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
