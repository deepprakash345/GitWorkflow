# Module: utils/TranslationUtils

## Table of contents

### Variables

- [TRANSLATION\_ID](utils_TranslationUtils.md#translation_id)
- [TRANSLATION\_TOKEN](utils_TranslationUtils.md#translation_token)

### Functions

- [addTranslationId](utils_TranslationUtils.md#addtranslationid)
- [createTranslationObj](utils_TranslationUtils.md#createtranslationobj)
- [createTranslationObject](utils_TranslationUtils.md#createtranslationobject)
- [invalidateTranslation](utils_TranslationUtils.md#invalidatetranslation)

## Variables

### TRANSLATION\_ID

• **TRANSLATION\_ID**: ``"props:translationIds"``

___

### TRANSLATION\_TOKEN

• **TRANSLATION\_TOKEN**: `string` = `'##'`

## Functions

### addTranslationId

▸ `Const` **addTranslationId**(`input`, `additionalTranslationProps?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `any` | `undefined` |
| `additionalTranslationProps` | `string`[] | `[]` |

#### Returns

`any`

___

### createTranslationObj

▸ `Const` **createTranslationObj**(`input`, `additionalTranslationProps?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `input` | `any` | `undefined` |
| `additionalTranslationProps` | `string`[] | `[]` |

#### Returns

`any`

___

### createTranslationObject

▸ `Const` **createTranslationObject**(`input`, `additionalTranslationProps?`, `bcp47LangTags?`): `any`

Creates translation object with BCP 47 language tags as key and value is a translation object. Key of translation object is
generated based on the form hierarchy and it is separated by "##" token to signify that the id is machine generated (ie its not a human generated string)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `any` | `undefined` | form model definition |
| `additionalTranslationProps` | `string`[] | `[]` | optional properties which needs to be translated, by default, only OOTB properties of form model definition is translated |
| `bcp47LangTags` | `string`[] | `[]` | optional additional language tags |

#### Returns

`any`

___

### invalidateTranslation

▸ `Const` **invalidateTranslation**(`input`, `updates`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `any` |
| `updates` | `any` |

#### Returns

`void`
