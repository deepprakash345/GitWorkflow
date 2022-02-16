# Class: AddItem

[Events](../modules/Events.md).AddItem

Implementation of additem event. The event is triggered on a panel to add a new instance of items inside it.

## Hierarchy

- `ActionImpl`

  ↳ **`AddItem`**

## Table of contents

### Constructors

- [constructor](Events.AddItem.md#constructor)

### Accessors

- [isCustomEvent](Events.AddItem.md#iscustomevent)
- [metadata](Events.AddItem.md#metadata)
- [payload](Events.AddItem.md#payload)
- [target](Events.AddItem.md#target)
- [type](Events.AddItem.md#type)

### Methods

- [toJson](Events.AddItem.md#tojson)
- [toString](Events.AddItem.md#tostring)

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
