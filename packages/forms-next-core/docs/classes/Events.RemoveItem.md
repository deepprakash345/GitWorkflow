# Class: RemoveItem

[Events](../modules/Events.md).RemoveItem

Implementation of removeitem event. The event is triggered on a panel to remove an instance of items inside it.

## Hierarchy

- `ActionImpl`

  ↳ **`RemoveItem`**

## Table of contents

### Constructors

- [constructor](Events.RemoveItem.md#constructor)

### Accessors

- [isCustomEvent](Events.RemoveItem.md#iscustomevent)
- [metadata](Events.RemoveItem.md#metadata)
- [payload](Events.RemoveItem.md#payload)
- [target](Events.RemoveItem.md#target)
- [type](Events.RemoveItem.md#type)

### Methods

- [toJson](Events.RemoveItem.md#tojson)
- [toString](Events.RemoveItem.md#tostring)

## Constructors

### constructor

• **new RemoveItem**(`payload?`)

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
