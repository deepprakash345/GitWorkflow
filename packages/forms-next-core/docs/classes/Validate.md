# Class: Validate

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.Validate.md
[Events](../modules/Events.md).Validate

=======
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/Validate.md
Implementation of `validate` event. The validate event is triggered on the Form once any field is validated.

## Hierarchy

- `ActionImpl`

  ↳ **`Validate`**

## Table of contents

### Constructors

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.Validate.md
- [constructor](Events.Validate.md#constructor)

### Accessors

- [isCustomEvent](Events.Validate.md#iscustomevent)
- [metadata](Events.Validate.md#metadata)
- [payload](Events.Validate.md#payload)
- [target](Events.Validate.md#target)
- [type](Events.Validate.md#type)

### Methods

- [toJson](Events.Validate.md#tojson)
- [toString](Events.Validate.md#tostring)
=======
- [constructor](Validate.md#constructor)

### Accessors

- [isCustomEvent](Validate.md#iscustomevent)
- [metadata](Validate.md#metadata)
- [payload](Validate.md#payload)
- [target](Validate.md#target)
- [type](Validate.md#type)

### Methods

- [toJson](Validate.md#tojson)
- [toString](Validate.md#tostring)
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/Validate.md

## Constructors

### constructor

• **new Validate**()

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
