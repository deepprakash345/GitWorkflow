# Class: Submit

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.Submit.md
[Events](../modules/Events.md).Submit

=======
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/Submit.md
Implementation of `submit` event. The submit event is triggered on the Form.
To trigger the submit event, submit function needs to be invoked or one can invoke dispatchEvent API.

## Hierarchy

- `ActionImpl`

  ↳ **`Submit`**

## Table of contents

### Constructors

- [constructor](Submit.md#constructor)

### Accessors

- [isCustomEvent](Submit.md#iscustomevent)
- [metadata](Submit.md#metadata)
- [payload](Submit.md#payload)
- [target](Submit.md#target)
- [type](Submit.md#type)

### Methods

- [toJson](Submit.md#tojson)
- [toString](Submit.md#tostring)

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
