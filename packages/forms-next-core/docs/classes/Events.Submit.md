# Class: Submit

[Events](../modules/Events.md).Submit

Implementation of `submit` event. The submit event is triggered on the Form.
To trigger the submit event, submit function needs to be invoked or one can invoke dispatchEvent API.

## Hierarchy

- `ActionImpl`

  ↳ **`Submit`**

## Table of contents

### Constructors

- [constructor](Events.Submit.md#constructor)

### Accessors

- [isCustomEvent](Events.Submit.md#iscustomevent)
- [metadata](Events.Submit.md#metadata)
- [payload](Events.Submit.md#payload)
- [target](Events.Submit.md#target)
- [type](Events.Submit.md#type)

### Methods

- [toJson](Events.Submit.md#tojson)
- [toString](Events.Submit.md#tostring)

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
