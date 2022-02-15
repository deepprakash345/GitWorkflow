# Module: types/Json

## Table of contents

### Type aliases

- [BaseJson](types_Json.md#basejson)
- [ConstraintsJson](types_Json.md#constraintsjson)
- [ConstraintsMessages](types_Json.md#constraintsmessages)
- [ContainerJson](types_Json.md#containerjson)
- [FieldJson](types_Json.md#fieldjson)
- [FieldsetJson](types_Json.md#fieldsetjson)
- [FormJson](types_Json.md#formjson)
- [Items](types_Json.md#items)
- [Label](types_Json.md#label)
- [MetaDataJson](types_Json.md#metadatajson)
- [Primitives](types_Json.md#primitives)
- [RulesJson](types_Json.md#rulesjson)
- [TranslationJson](types_Json.md#translationjson)

### Variables

- [translationProps](types_Json.md#translationprops)

## Type aliases

### BaseJson

Ƭ **BaseJson**: `TranslationBaseJson` & [`RulesJson`](types_Json.md#rulesjson) & [`ConstraintsJson`](types_Json.md#constraintsjson) & { `constraintMessages?`: [`ConstraintsMessages`](types_Json.md#constraintsmessages) ; `dataRef?`: `string` \| ``null`` ; `enabled?`: `boolean` ; `errorMessage?`: `string` ; `label?`: [`Label`](types_Json.md#label) ; `name?`: `string` ; `viewType?`: `string` ; `visible?`: `boolean`  }

___

### ConstraintsJson

Ƭ **ConstraintsJson**: `TranslationConstraintsJson` & { `accept?`: `string`[] ; `enforceEnum?`: `boolean` ; `expression?`: `string` ; `format?`: `string` ; `fracDigits?`: `number` ; `leadDigits?`: `number` ; `maxFileSize?`: `number` ; `maxItems?`: `number` ; `maxLength?`: `number` ; `maximum?`: `number` ; `minItems?`: `number` ; `minLength?`: `number` ; `minimum?`: `number` ; `pattern?`: `string` ; `required?`: `boolean` ; `type?`: `string`  }

___

### ConstraintsMessages

Ƭ **ConstraintsMessages**: `Object`

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

Ƭ **ContainerJson**: [`BaseJson`](types_Json.md#basejson) & { `initialItems?`: `number` ; `items`: ([`FieldJson`](types_Json.md#fieldjson) \| [`ContainerJson`](types_Json.md#containerjson))[]  }

___

### FieldJson

Ƭ **FieldJson**: [`BaseJson`](types_Json.md#basejson) & `TranslationFieldJson` & { `default?`: `any` ; `multiline?`: `boolean` ; `props?`: { [key: string]: `any`;  } ; `readOnly?`: `boolean` ; `valid?`: `boolean` ; `value?`: `any`  }

___

### FieldsetJson

Ƭ **FieldsetJson**: [`ContainerJson`](types_Json.md#containerjson) & { `type?`: ``"array"`` \| ``"object"``  }

___

### FormJson

Ƭ **FormJson**: [`ContainerJson`](types_Json.md#containerjson) & { `action?`: `string` ; `data?`: `any` ; `metadata?`: [`MetaDataJson`](types_Json.md#metadatajson) ; `title?`: `string`  }

___

### Items

Ƭ **Items**<`T`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Index signature

▪ [key: `string`]: `T`

___

### Label

Ƭ **Label**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `richText?` | `boolean` |
| `value` | `string` |
| `visible?` | `boolean` |

___

### MetaDataJson

Ƭ **MetaDataJson**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `grammarVersion?` | `string` |
| `locale?` | `string` |
| `version?` | `string` |

___

### Primitives

Ƭ **Primitives**: `string` \| `number` \| `boolean` \| ``null``

___

### RulesJson

Ƭ **RulesJson**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `events?` | [`Items`](types_Json.md#items)<`string`[] \| `string`\> |
| `rules?` | [`Items`](types_Json.md#items)<`string`\> |

___

### TranslationJson

Ƭ **TranslationJson**: `TranslationBaseJson` & `TranslationFieldJson` & `TranslationConstraintsJson`

## Variables

### translationProps

• **translationProps**: `string`[]
