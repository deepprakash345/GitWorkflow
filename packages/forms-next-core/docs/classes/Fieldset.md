# Class: Fieldset

Defines a field set class which extends from [container](Container.md)

## Hierarchy

- [`Container`](Container.md)<[`FieldsetJson`](../README.md#fieldsetjson)\>

  ↳ **`Fieldset`**

## Implements

- [`FieldsetModel`](../interfaces/FieldsetModel.md)

## Table of contents

### Accessors

- [dataRef](Fieldset.md#dataref)
- [form](Fieldset.md#form)
- [id](Fieldset.md#id)
- [index](Fieldset.md#index)
- [isContainer](Fieldset.md#iscontainer)
- [items](Fieldset.md#items)
- [label](Fieldset.md#label)
- [maxItems](Fieldset.md#maxitems)
- [name](Fieldset.md#name)
- [parent](Fieldset.md#parent)
- [ruleEngine](Fieldset.md#ruleengine)
- [rules](Fieldset.md#rules)
- [type](Fieldset.md#type)
- [value](Fieldset.md#value)
- [viewType](Fieldset.md#viewtype)
- [visible](Fieldset.md#visible)

### Methods

- [executeAction](Fieldset.md#executeaction)
- [getState](Fieldset.md#getstate)
- [hasDynamicItems](Fieldset.md#hasdynamicitems)
- [indexOf](Fieldset.md#indexof)
- [validate](Fieldset.md#validate)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[dataRef](../interfaces/FieldsetModel.md#dataref)

#### Inherited from

Container.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.md)

#### Returns

[`FormModel`](../interfaces/FormModel.md)

#### Inherited from

Container.form

___

### id

• `get` **id**(): `string`

Unique id of the form field.

#### Returns

`string`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[id](../interfaces/FieldsetModel.md#id)

#### Inherited from

Container.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[index](../interfaces/FieldsetModel.md#index)

#### Inherited from

Container.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[isContainer](../interfaces/FieldsetModel.md#iscontainer)

#### Inherited from

Container.isContainer

___

### items

• `get` **items**(): ([`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md))[]

Defines the children/items of the container

#### Returns

([`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md))[]

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[items](../interfaces/FieldsetModel.md#items)

#### Overrides

Container.items

___

### label

• `get` **label**(): `undefined` \| [`Label`](../README.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../README.md#label)

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[label](../interfaces/FieldsetModel.md#label)

#### Inherited from

Container.label

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../README.md#label) |

#### Returns

`void`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[label](../interfaces/FieldsetModel.md#label)

#### Inherited from

Container.label

___

### maxItems

• `set` **maxItems**(`m`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `m` | `number` |

#### Returns

`void`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[maxItems](../interfaces/FieldsetModel.md#maxitems)

#### Inherited from

Container.maxItems

___

### name

• `get` **name**(): `undefined` \| `string`

Name of the form field.

#### Returns

`undefined` \| `string`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[name](../interfaces/FieldsetModel.md#name)

#### Inherited from

Container.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/ContainerModel.md)

Defines the parent of the container

#### Returns

[`ContainerModel`](../interfaces/ContainerModel.md)

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[parent](../interfaces/FieldsetModel.md#parent)

#### Inherited from

Container.parent

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

FieldsetModel.ruleEngine

#### Inherited from

Container.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../README.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../README.md#items)<`string`\>

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[rules](../interfaces/FieldsetModel.md#rules)

#### Inherited from

Container.rules

___

### type

• `get` **type**(): `undefined` \| ``"array"`` \| ``"object"``

#### Returns

`undefined` \| ``"array"`` \| ``"object"``

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[type](../interfaces/FieldsetModel.md#type)

#### Overrides

Container.type

___

### value

• `get` **value**(): ``null``

The current value of the Field. The property is serialized in the Data Model.

#### Returns

``null``

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[value](../interfaces/FieldsetModel.md#value)

#### Overrides

Container.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[viewType](../interfaces/FieldsetModel.md#viewtype)

#### Inherited from

Container.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[visible](../interfaces/FieldsetModel.md#visible)

#### Inherited from

Container.visible

• `set` **visible**(`v`): `void`

Whether the field should be visible to author or not.

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[visible](../interfaces/FieldsetModel.md#visible)

#### Inherited from

Container.visible

## Methods

### executeAction

▸ **executeAction**(`action`): `void`

Executes the given action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`Action`](../interfaces/Action.md) | [event object](../interfaces/Action.md) |

#### Returns

`void`

#### Inherited from

[Container](Container.md).[executeAction](Container.md#executeaction)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../README.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `exclusiveMaximum?`: `number` ; `exclusiveMinimum?`: `number` ; `format?`: `string` ; `maxFileSize?`: `string` \| `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string` ; `validationExpression?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../README.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../README.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../README.md#containerjson) \| [`FieldJson`](../README.md#fieldjson))[]  } & { `type?`: ``"object"`` \| ``"array"``  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

Returns the current container state

#### Returns

`TranslationBaseJson` & [`RulesJson`](../README.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `exclusiveMaximum?`: `number` ; `exclusiveMinimum?`: `number` ; `format?`: `string` ; `maxFileSize?`: `string` \| `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string` ; `validationExpression?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../README.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../README.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../README.md#containerjson) \| [`FieldJson`](../README.md#fieldjson))[]  } & { `type?`: ``"object"`` \| ``"array"``  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[getState](../interfaces/FieldsetModel.md#getstate)

#### Inherited from

[Container](Container.md).[getState](Container.md#getstate)

___

### hasDynamicItems

▸ **hasDynamicItems**(): `boolean`

returns whether the items in the Panel can repeat or not

#### Returns

`boolean`

#### Inherited from

[Container](Container.md).[hasDynamicItems](Container.md#hasdynamicitems)

___

### indexOf

▸ **indexOf**(`f`): `number`

Returns the index of the [child item](../interfaces/FieldModel.md) or the [child container](../interfaces/FieldsetModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldsetModel`](../interfaces/FieldsetModel.md) \| [`FieldModel`](../interfaces/FieldModel.md) |

#### Returns

`number`

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[indexOf](../interfaces/FieldsetModel.md#indexof)

#### Inherited from

[Container](Container.md).[indexOf](Container.md#indexof)

___

### validate

▸ **validate**(): [`ValidationError`](ValidationError.md)[]

Validates the given form field

#### Returns

[`ValidationError`](ValidationError.md)[]

#### Implementation of

[FieldsetModel](../interfaces/FieldsetModel.md).[validate](../interfaces/FieldsetModel.md#validate)

#### Inherited from

[Container](Container.md).[validate](Container.md#validate)
