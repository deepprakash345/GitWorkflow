# Interface: ContainerModel

[types/Model](../modules/types_Model.md).ContainerModel

Generic container model interface.
Defines properties that each container should have

## Hierarchy

- [`BaseModel`](types_Model.BaseModel.md)

- [`ScriptableField`](types_Model.ScriptableField.md)

  ↳ **`ContainerModel`**

  ↳↳ [`FieldsetModel`](types_Model.FieldsetModel.md)

  ↳↳ [`FormModel`](types_Model.FormModel.md)

## Implemented by

- [`default`](../classes/Container.default.md)

## Table of contents

### Properties

- [accept](types_Model.ContainerModel.md#accept)
- [dataRef](types_Model.ContainerModel.md#dataref)
- [default](types_Model.ContainerModel.md#default)
- [description](types_Model.ContainerModel.md#description)
- [enabled](types_Model.ContainerModel.md#enabled)
- [enforceEnum](types_Model.ContainerModel.md#enforceenum)
- [enum](types_Model.ContainerModel.md#enum)
- [enumNames](types_Model.ContainerModel.md#enumnames)
- [events](types_Model.ContainerModel.md#events)
- [expression](types_Model.ContainerModel.md#expression)
- [format](types_Model.ContainerModel.md#format)
- [fracDigits](types_Model.ContainerModel.md#fracdigits)
- [id](types_Model.ContainerModel.md#id)
- [index](types_Model.ContainerModel.md#index)
- [isContainer](types_Model.ContainerModel.md#iscontainer)
- [items](types_Model.ContainerModel.md#items)
- [label](types_Model.ContainerModel.md#label)
- [leadDigits](types_Model.ContainerModel.md#leaddigits)
- [maxFileSize](types_Model.ContainerModel.md#maxfilesize)
- [maxItems](types_Model.ContainerModel.md#maxitems)
- [maxLength](types_Model.ContainerModel.md#maxlength)
- [maximum](types_Model.ContainerModel.md#maximum)
- [minItems](types_Model.ContainerModel.md#minitems)
- [minLength](types_Model.ContainerModel.md#minlength)
- [minimum](types_Model.ContainerModel.md#minimum)
- [name](types_Model.ContainerModel.md#name)
- [parent](types_Model.ContainerModel.md#parent)
- [pattern](types_Model.ContainerModel.md#pattern)
- [placeholder](types_Model.ContainerModel.md#placeholder)
- [props](types_Model.ContainerModel.md#props)
- [readOnly](types_Model.ContainerModel.md#readonly)
- [required](types_Model.ContainerModel.md#required)
- [rules](types_Model.ContainerModel.md#rules)
- [type](types_Model.ContainerModel.md#type)
- [valid](types_Model.ContainerModel.md#valid)
- [value](types_Model.ContainerModel.md#value)
- [viewType](types_Model.ContainerModel.md#viewtype)
- [visible](types_Model.ContainerModel.md#visible)

### Methods

- [dispatch](types_Model.ContainerModel.md#dispatch)
- [indexOf](types_Model.ContainerModel.md#indexof)
- [subscribe](types_Model.ContainerModel.md#subscribe)

## Properties

### accept

• `Optional` **accept**: `string`[]

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[accept](types_Model.BaseModel.md#accept)

___

### dataRef

• `Optional` `Readonly` **dataRef**: ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[dataRef](types_Model.BaseModel.md#dataref)

___

### default

• `Optional` `Readonly` **default**: `any`

Default value of the Field.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[default](types_Model.BaseModel.md#default)

___

### description

• `Optional` **description**: `string`

Extra description to be shown to the user to aid in form filling experience. It can be rich text.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[description](types_Model.BaseModel.md#description)

___

### enabled

• `Optional` **enabled**: `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[enabled](types_Model.BaseModel.md#enabled)

___

### enforceEnum

• `Optional` **enforceEnum**: `boolean`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[enforceEnum](types_Model.BaseModel.md#enforceenum)

___

### enum

• `Optional` **enum**: `any`[]

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[enum](types_Model.BaseModel.md#enum)

___

### enumNames

• `Optional` **enumNames**: `string`[]

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[enumNames](types_Model.BaseModel.md#enumnames)

___

### events

• `Optional` **events**: `Object`

Events is a dictionary of eventName to the actions to perform.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ScriptableField](types_Model.ScriptableField.md).[events](types_Model.ScriptableField.md#events)

___

### expression

• `Optional` **expression**: `string`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[expression](types_Model.BaseModel.md#expression)

___

### format

• `Optional` **format**: `string`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[format](types_Model.BaseModel.md#format)

___

### fracDigits

• `Optional` **fracDigits**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[fracDigits](types_Model.BaseModel.md#fracdigits)

___

### id

• `Readonly` **id**: `string`

Unique id of the form field.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[id](types_Model.BaseModel.md#id)

___

### index

• `Readonly` **index**: `number`

The index of the Field within its parent.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[index](types_Model.BaseModel.md#index)

___

### isContainer

• `Readonly` **isContainer**: `boolean`

Whether the form field is container or not

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[isContainer](types_Model.BaseModel.md#iscontainer)

___

### items

• **items**: ([`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md))[]

Array containing Fields or Panels.

#### Overrides

[BaseModel](types_Model.BaseModel.md).[items](types_Model.BaseModel.md#items)

___

### label

• `Optional` **label**: [`Label`](../modules/types_Json.md#label)

Label to be used for the field.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[label](types_Model.BaseModel.md#label)

___

### leadDigits

• `Optional` **leadDigits**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[leadDigits](types_Model.BaseModel.md#leaddigits)

___

### maxFileSize

• `Optional` **maxFileSize**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[maxFileSize](types_Model.BaseModel.md#maxfilesize)

___

### maxItems

• `Optional` **maxItems**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[maxItems](types_Model.BaseModel.md#maxitems)

___

### maxLength

• `Optional` **maxLength**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[maxLength](types_Model.BaseModel.md#maxlength)

___

### maximum

• `Optional` **maximum**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[maximum](types_Model.BaseModel.md#maximum)

___

### minItems

• `Optional` **minItems**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[minItems](types_Model.BaseModel.md#minitems)

___

### minLength

• `Optional` **minLength**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[minLength](types_Model.BaseModel.md#minlength)

___

### minimum

• `Optional` **minimum**: `number`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[minimum](types_Model.BaseModel.md#minimum)

___

### name

• `Optional` `Readonly` **name**: `string`

Name of the form field.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[name](types_Model.BaseModel.md#name)

___

### parent

• **parent**: [`ContainerModel`](types_Model.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Overrides

[BaseModel](types_Model.BaseModel.md).[parent](types_Model.BaseModel.md#parent)

___

### pattern

• `Optional` **pattern**: `string`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[pattern](types_Model.BaseModel.md#pattern)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder to show on the widget.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[placeholder](types_Model.BaseModel.md#placeholder)

___

### props

• `Optional` **props**: `Object`

Custom properties of the form field.

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[props](types_Model.BaseModel.md#props)

___

### readOnly

• `Optional` **readOnly**: `boolean`

Whether the field should be readOnly to end user or not.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[readOnly](types_Model.BaseModel.md#readonly)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[required](types_Model.BaseModel.md#required)

___

### rules

• `Optional` **rules**: `Object`

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ScriptableField](types_Model.ScriptableField.md).[rules](types_Model.ScriptableField.md#rules)

___

### type

• `Optional` **type**: `string`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[type](types_Model.BaseModel.md#type)

___

### valid

• `Optional` **valid**: `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[valid](types_Model.BaseModel.md#valid)

___

### value

• **value**: `any`

The current value of the Field. The property is serialized in the Data Model.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[value](types_Model.BaseModel.md#value)

___

### viewType

• `Readonly` **viewType**: `string`

Type of widget to show to the user for capturing the data..

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[viewType](types_Model.BaseModel.md#viewtype)

___

### visible

• `Optional` **visible**: `boolean`

Whether the field should be visible to author or not.

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[visible](types_Model.BaseModel.md#visible)

## Methods

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[dispatch](types_Model.BaseModel.md#dispatch)

___

### indexOf

▸ **indexOf**(`f`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldModel`](types_Model.FieldModel.md) \| [`FieldsetModel`](types_Model.FieldsetModel.md) |

#### Returns

`number`

___

### subscribe

▸ **subscribe**(`callback`, `eventName?`): `Subscription`

#### Parameters

| Name | Type |
| :------ | :------ |
| `callback` | `callbackFn` |
| `eventName?` | `string` |

#### Returns

`Subscription`

#### Inherited from

[BaseModel](types_Model.BaseModel.md).[subscribe](types_Model.BaseModel.md#subscribe)
