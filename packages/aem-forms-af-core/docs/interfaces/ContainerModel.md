# Interface: ContainerModel

Generic container model interface.
Defines properties that each container should have

## Hierarchy

- [`BaseModel`](BaseModel.md)

- [`ScriptableField`](ScriptableField.md)

  ↳ **`ContainerModel`**

  ↳↳ [`FieldsetModel`](FieldsetModel.md)

  ↳↳ [`FormModel`](FormModel.md)

## Implemented by

- [`Container`](../classes/Container.md)

## Table of contents

### Properties

- [:type](ContainerModel.md#:type)
- [accept](ContainerModel.md#accept)
- [dataRef](ContainerModel.md#dataref)
- [default](ContainerModel.md#default)
- [description](ContainerModel.md#description)
- [enabled](ContainerModel.md#enabled)
- [enforceEnum](ContainerModel.md#enforceenum)
- [enum](ContainerModel.md#enum)
- [enumNames](ContainerModel.md#enumnames)
- [events](ContainerModel.md#events)
- [exclusiveMaximum](ContainerModel.md#exclusivemaximum)
- [exclusiveMinimum](ContainerModel.md#exclusiveminimum)
- [fieldType](ContainerModel.md#fieldtype)
- [format](ContainerModel.md#format)
- [id](ContainerModel.md#id)
- [index](ContainerModel.md#index)
- [isContainer](ContainerModel.md#iscontainer)
- [items](ContainerModel.md#items)
- [label](ContainerModel.md#label)
- [maxFileSize](ContainerModel.md#maxfilesize)
- [maxItems](ContainerModel.md#maxitems)
- [maxLength](ContainerModel.md#maxlength)
- [maximum](ContainerModel.md#maximum)
- [minItems](ContainerModel.md#minitems)
- [minLength](ContainerModel.md#minlength)
- [minimum](ContainerModel.md#minimum)
- [name](ContainerModel.md#name)
- [parent](ContainerModel.md#parent)
- [pattern](ContainerModel.md#pattern)
- [placeholder](ContainerModel.md#placeholder)
- [properties](ContainerModel.md#properties)
- [readOnly](ContainerModel.md#readonly)
- [required](ContainerModel.md#required)
- [rules](ContainerModel.md#rules)
- [step](ContainerModel.md#step)
- [type](ContainerModel.md#type)
- [valid](ContainerModel.md#valid)
- [validationExpression](ContainerModel.md#validationexpression)
- [value](ContainerModel.md#value)
- [visible](ContainerModel.md#visible)

### Methods

- [indexOf](ContainerModel.md#indexof)
- [validate](ContainerModel.md#validate)

## Properties

### :type

• `Readonly` **:type**: `string`

Custom widget type show to the user for capturing the data.

#### Inherited from

[BaseModel](BaseModel.md).[:type](BaseModel.md#:type)

___

### accept

• `Optional` **accept**: `string`[]

#### Inherited from

[BaseModel](BaseModel.md).[accept](BaseModel.md#accept)

___

### dataRef

• `Optional` `Readonly` **dataRef**: ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Inherited from

[BaseModel](BaseModel.md).[dataRef](BaseModel.md#dataref)

___

### default

• `Optional` `Readonly` **default**: `any`

Default value of the Field.

#### Inherited from

[BaseModel](BaseModel.md).[default](BaseModel.md#default)

___

### description

• `Optional` **description**: `string`

Extra description to be shown to the user to aid in form filling experience. It can be rich text.

#### Inherited from

[BaseModel](BaseModel.md).[description](BaseModel.md#description)

___

### enabled

• `Optional` **enabled**: `boolean`

Whether the field is enabled and takes part in rules, events etc.

#### Inherited from

[BaseModel](BaseModel.md).[enabled](BaseModel.md#enabled)

___

### enforceEnum

• `Optional` **enforceEnum**: `boolean`

#### Inherited from

[BaseModel](BaseModel.md).[enforceEnum](BaseModel.md#enforceenum)

___

### enum

• `Optional` **enum**: `any`[]

#### Inherited from

[BaseModel](BaseModel.md).[enum](BaseModel.md#enum)

___

### enumNames

• `Optional` **enumNames**: `string`[]

#### Inherited from

[BaseModel](BaseModel.md).[enumNames](BaseModel.md#enumnames)

___

### events

• `Optional` **events**: `Object`

Events is a dictionary of eventName to the actions to perform.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ScriptableField](ScriptableField.md).[events](ScriptableField.md#events)

___

### exclusiveMaximum

• `Optional` **exclusiveMaximum**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[exclusiveMaximum](BaseModel.md#exclusivemaximum)

___

### exclusiveMinimum

• `Optional` **exclusiveMinimum**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[exclusiveMinimum](BaseModel.md#exclusiveminimum)

___

### fieldType

• `Readonly` **fieldType**: `string`

Type of field to capture the user data.

#### Inherited from

[BaseModel](BaseModel.md).[fieldType](BaseModel.md#fieldtype)

___

### format

• `Optional` **format**: `string`

#### Inherited from

[BaseModel](BaseModel.md).[format](BaseModel.md#format)

___

### id

• `Readonly` **id**: `string`

Unique id of the form field.

#### Inherited from

[BaseModel](BaseModel.md).[id](BaseModel.md#id)

___

### index

• `Readonly` **index**: `number`

The index of the Field within its parent.

#### Inherited from

[BaseModel](BaseModel.md).[index](BaseModel.md#index)

___

### isContainer

• `Readonly` **isContainer**: `boolean`

Whether the form field is container or not

#### Inherited from

[BaseModel](BaseModel.md).[isContainer](BaseModel.md#iscontainer)

___

### items

• **items**: ([`FieldsetModel`](FieldsetModel.md) \| [`FieldModel`](FieldModel.md))[]

Defines the children/items of the container

#### Overrides

[BaseModel](BaseModel.md).[items](BaseModel.md#items)

___

### label

• `Optional` **label**: [`Label`](../README.md#label)

Label to be used for the field.

#### Inherited from

[BaseModel](BaseModel.md).[label](BaseModel.md#label)

___

### maxFileSize

• `Optional` **maxFileSize**: `string` \| `number`

#### Inherited from

[BaseModel](BaseModel.md).[maxFileSize](BaseModel.md#maxfilesize)

___

### maxItems

• `Optional` **maxItems**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[maxItems](BaseModel.md#maxitems)

___

### maxLength

• `Optional` **maxLength**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[maxLength](BaseModel.md#maxlength)

___

### maximum

• `Optional` **maximum**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[maximum](BaseModel.md#maximum)

___

### minItems

• `Optional` **minItems**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[minItems](BaseModel.md#minitems)

___

### minLength

• `Optional` **minLength**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[minLength](BaseModel.md#minlength)

___

### minimum

• `Optional` **minimum**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[minimum](BaseModel.md#minimum)

___

### name

• `Optional` `Readonly` **name**: `string`

Name of the form field.

#### Inherited from

[BaseModel](BaseModel.md).[name](BaseModel.md#name)

___

### parent

• **parent**: [`ContainerModel`](ContainerModel.md)

Defines the parent of the container

#### Overrides

[BaseModel](BaseModel.md).[parent](BaseModel.md#parent)

___

### pattern

• `Optional` **pattern**: `string`

#### Inherited from

[BaseModel](BaseModel.md).[pattern](BaseModel.md#pattern)

___

### placeholder

• `Optional` **placeholder**: `string`

The placeholder to show on the widget.

#### Inherited from

[BaseModel](BaseModel.md).[placeholder](BaseModel.md#placeholder)

___

### properties

• **properties**: `Object`

Custom properties of the form field.

#### Index signature

▪ [key: `string`]: `any`

#### Inherited from

[BaseModel](BaseModel.md).[properties](BaseModel.md#properties)

___

### readOnly

• `Optional` **readOnly**: `boolean`

Whether the field should be readOnly to end user or not.

#### Inherited from

[BaseModel](BaseModel.md).[readOnly](BaseModel.md#readonly)

___

### required

• `Optional` **required**: `boolean`

#### Inherited from

[BaseModel](BaseModel.md).[required](BaseModel.md#required)

___

### rules

• `Optional` **rules**: `Object`

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Index signature

▪ [key: `string`]: `string`

#### Inherited from

[ScriptableField](ScriptableField.md).[rules](ScriptableField.md#rules)

___

### step

• `Optional` **step**: `number`

#### Inherited from

[BaseModel](BaseModel.md).[step](BaseModel.md#step)

___

### type

• `Optional` **type**: `string`

#### Inherited from

[BaseModel](BaseModel.md).[type](BaseModel.md#type)

___

### valid

• `Optional` **valid**: `boolean`

The current validation state of the Field. The property is always computed after merging the Data Model with the Form

#### Inherited from

[BaseModel](BaseModel.md).[valid](BaseModel.md#valid)

___

### validationExpression

• `Optional` **validationExpression**: `string`

#### Inherited from

[BaseModel](BaseModel.md).[validationExpression](BaseModel.md#validationexpression)

___

### value

• **value**: `any`

The current value of the Field. The property is serialized in the Data Model.

#### Inherited from

[BaseModel](BaseModel.md).[value](BaseModel.md#value)

___

### visible

• `Optional` **visible**: `boolean`

Whether the field should be visible to author or not.

#### Inherited from

[BaseModel](BaseModel.md).[visible](BaseModel.md#visible)

## Methods

### indexOf

▸ **indexOf**(`f`): `number`

Returns the index of the [child item](FieldModel.md) or the [child container](FieldsetModel.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | [`FieldsetModel`](FieldsetModel.md) \| [`FieldModel`](FieldModel.md) | child item |

#### Returns

`number`

`index` of the item

___

### validate

▸ **validate**(): [`ValidationError`](../classes/ValidationError.md)[]

Validates the given form field

#### Returns

[`ValidationError`](../classes/ValidationError.md)[]

list of [validation errors](../classes/ValidationError.md)

#### Inherited from

[BaseModel](BaseModel.md).[validate](BaseModel.md#validate)
