# Class: Click

[Events](../modules/Events.md).Click

Implementation of click event. The event is triggered when user clicks on an element.

## Hierarchy

- `ActionImpl`

  ↳ **`Click`**

## Table of contents

### Constructors

- [constructor](Events.Click.md#constructor)

### Accessors

- [isCustomEvent](Events.Click.md#iscustomevent)
- [metadata](Events.Click.md#metadata)
- [payload](Events.Click.md#payload)
- [target](Events.Click.md#target)
- [type](Events.Click.md#type)

### Methods

- [toJson](Events.Click.md#tojson)
- [toString](Events.Click.md#tostring)

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
