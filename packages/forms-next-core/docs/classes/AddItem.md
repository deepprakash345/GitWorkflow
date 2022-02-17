# Class: AddItem

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.AddItem.md
[Events](../modules/Events.md).AddItem

=======
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/AddItem.md
Implementation of `addItem` event. The event is triggered on a panel to add a new instance of items inside it.

## Hierarchy

- `ActionImpl`

  ↳ **`AddItem`**

## Table of contents

### Constructors

- [constructor](AddItem.md#constructor)

### Accessors

- [isCustomEvent](AddItem.md#iscustomevent)
- [metadata](AddItem.md#metadata)
- [payload](AddItem.md#payload)
- [target](AddItem.md#target)
- [type](AddItem.md#type)

### Methods

- [toJson](AddItem.md#tojson)
- [toString](AddItem.md#tostring)

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
