# Module: TranslationUtils

Defines generic utilities to translated form model definition

## Table of contents

### Variables

- [TRANSLATION\_ID](TranslationUtils.md#translation_id)
- [TRANSLATION\_TOKEN](TranslationUtils.md#translation_token)

### Functions

- [createTranslationObject](TranslationUtils.md#createtranslationobject)

## Variables

### TRANSLATION\_ID

• **TRANSLATION\_ID**: ``"props:translationIds"``

Name of the object which holds all translation specific properties

___

### TRANSLATION\_TOKEN

• **TRANSLATION\_TOKEN**: `string` = `'##'`

Token used while creating translation specific properties from `crispr form specification`

## Functions

### createTranslationObject

▸ `Const` **createTranslationObject**(`input`, `additionalTranslationProps?`, `bcp47LangTags?`): `any`

Creates translation object with [BCP 47](https://tools.ietf.org/search/bcp47) language tags as key and value is a translation object. Key of translation object is
generated based on the form hierarchy and it is separated by "##" token to signify that the id is machine generated (ie its not a human generated string)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `input` | `any` | `undefined` | form model definition |
| `additionalTranslationProps` | `string`[] | `[]` | optional properties which needs to be translated, by default, only OOTB properties of form model definition is translated |
| `bcp47LangTags` | `string`[] | `[]` | optional additional language tags |

#### Returns

`any`

translation object for each bcp 47 language tag
