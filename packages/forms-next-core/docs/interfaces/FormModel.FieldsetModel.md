# Interface: FieldsetModel

[FormModel](../modules/FormModel.md).FieldsetModel

Generic field set model interface.
Defines properties that each field set should have

## Hierarchy

- [`ContainerModel`](FormModel.ContainerModel.md)

- `WithContainerState`<[`FieldsetJson`](../modules/FormJsonTypes.md#fieldsetjson)\>

  ↳ **`FieldsetModel`**

## Implemented by

- [`Fieldset`](../classes/Fieldset.Fieldset-1.md)

## Table of contents

### Properties

- [accept](FormModel.FieldsetModel.md#accept)
- [dataRef](FormModel.FieldsetModel.md#dataref)
- [default](FormModel.FieldsetModel.md#default)
- [description](FormModel.FieldsetModel.md#description)
- [enabled](FormModel.FieldsetModel.md#enabled)
- [enforceEnum](FormModel.FieldsetModel.md#enforceenum)
- [enum](FormModel.FieldsetModel.md#enum)
- [enumNames](FormModel.FieldsetModel.md#enumnames)
- [events](FormModel.FieldsetModel.md#events)
- [expression](FormModel.FieldsetModel.md#expression)
- [format](FormModel.FieldsetModel.md#format)
- [fracDigits](FormModel.FieldsetModel.md#fracdigits)
- [id](FormModel.FieldsetModel.md#id)
- [index](FormModel.FieldsetModel.md#index)
- [isContainer](FormModel.FieldsetModel.md#iscontainer)
- [items](FormModel.FieldsetModel.md#items)
- [label](FormModel.FieldsetModel.md#label)
- [leadDigits](FormModel.FieldsetModel.md#leaddigits)
- [maxFileSize](FormModel.FieldsetModel.md#maxfilesize)
- [maxItems](FormModel.FieldsetModel.md#maxitems)
- [maxLength](FormModel.FieldsetModel.md#maxlength)
- [maximum](FormModel.FieldsetModel.md#maximum)
- [minItems](FormModel.FieldsetModel.md#minitems)
- [minLength](FormModel.FieldsetModel.md#minlength)
- [minimum](FormModel.FieldsetModel.md#minimum)
- [name](FormModel.FieldsetModel.md#name)
- [parent](FormModel.FieldsetModel.md#parent)
- [pattern](FormModel.FieldsetModel.md#pattern)
- [placeholder](FormModel.FieldsetModel.md#placeholder)
- [props](FormModel.FieldsetModel.md#props)
- [readOnly](FormModel.FieldsetModel.md#readonly)
- [required](FormModel.FieldsetModel.md#required)
- [rules](FormModel.FieldsetModel.md#rules)
- [type](FormModel.FieldsetModel.md#type)
- [valid](FormModel.FieldsetModel.md#valid)
- [value](FormModel.FieldsetModel.md#value)
- [viewType](FormModel.FieldsetModel.md#viewtype)
- [visible](FormModel.FieldsetModel.md#visible)

### Methods

- [getState](FormModel.FieldsetModel.md#getstate)
- [indexOf](FormModel.FieldsetModel.md#indexof)

## Properties

### accept

• `Optional` **accept**: `string`[]

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[accept](FormModel.ContainerModel.md#accept)

___

### dataRef

• `Optional` `Readonly` **dataRef**: ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[dataRef](FormModel.ContainerModel.md#dataref)

___

### default

• `Optional` `Readonly` **default**: `any`

Default value of the Field.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[default](FormModel.ContainerModel.md#default)

___

### description

• `Optional` **description**: `string`

Extra description to be shown to the user to aid in form filling experience. It can be rich text.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[description](FormModel.ContainerModel.md#description)

___

### enabled

• `Optional` **enabled**: `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[enabled](FormModel.ContainerModel.md#enabled)

___

### enforceEnum

• `Optional` **enforceEnum**: `boolean`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[enforceEnum](FormModel.ContainerModel.md#enforceenum)

___

### enum

• `Optional` **enum**: `any`[]

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[enum](FormModel.ContainerModel.md#enum)

___

### enumNames

• `Optional` **enumNames**: `string`[]

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[enumNames](FormModel.ContainerModel.md#enumnames)

___

### events

• `Optional` **events**: `Object`

Events is a dictionary of eventName to the actions to perform.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[events](FormModel.ContainerModel.md#events)

___

### expression

• `Optional` **expression**: `string`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[expression](FormModel.ContainerModel.md#expression)

___

### format

• `Optional` **format**: `string`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[format](FormModel.ContainerModel.md#format)

___

### fracDigits

• `Optional` **fracDigits**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[fracDigits](FormModel.ContainerModel.md#fracdigits)

___

### id

• `Readonly` **id**: `string`

Unique id of the form field.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[id](FormModel.ContainerModel.md#id)

___

### index

• `Readonly` **index**: `number`

The index of the Field within its parent.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[index](FormModel.ContainerModel.md#index)

___

### isContainer

• `Readonly` **isContainer**: `boolean`

Whether the form field is container or not

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[isContainer](FormModel.ContainerModel.md#iscontainer)

___

### items

• **items**: ([`FieldModel`](FormModel.FieldModel.md) \| [`FieldsetModel`](FormModel.FieldsetModel.md))[]

Defines the children/items of the container

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[items](FormModel.ContainerModel.md#items)

___

### label

• `Optional` **label**: [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[label](FormModel.ContainerModel.md#label)

___

### leadDigits

• `Optional` **leadDigits**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[leadDigits](FormModel.ContainerModel.md#leaddigits)

___

### maxFileSize

• `Optional` **maxFileSize**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[maxFileSize](FormModel.ContainerModel.md#maxfilesize)

___

### maxItems

• `Optional` **maxItems**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[maxItems](FormModel.ContainerModel.md#maxitems)

___

### maxLength

• `Optional` **maxLength**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[maxLength](FormModel.ContainerModel.md#maxlength)

___

### maximum

• `Optional` **maximum**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[maximum](FormModel.ContainerModel.md#maximum)

___

### minItems

• `Optional` **minItems**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[minItems](FormModel.ContainerModel.md#minitems)

___

### minLength

• `Optional` **minLength**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[minLength](FormModel.ContainerModel.md#minlength)

___

### minimum

• `Optional` **minimum**: `number`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[minimum](FormModel.ContainerModel.md#minimum)

___

### name

• `Optional` `Readonly` **name**: `string`

Name of the form field.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[name](FormModel.ContainerModel.md#name)

___

### parent

• **parent**: [`ContainerModel`](FormModel.ContainerModel.md)

Defines the parent of the container

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[parent](FormModel.ContainerModel.md#parent)

___

### pattern

• `Optional` **pattern**: `string`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[pattern](FormModel.ContainerModel.md#pattern)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder to show on the widget.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[placeholder](FormModel.ContainerModel.md#placeholder)

___

### props

• `Optional` **props**: `Object`

Custom properties of the form field.

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[props](FormModel.ContainerModel.md#props)

___

### readOnly

• `Optional` **readOnly**: `boolean`

Whether the field should be readOnly to end user or not.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[readOnly](FormModel.ContainerModel.md#readonly)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[required](FormModel.ContainerModel.md#required)

___

### rules

• `Optional` **rules**: `Object`

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[rules](FormModel.ContainerModel.md#rules)

___

### type

• `Optional` **type**: ``"object"`` \| ``"array"``

#### Overrides

[ContainerModel](FormModel.ContainerModel.md).[type](FormModel.ContainerModel.md#type)

___

### valid

• `Optional` **valid**: `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[valid](FormModel.ContainerModel.md#valid)

___

### value

• **value**: `any`

The current value of the Field. The property is serialized in the Data Model.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[value](FormModel.ContainerModel.md#value)

___

### viewType

• `Readonly` **viewType**: `string`

Type of widget to show to the user for capturing the data..

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[viewType](FormModel.ContainerModel.md#viewtype)

___

### visible

• `Optional` **visible**: `boolean`

Whether the field should be visible to author or not.

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[visible](FormModel.ContainerModel.md#visible)

## Methods

### getState

▸ **getState**(): `T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Returns

`T` & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Inherited from

WithContainerState.getState

___

### indexOf

▸ **indexOf**(`f`): `number`

Returns the index of the [child item](FormModel.FieldModel.md) or the [child container](FormModel.FieldsetModel.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | [`FieldModel`](FormModel.FieldModel.md) \| [`FieldsetModel`](FormModel.FieldsetModel.md) | child item |

#### Returns

`number`

`index` of the item

#### Inherited from

[ContainerModel](FormModel.ContainerModel.md).[indexOf](FormModel.ContainerModel.md#indexof)
