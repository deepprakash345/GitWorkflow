# Class: Click

<<<<<<< HEAD:packages/forms-next-core/docs/classes/Events.Click.md
[Events](../modules/Events.md).Click

=======
>>>>>>> afd5b1f (CQ-4339307 Fixed code documentation by removing modules):packages/forms-next-core/docs/classes/Click.md
Implementation of `click` event. The event is triggered when user clicks on an element.

## Hierarchy

- `ActionImpl`

  ↳ **`Click`**

## Table of contents

### Constructors

- [constructor](Click.md#constructor)

### Accessors

- [isCustomEvent](Click.md#iscustomevent)
- [metadata](Click.md#metadata)
- [payload](Click.md#payload)
- [target](Click.md#target)
- [type](Click.md#type)

### Methods

- [toJson](Click.md#tojson)
- [toString](Click.md#tostring)

## Constructors

### constructor

• **new Click**(`payload?`, `dispatch?`)

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
