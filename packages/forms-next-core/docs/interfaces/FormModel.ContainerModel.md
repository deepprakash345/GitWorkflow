# Interface: ContainerModel

[FormModel](../modules/FormModel.md).ContainerModel

Generic container model interface.
Defines properties that each container should have

## Hierarchy

- [`BaseModel`](FormModel.BaseModel.md)

- [`ScriptableField`](FormModel.ScriptableField.md)

  ↳ **`ContainerModel`**

  ↳↳ [`FieldsetModel`](FormModel.FieldsetModel.md)

  ↳↳ [`FormModel`](FormModel.FormModel-1.md)

## Implemented by

- [`default`](../classes/Container.default.md)

## Table of contents

### Properties

- [accept](FormModel.ContainerModel.md#accept)
- [dataRef](FormModel.ContainerModel.md#dataref)
- [default](FormModel.ContainerModel.md#default)
- [description](FormModel.ContainerModel.md#description)
- [enabled](FormModel.ContainerModel.md#enabled)
- [enforceEnum](FormModel.ContainerModel.md#enforceenum)
- [enum](FormModel.ContainerModel.md#enum)
- [enumNames](FormModel.ContainerModel.md#enumnames)
- [events](FormModel.ContainerModel.md#events)
- [expression](FormModel.ContainerModel.md#expression)
- [format](FormModel.ContainerModel.md#format)
- [fracDigits](FormModel.ContainerModel.md#fracdigits)
- [id](FormModel.ContainerModel.md#id)
- [index](FormModel.ContainerModel.md#index)
- [isContainer](FormModel.ContainerModel.md#iscontainer)
- [items](FormModel.ContainerModel.md#items)
- [label](FormModel.ContainerModel.md#label)
- [leadDigits](FormModel.ContainerModel.md#leaddigits)
- [maxFileSize](FormModel.ContainerModel.md#maxfilesize)
- [maxItems](FormModel.ContainerModel.md#maxitems)
- [maxLength](FormModel.ContainerModel.md#maxlength)
- [maximum](FormModel.ContainerModel.md#maximum)
- [minItems](FormModel.ContainerModel.md#minitems)
- [minLength](FormModel.ContainerModel.md#minlength)
- [minimum](FormModel.ContainerModel.md#minimum)
- [name](FormModel.ContainerModel.md#name)
- [parent](FormModel.ContainerModel.md#parent)
- [pattern](FormModel.ContainerModel.md#pattern)
- [placeholder](FormModel.ContainerModel.md#placeholder)
- [props](FormModel.ContainerModel.md#props)
- [readOnly](FormModel.ContainerModel.md#readonly)
- [required](FormModel.ContainerModel.md#required)
- [rules](FormModel.ContainerModel.md#rules)
- [type](FormModel.ContainerModel.md#type)
- [valid](FormModel.ContainerModel.md#valid)
- [value](FormModel.ContainerModel.md#value)
- [viewType](FormModel.ContainerModel.md#viewtype)
- [visible](FormModel.ContainerModel.md#visible)

### Methods

- [indexOf](FormModel.ContainerModel.md#indexof)

## Properties

### accept

• `Optional` **accept**: `string`[]

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[accept](FormModel.BaseModel.md#accept)

___

### dataRef

• `Optional` `Readonly` **dataRef**: ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[dataRef](FormModel.BaseModel.md#dataref)

___

### default

• `Optional` `Readonly` **default**: `any`

Default value of the Field.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[default](FormModel.BaseModel.md#default)

___

### description

• `Optional` **description**: `string`

Extra description to be shown to the user to aid in form filling experience. It can be rich text.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[description](FormModel.BaseModel.md#description)

___

### enabled

• `Optional` **enabled**: `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[enabled](FormModel.BaseModel.md#enabled)

___

### enforceEnum

• `Optional` **enforceEnum**: `boolean`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[enforceEnum](FormModel.BaseModel.md#enforceenum)

___

### enum

• `Optional` **enum**: `any`[]

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[enum](FormModel.BaseModel.md#enum)

___

### enumNames

• `Optional` **enumNames**: `string`[]

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[enumNames](FormModel.BaseModel.md#enumnames)

___

### events

• `Optional` **events**: `Object`

Events is a dictionary of eventName to the actions to perform.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ScriptableField](FormModel.ScriptableField.md).[events](FormModel.ScriptableField.md#events)

___

### expression

• `Optional` **expression**: `string`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[expression](FormModel.BaseModel.md#expression)

___

### format

• `Optional` **format**: `string`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[format](FormModel.BaseModel.md#format)

___

### fracDigits

• `Optional` **fracDigits**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[fracDigits](FormModel.BaseModel.md#fracdigits)

___

### id

• `Readonly` **id**: `string`

Unique id of the form field.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[id](FormModel.BaseModel.md#id)

___

### index

• `Readonly` **index**: `number`

The index of the Field within its parent.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[index](FormModel.BaseModel.md#index)

___

### isContainer

• `Readonly` **isContainer**: `boolean`

Whether the form field is container or not

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[isContainer](FormModel.BaseModel.md#iscontainer)

___

### items

• **items**: ([`FieldModel`](FormModel.FieldModel.md) \| [`FieldsetModel`](FormModel.FieldsetModel.md))[]

Defines the children/items of the container

#### Overrides

[BaseModel](FormModel.BaseModel.md).[items](FormModel.BaseModel.md#items)

___

### label

• `Optional` **label**: [`Label`](../modules/FormJsonTypes.md#label)

Label to be used for the field.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[label](FormModel.BaseModel.md#label)

___

### leadDigits

• `Optional` **leadDigits**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[leadDigits](FormModel.BaseModel.md#leaddigits)

___

### maxFileSize

• `Optional` **maxFileSize**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[maxFileSize](FormModel.BaseModel.md#maxfilesize)

___

### maxItems

• `Optional` **maxItems**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[maxItems](FormModel.BaseModel.md#maxitems)

___

### maxLength

• `Optional` **maxLength**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[maxLength](FormModel.BaseModel.md#maxlength)

___

### maximum

• `Optional` **maximum**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[maximum](FormModel.BaseModel.md#maximum)

___

### minItems

• `Optional` **minItems**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[minItems](FormModel.BaseModel.md#minitems)

___

### minLength

• `Optional` **minLength**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[minLength](FormModel.BaseModel.md#minlength)

___

### minimum

• `Optional` **minimum**: `number`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[minimum](FormModel.BaseModel.md#minimum)

___

### name

• `Optional` `Readonly` **name**: `string`

Name of the form field.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[name](FormModel.BaseModel.md#name)

___

### parent

• **parent**: [`ContainerModel`](FormModel.ContainerModel.md)

Defines the parent of the container

#### Overrides

[BaseModel](FormModel.BaseModel.md).[parent](FormModel.BaseModel.md#parent)

___

### pattern

• `Optional` **pattern**: `string`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[pattern](FormModel.BaseModel.md#pattern)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder to show on the widget.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[placeholder](FormModel.BaseModel.md#placeholder)

___

### props

• `Optional` **props**: `Object`

Custom properties of the form field.

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[props](FormModel.BaseModel.md#props)

___

### readOnly

• `Optional` **readOnly**: `boolean`

Whether the field should be readOnly to end user or not.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[readOnly](FormModel.BaseModel.md#readonly)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[required](FormModel.BaseModel.md#required)

___

### rules

• `Optional` **rules**: `Object`

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ScriptableField](FormModel.ScriptableField.md).[rules](FormModel.ScriptableField.md#rules)

___

### type

• `Optional` **type**: `string`

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[type](FormModel.BaseModel.md#type)

___

### valid

• `Optional` **valid**: `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[valid](FormModel.BaseModel.md#valid)

___

### value

• **value**: `any`

The current value of the Field. The property is serialized in the Data Model.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[value](FormModel.BaseModel.md#value)

___

### viewType

• `Readonly` **viewType**: `string`

Type of widget to show to the user for capturing the data..

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[viewType](FormModel.BaseModel.md#viewtype)

___

### visible

• `Optional` **visible**: `boolean`

Whether the field should be visible to author or not.

#### Inherited from

[BaseModel](FormModel.BaseModel.md).[visible](FormModel.BaseModel.md#visible)

## Methods

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
