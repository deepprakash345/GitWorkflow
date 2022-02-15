# Class: default

[Form](../modules/Form.md).default

## Hierarchy

- [`default`](Container.default.md)<[`FormJson`](../modules/types_Json.md#formjson)\>

  ↳ **`default`**

## Implements

- [`FormModel`](../interfaces/types_Model.FormModel.md)

## Table of contents

### Methods

- [\_bindToDataModel](Form.default.md#_bindtodatamodel)
- [\_createChild](Form.default.md#_createchild)
- [\_initialize](Form.default.md#_initialize)
- [\_setProperty](Form.default.md#_setproperty)
- [addDependent](Form.default.md#adddependent)
- [addItem](Form.default.md#additem)
- [defaultDataModel](Form.default.md#defaultdatamodel)
- [directReferences](Form.default.md#directreferences)
- [dispatch](Form.default.md#dispatch)
- [executeAction](Form.default.md#executeaction)
- [executeAllRules](Form.default.md#executeallrules)
- [executeRule](Form.default.md#executerule)
- [exportData](Form.default.md#exportdata)
- [fieldAdded](Form.default.md#fieldadded)
- [getDataNode](Form.default.md#getdatanode)
- [getElement](Form.default.md#getelement)
- [getEventQueue](Form.default.md#geteventqueue)
- [getRuleNode](Form.default.md#getrulenode)
- [getState](Form.default.md#getstate)
- [getUniqueId](Form.default.md#getuniqueid)
- [importData](Form.default.md#importdata)
- [indexOf](Form.default.md#indexof)
- [isValid](Form.default.md#isvalid)
- [notifyDependents](Form.default.md#notifydependents)
- [queueEvent](Form.default.md#queueevent)
- [removeDependent](Form.default.md#removedependent)
- [removeItem](Form.default.md#removeitem)
- [setupRuleNode](Form.default.md#setuprulenode)
- [submit](Form.default.md#submit)
- [subscribe](Form.default.md#subscribe)
- [syncDataAndFormModel](Form.default.md#syncdataandformmodel)

### Properties

- [\_children](Form.default.md#_children)
- [\_fields](Form.default.md#_fields)
- [\_ids](Form.default.md#_ids)
- [\_invalidFields](Form.default.md#_invalidfields)
- [\_jsonModel](Form.default.md#_jsonmodel)
- [\_ruleContext](Form.default.md#_rulecontext)

### Accessors

- [action](Form.default.md#action)
- [dataRef](Form.default.md#dataref)
- [form](Form.default.md#form)
- [id](Form.default.md#id)
- [index](Form.default.md#index)
- [isContainer](Form.default.md#iscontainer)
- [items](Form.default.md#items)
- [label](Form.default.md#label)
- [maxItems](Form.default.md#maxitems)
- [metaData](Form.default.md#metadata)
- [name](Form.default.md#name)
- [parent](Form.default.md#parent)
- [ruleEngine](Form.default.md#ruleengine)
- [rules](Form.default.md#rules)
- [title](Form.default.md#title)
- [type](Form.default.md#type)
- [value](Form.default.md#value)
- [viewType](Form.default.md#viewtype)
- [visible](Form.default.md#visible)

### Constructors

- [constructor](Form.default.md#constructor)

## Methods

### \_bindToDataModel

▸ **_bindToDataModel**(`contextualDataModel?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel?` | `default` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[_bindToDataModel](Container.default.md#_bindtodatamodel)

___

### \_createChild

▸ `Protected` **_createChild**(`child`): [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `child` | [`FieldJson`](../modules/types_Json.md#fieldjson) \| [`FieldsetJson`](../modules/types_Json.md#fieldsetjson) |

#### Returns

[`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)

#### Overrides

[default](Container.default.md).[_createChild](Container.default.md#_createchild)

___

### \_initialize

▸ **_initialize**(): `void`

#### Returns

`void`

#### Implementation of

FormModel.\_initialize

#### Inherited from

[default](Container.default.md).[_initialize](Container.default.md#_initialize)

___

### \_setProperty

▸ **_setProperty**<`T`\>(`prop`, `newValue`): `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `prop` | `string` |
| `newValue` | `T` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[_setProperty](Container.default.md#_setproperty)

___

### addDependent

▸ **addDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[addDependent](Container.default.md#adddependent)

___

### addItem

▸ **addItem**(`action`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[addItem](Container.default.md#additem)

___

### defaultDataModel

▸ **defaultDataModel**(`name`): `default`

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`default`

#### Inherited from

[default](Container.default.md).[defaultDataModel](Container.default.md#defaultdatamodel)

___

### directReferences

▸ **directReferences**(): `any`

#### Returns

`any`

#### Implementation of

FormModel.directReferences

#### Inherited from

[default](Container.default.md).[directReferences](Container.default.md#directreferences)

___

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[dispatch](../interfaces/types_Model.FormModel.md#dispatch)

#### Overrides

[default](Container.default.md).[dispatch](Container.default.md#dispatch)

___

### executeAction

▸ **executeAction**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Overrides

[default](Container.default.md).[executeAction](Container.default.md#executeaction)

___

### executeAllRules

▸ `Protected` **executeAllRules**(`context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[executeAllRules](Container.default.md#executeallrules)

___

### executeRule

▸ **executeRule**(`event`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[executeRule](Container.default.md#executerule)

___

### exportData

▸ **exportData**(): `any`

Exports the form data

#### Returns

`any`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[exportData](../interfaces/types_Model.FormModel.md#exportdata)

___

### fieldAdded

▸ **fieldAdded**(`field`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `field` | [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md) |

#### Returns

`void`

___

### getDataNode

▸ **getDataNode**(): `undefined` \| `default`

#### Returns

`undefined` \| `default`

#### Inherited from

[default](Container.default.md).[getDataNode](Container.default.md#getdatanode)

___

### getElement

▸ **getElement**(`id`): [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md) \| [`default`](Form.default.md)

Get form element model based on the id of the form element

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

[`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md) \| [`default`](Form.default.md)

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[getElement](../interfaces/types_Model.FormModel.md#getelement)

___

### getEventQueue

▸ **getEventQueue**(): `EventQueue`

#### Returns

`EventQueue`

#### Implementation of

FormModel.getEventQueue

___

### getRuleNode

▸ **getRuleNode**(): `any`

#### Returns

`any`

#### Implementation of

FormModel.getRuleNode

#### Inherited from

[default](Container.default.md).[getRuleNode](Container.default.md#getrulenode)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/types_Json.md#containerjson) \| [`FieldJson`](../modules/types_Json.md#fieldjson))[]  } & { `action?`: `string` ; `data?`: `any` ; `metadata?`: [`MetaDataJson`](../modules/types_Json.md#metadatajson) ; `title?`: `string`  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

returns the current state of the form

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/types_Json.md#containerjson) \| [`FieldJson`](../modules/types_Json.md#fieldjson))[]  } & { `action?`: `string` ; `data?`: `any` ; `metadata?`: [`MetaDataJson`](../modules/types_Json.md#metadatajson) ; `title?`: `string`  } & { `id`: `string` ; `items`: { `id`: `string` ; `viewType`: `string`  }[]  }

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[getState](../interfaces/types_Model.FormModel.md#getstate)

#### Overrides

[default](Container.default.md).[getState](Container.default.md#getstate)

___

### getUniqueId

▸ **getUniqueId**(): `string`

#### Returns

`string`

#### Implementation of

FormModel.getUniqueId

___

### importData

▸ **importData**(`dataModel`): `void`

Imports the given form data

#### Parameters

| Name | Type |
| :------ | :------ |
| `dataModel` | `any` |

#### Returns

`void`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[importData](../interfaces/types_Model.FormModel.md#importdata)

#### Overrides

[default](Container.default.md).[importData](Container.default.md#importdata)

___

### indexOf

▸ **indexOf**(`f`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md) |

#### Returns

`number`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[indexOf](../interfaces/types_Model.FormModel.md#indexof)

#### Inherited from

[default](Container.default.md).[indexOf](Container.default.md#indexof)

___

### isValid

▸ **isValid**(): `boolean`

#### Returns

`boolean`

___

### notifyDependents

▸ **notifyDependents**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[notifyDependents](Container.default.md#notifydependents)

___

### queueEvent

▸ **queueEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[queueEvent](Container.default.md#queueevent)

___

### removeDependent

▸ **removeDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[removeDependent](Container.default.md#removedependent)

___

### removeItem

▸ **removeItem**(`action`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[removeItem](Container.default.md#removeitem)

___

### setupRuleNode

▸ `Protected` **setupRuleNode**(): `void`

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[setupRuleNode](Container.default.md#setuprulenode)

___

### submit

▸ **submit**(`action`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/types_Model.Action.md) |
| `context` | `any` |

#### Returns

`void`

___

### subscribe

▸ **subscribe**(`callback`, `eventName?`): `Object`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `callback` | `callbackFn` | `undefined` |
| `eventName` | `string` | `'change'` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[subscribe](../interfaces/types_Model.FormModel.md#subscribe)

#### Inherited from

[default](Container.default.md).[subscribe](Container.default.md#subscribe)

___

### syncDataAndFormModel

▸ **syncDataAndFormModel**(`contextualDataModel?`): `void`

prefill the form with data on the given element

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel?` | `default` |

#### Returns

`void`

#### Inherited from

[default](Container.default.md).[syncDataAndFormModel](Container.default.md#syncdataandformmodel)

## Properties

### \_children

• `Protected` **\_children**: ([`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md))[] = `[]`

#### Inherited from

[default](Container.default.md).[_children](Container.default.md#_children)

___

### \_fields

• **\_fields**: [`Items`](../modules/types_Json.md#items)<[`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md)\> = `{}`

___

### \_ids

• **\_ids**: `Generator`<`string`, `void`, `string`\>

___

### \_invalidFields

• **\_invalidFields**: `string`[] = `[]`

___

### \_jsonModel

• `Protected` **\_jsonModel**: `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/types_Json.md#containerjson) \| [`FieldJson`](../modules/types_Json.md#fieldjson))[]  } & { `action?`: `string` ; `data?`: `any` ; `metadata?`: [`MetaDataJson`](../modules/types_Json.md#metadatajson) ; `title?`: `string`  } & { `id`: `string` ; `items`: (`TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  } \| `TranslationBaseJson` & [`RulesJson`](../modules/types_Json.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/types_Json.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & { `initialItems?`: `number` ; `items`: ([`ContainerJson`](../modules/types_Json.md#containerjson) \| [`FieldJson`](../modules/types_Json.md#fieldjson))[]  } & { `id`: `string`  })[]  }

#### Inherited from

[default](Container.default.md).[_jsonModel](Container.default.md#_jsonmodel)

___

### \_ruleContext

• `Protected` **\_ruleContext**: `any`

#### Inherited from

[default](Container.default.md).[_ruleContext](Container.default.md#_rulecontext)

## Accessors

### action

• `get` **action**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

___

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

To map the field’s value to a property in the data model.

#### Returns

`undefined` \| ``null`` \| `string`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[dataRef](../interfaces/types_Model.FormModel.md#dataref)

#### Inherited from

Container.dataRef

___

### form

• `get` **form**(): [`FormModel`](../interfaces/types_Model.FormModel.md)

#### Returns

[`FormModel`](../interfaces/types_Model.FormModel.md)

#### Overrides

Container.form

___

### id

• `get` **id**(): `string`

Id of the form.

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[id](../interfaces/types_Model.FormModel.md#id)

#### Overrides

Container.id

___

### index

• `get` **index**(): `number`

The index of the Field within its parent.

#### Returns

`number`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[index](../interfaces/types_Model.FormModel.md#index)

#### Inherited from

Container.index

___

### isContainer

• `get` **isContainer**(): `boolean`

Whether the form field is container or not

#### Returns

`boolean`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[isContainer](../interfaces/types_Model.FormModel.md#iscontainer)

#### Inherited from

Container.isContainer

___

### items

• `get` **items**(): ([`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md))[]

Array containing Fields or Panels.

#### Returns

([`FieldModel`](../interfaces/types_Model.FieldModel.md) \| [`FieldsetModel`](../interfaces/types_Model.FieldsetModel.md))[]

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[items](../interfaces/types_Model.FormModel.md#items)

#### Inherited from

Container.items

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/types_Json.md#label)

Label to be used for the field.

#### Returns

`undefined` \| [`Label`](../modules/types_Json.md#label)

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[label](../interfaces/types_Model.FormModel.md#label)

#### Inherited from

Container.label

• `set` **label**(`l`): `void`

Label to be used for the field.

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/types_Json.md#label) |

#### Returns

`void`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[label](../interfaces/types_Model.FormModel.md#label)

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

[FormModel](../interfaces/types_Model.FormModel.md).[maxItems](../interfaces/types_Model.FormModel.md#maxitems)

#### Inherited from

Container.maxItems

___

### metaData

• `get` **metaData**(): [`default`](FormMetaData.default.md)

#### Returns

[`default`](FormMetaData.default.md)

___

### name

• `get` **name**(): `string`

Name of the form field.

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[name](../interfaces/types_Model.FormModel.md#name)

#### Overrides

Container.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

The Parent Panel of the Field/Panel.

#### Returns

[`ContainerModel`](../interfaces/types_Model.ContainerModel.md)

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[parent](../interfaces/types_Model.FormModel.md#parent)

#### Inherited from

Container.parent

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Implementation of

FormModel.ruleEngine

#### Overrides

Container.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/types_Json.md#items)<`string`\>

Rules that modify the property of the object dynamically. The rules are evaluated whenever the dependency changes.

#### Returns

[`Items`](../modules/types_Json.md#items)<`string`\>

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[rules](../interfaces/types_Model.FormModel.md#rules)

#### Inherited from

Container.rules

___

### title

• `get` **title**(): `string`

Form title.

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[title](../interfaces/types_Model.FormModel.md#title)

___

### type

• `get` **type**(): `string`

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[type](../interfaces/types_Model.FormModel.md#type)

#### Overrides

Container.type

___

### value

• `get` **value**(): ``null``

The current value of the Field. The property is serialized in the Data Model.

#### Returns

``null``

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[value](../interfaces/types_Model.FormModel.md#value)

#### Overrides

Container.value

___

### viewType

• `get` **viewType**(): `string`

Type of widget to show to the user for capturing the data..

#### Returns

`string`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[viewType](../interfaces/types_Model.FormModel.md#viewtype)

#### Inherited from

Container.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

Whether the field should be visible to author or not.

#### Returns

`undefined` \| `boolean`

#### Implementation of

[FormModel](../interfaces/types_Model.FormModel.md).[visible](../interfaces/types_Model.FormModel.md#visible)

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

[FormModel](../interfaces/types_Model.FormModel.md).[visible](../interfaces/types_Model.FormModel.md#visible)

#### Inherited from

Container.visible

## Constructors

### constructor

• **new default**(`n`, `_ruleEngine`, `_eventQueue?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | [`FormJson`](../modules/types_Json.md#formjson) |
| `_ruleEngine` | `RuleEngine` |
| `_eventQueue` | `EventQueue` |

#### Overrides

[default](Container.default.md).[constructor](Container.default.md#constructor)
