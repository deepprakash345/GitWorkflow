# Class: FieldChanged

[Form](../modules/Form.md).FieldChanged

## Hierarchy

- `ActionImpl`

  ↳ **`FieldChanged`**

## Table of contents

### Constructors

- [constructor](Form.FieldChanged.md#constructor)

### Accessors

- [isCustomEvent](Form.FieldChanged.md#iscustomevent)
- [metadata](Form.FieldChanged.md#metadata)
- [payload](Form.FieldChanged.md#payload)
- [target](Form.FieldChanged.md#target)
- [type](Form.FieldChanged.md#type)

### Methods

- [toJson](Form.FieldChanged.md#tojson)
- [toString](Form.FieldChanged.md#tostring)

## Constructors

### constructor

• **new FieldChanged**(`changes`, `field`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | [`ChangePayload`](../modules/Events.md#changepayload) |
| `field` | [`BaseJson`](../modules/FormJsonTypes.md#basejson) |

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
