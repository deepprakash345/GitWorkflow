# Class: default

[Checkbox](../modules/Checkbox.md).default

Implementation of check box runtime model which extends from [field](../modules/Field.md) model

## Hierarchy

- [`default`](Field.default.md)

  ↳ **`default`**

## Table of contents

### Methods

- [\_setProperty](Checkbox.default.md#_setproperty)
- [addDependent](Checkbox.default.md#adddependent)
- [change](Checkbox.default.md#change)
- [dispatch](Checkbox.default.md#dispatch)
- [executeAction](Checkbox.default.md#executeaction)
- [getState](Checkbox.default.md#getstate)
- [importData](Checkbox.default.md#importdata)
- [removeDependent](Checkbox.default.md#removedependent)
- [subscribe](Checkbox.default.md#subscribe)
- [toString](Checkbox.default.md#tostring)
- [triggerValidationEvent](Checkbox.default.md#triggervalidationevent)
- [validate](Checkbox.default.md#validate)
- [valueOf](Checkbox.default.md#valueof)

### Accessors

- [dataRef](Checkbox.default.md#dataref)
- [enabled](Checkbox.default.md#enabled)
- [enum](Checkbox.default.md#enum)
- [enumNames](Checkbox.default.md#enumnames)
- [form](Checkbox.default.md#form)
- [id](Checkbox.default.md#id)
- [index](Checkbox.default.md#index)
- [isContainer](Checkbox.default.md#iscontainer)
- [label](Checkbox.default.md#label)
- [name](Checkbox.default.md#name)
- [parent](Checkbox.default.md#parent)
- [readOnly](Checkbox.default.md#readonly)
- [required](Checkbox.default.md#required)
- [ruleEngine](Checkbox.default.md#ruleengine)
- [rules](Checkbox.default.md#rules)
- [type](Checkbox.default.md#type)
- [valid](Checkbox.default.md#valid)
- [value](Checkbox.default.md#value)
- [viewType](Checkbox.default.md#viewtype)
- [visible](Checkbox.default.md#visible)

## Methods

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

[default](Field.default.md).[_setProperty](Field.default.md#_setproperty)

___

### addDependent

▸ **addDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[addDependent](Field.default.md#adddependent)

___

### change

▸ **change**(`event`, `context`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | [`Action`](../interfaces/FormModel.Action.md) |
| `context` | `any` |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[change](Field.default.md#change)

___

### dispatch

▸ **dispatch**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[dispatch](Field.default.md#dispatch)

___

### executeAction

▸ **executeAction**(`action`): `void`

Executes the given action

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) | [event object](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[executeAction](Field.default.md#executeaction)

___

### getState

▸ **getState**(): `TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

[state](../modules/FormModel.md#state) of the form object

#### Returns

`TranslationBaseJson` & [`RulesJson`](../modules/FormJsonTypes.md#rulesjson) & `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  } & { `constraintMessages?`: [`ConstraintsMessages`](../modules/FormJsonTypes.md#constraintsmessages) ; `dataRef?`: ``null`` \| `string` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](../modules/FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  } & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  } & { `id`: `string`  }

#### Inherited from

[default](Field.default.md).[getState](Field.default.md#getstate)

___

### importData

▸ **importData**(`contextualDataModel`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `contextualDataModel` | `default` |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[importData](Field.default.md#importdata)

___

### removeDependent

▸ **removeDependent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[removeDependent](Field.default.md#removedependent)

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

#### Inherited from

[default](Field.default.md).[subscribe](Field.default.md#subscribe)

___

### toString

▸ **toString**(): `any`

#### Returns

`any`

#### Inherited from

[default](Field.default.md).[toString](Field.default.md#tostring)

___

### triggerValidationEvent

▸ **triggerValidationEvent**(`changes`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `changes` | `any` |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[triggerValidationEvent](Field.default.md#triggervalidationevent)

___

### validate

▸ **validate**(`action`): `void`

Validates the current form object

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/FormModel.Action.md) |

#### Returns

`void`

#### Inherited from

[default](Field.default.md).[validate](Field.default.md#validate)

___

### valueOf

▸ **valueOf**(): `any`

#### Returns

`any`

#### Inherited from

[default](Field.default.md).[valueOf](Field.default.md#valueof)

## Accessors

### dataRef

• `get` **dataRef**(): `undefined` \| ``null`` \| `string`

#### Returns

`undefined` \| ``null`` \| `string`

#### Inherited from

Field.dataRef

___

### enabled

• `get` **enabled**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.enabled

• `set` **enabled**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Inherited from

Field.enabled

___

### enum

• `get` **enum**(): `any`[]

Returns the `enum` constraints from the json

#### Returns

`any`[]

#### Overrides

Field.enum

___

### enumNames

• `get` **enumNames**(): `undefined` \| `string`[]

#### Returns

`undefined` \| `string`[]

#### Inherited from

Field.enumNames

• `set` **enumNames**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `string`[] |

#### Returns

`void`

#### Inherited from

Field.enumNames

___

### form

• `get` **form**(): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

#### Inherited from

Field.form

___

### id

• `get` **id**(): `string`

#### Returns

`string`

#### Inherited from

Field.id

___

### index

• `get` **index**(): `number`

#### Returns

`number`

#### Inherited from

Field.index

___

### isContainer

• `get` **isContainer**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Field.isContainer

___

### label

• `get` **label**(): `undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Returns

`undefined` \| [`Label`](../modules/FormJsonTypes.md#label)

#### Inherited from

Field.label

• `set` **label**(`l`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `l` | `undefined` \| [`Label`](../modules/FormJsonTypes.md#label) |

#### Returns

`void`

#### Inherited from

Field.label

___

### name

• `get` **name**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

Field.name

___

### parent

• `get` **parent**(): [`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Returns

[`ContainerModel`](../interfaces/FormModel.ContainerModel.md)

#### Inherited from

Field.parent

___

### readOnly

• `get` **readOnly**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.readOnly

• `set` **readOnly**(`e`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `undefined` \| `boolean` |

#### Returns

`void`

#### Inherited from

Field.readOnly

___

### required

• `get` **required**(): `boolean`

#### Returns

`boolean`

#### Inherited from

Field.required

___

### ruleEngine

• `get` **ruleEngine**(): `RuleEngine`

#### Returns

`RuleEngine`

#### Inherited from

Field.ruleEngine

___

### rules

• `get` **rules**(): [`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Returns

[`Items`](../modules/FormJsonTypes.md#items)<`string`\>

#### Inherited from

Field.rules

___

### type

• `get` **type**(): `undefined` \| `string`

#### Returns

`undefined` \| `string`

#### Inherited from

Field.type

___

### valid

• `get` **valid**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.valid

___

### value

• `get` **value**(): `any`

#### Returns

`any`

#### Inherited from

Field.value

• `set` **value**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `any` |

#### Returns

`void`

#### Inherited from

Field.value

___

### viewType

• `get` **viewType**(): `string`

#### Returns

`string`

#### Inherited from

Field.viewType

___

### visible

• `get` **visible**(): `undefined` \| `boolean`

#### Returns

`undefined` \| `boolean`

#### Inherited from

Field.visible

• `set` **visible**(`v`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `undefined` \| `boolean` |

#### Returns

`void`

#### Inherited from

Field.visible
