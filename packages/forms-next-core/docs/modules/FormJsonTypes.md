# Module: FormJsonTypes

Defines generic types based on `crispr form specification`

## Table of contents

### Type aliases

- [BaseJson](FormJsonTypes.md#basejson)
- [ConstraintsJson](FormJsonTypes.md#constraintsjson)
- [ConstraintsMessages](FormJsonTypes.md#constraintsmessages)
- [ContainerJson](FormJsonTypes.md#containerjson)
- [FieldJson](FormJsonTypes.md#fieldjson)
- [FieldsetJson](FormJsonTypes.md#fieldsetjson)
- [FormJson](FormJsonTypes.md#formjson)
- [Items](FormJsonTypes.md#items)
- [Label](FormJsonTypes.md#label)
- [MetaDataJson](FormJsonTypes.md#metadatajson)
- [Primitives](FormJsonTypes.md#primitives)
- [RulesJson](FormJsonTypes.md#rulesjson)
- [TranslationJson](FormJsonTypes.md#translationjson)

### Variables

- [translationProps](FormJsonTypes.md#translationprops)

## Type aliases

### BaseJson

Ƭ **BaseJson**: `TranslationBaseJson` & [`RulesJson`](FormJsonTypes.md#rulesjson) & [`ConstraintsJson`](FormJsonTypes.md#constraintsjson) & { `constraintMessages?`: [`ConstraintsMessages`](FormJsonTypes.md#constraintsmessages) ; `dataRef?`: `string` \| ``null`` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](FormJsonTypes.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  }

Type for `generic form properties` based on `crispr form specification`

___

### ConstraintsJson

Ƭ **ConstraintsJson**: `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  }

Type for `constraint properties` based on `crispr form specification`

___

### ConstraintsMessages

Ƭ **ConstraintsMessages**: `Object`

Type for `constraint messages` based on `crispr form specification`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enforceEnum?` | `string` |
| `expression?` | `string` |
| `fracDigits?` | `string` |
| `leadDigits?` | `string` |
| `maxLength?` | `string` |
| `maximum?` | `string` |
| `minLength?` | `string` |
| `minimum?` | `string` |
| `required?` | `string` |
| `type?` | `string` |

___

### ContainerJson

Ƭ **ContainerJson**: [`BaseJson`](FormJsonTypes.md#basejson) & { `initialItems?`: `number` ; `items`: ([`FieldJson`](FormJsonTypes.md#fieldjson) \| [`ContainerJson`](FormJsonTypes.md#containerjson))[]  }

Type for `form container properties` based on `crispr form specification`

___

### FieldJson

Ƭ **FieldJson**: [`BaseJson`](FormJsonTypes.md#basejson) & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  }

Type for `form field properties` based on `crispr form specification`

___

### FieldsetJson

Ƭ **FieldsetJson**: [`ContainerJson`](FormJsonTypes.md#containerjson) & { `type?`: ``"array"`` \| ``"object"``  }

Type for `form fieldset` based on `crispr form specification`

___

### FormJson

Ƭ **FormJson**: [`ContainerJson`](FormJsonTypes.md#containerjson) & { `action?`: `string` ; `data?`: `any` ; `metadata?`: [`MetaDataJson`](FormJsonTypes.md#metadatajson) ; `title?`: `string`  }

Type for `form model` based on `crispr form specification`

___

### Items

Ƭ **Items**<`T`\>: `Object`

Type for `items property` based on `crispr form specification`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Index signature

▪ [key: `string`]: `T`

___

### Label

Ƭ **Label**: `Object`

Type for `label` based on `crispr form specification`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `richText?` | `boolean` |
| `value` | `string` |
| `visible?` | `boolean` |

___

### MetaDataJson

Ƭ **MetaDataJson**: `Object`

Type for `form metadata` based on `crispr form specification`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `grammarVersion?` | `string` |
| `locale?` | `string` |
| `version?` | `string` |

___

### Primitives

Ƭ **Primitives**: `string` \| `number` \| `boolean` \| ``null``

Type alias for primitive types

___

### RulesJson

Ƭ **RulesJson**: `Object`

Type for `constraint messages` based on `crispr form specification`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `events?` | [`Items`](FormJsonTypes.md#items)<`string`[] \| `string`\> |
| `rules?` | [`Items`](FormJsonTypes.md#items)<`string`\> |

___

### TranslationJson

Ƭ **TranslationJson**: `TranslationBaseJson` & `TranslationFieldJson` & `TranslationConstraintsJson`

Type for all properties which can be translated based on `crispr form specification`

## Variables

### translationProps

• **translationProps**: `string`[]

Constant for all properties which can be translated based on `crispr form specification`
