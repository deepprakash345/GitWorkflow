# Class: Change

[Events](../modules/Events.md).Change

Implementation of change event. The change event is triggered on the field whenever the value of the field is changed

## Hierarchy

- `ActionImpl`

  ↳ **`Change`**

## Table of contents

### Constructors

- [constructor](Events.Change.md#constructor)

### Accessors

- [isCustomEvent](Events.Change.md#iscustomevent)
- [metadata](Events.Change.md#metadata)
- [payload](Events.Change.md#payload)
- [target](Events.Change.md#target)
- [type](Events.Change.md#type)

### Methods

- [toJson](Events.Change.md#tojson)
- [toString](Events.Change.md#tostring)

## Constructors

### constructor

• **new Change**(`payload`, `dispatch?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `payload` | [`ChangePayload`](../modules/Events.md#changepayload) | `undefined` |
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
