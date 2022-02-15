# Module: utils/ValidationUtils

## Table of contents

### Variables

- [Constraints](utils_ValidationUtils.md#constraints)

### Functions

- [isDataUrl](utils_ValidationUtils.md#isdataurl)

## Variables

### Constraints

• **Constraints**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `enum` | (`constraint`: `any`[], `value`: `any`) => { `valid`: `boolean` ; `value`: `any`  } |
| `format` | (`constraint`: `string`, `input`: `string`) => { `valid`: `boolean` ; `value`: `string`  } |
| `maxLength` | (`constraint`: `number`, `value`: `string`) => { `valid`: `boolean` ; `value`: `string`  } |
| `maximum` | (`constraint`: `number`, `value`: `number`) => { `valid`: `boolean` ; `value`: `number`  } |
| `minLength` | (`constraint`: `number`, `value`: `string`) => { `valid`: `boolean` ; `value`: `string`  } |
| `minimum` | (`constraint`: `number`, `value`: `number`) => { `valid`: `boolean` ; `value`: `number`  } |
| `pattern` | (`constraint`: `string` \| `RegExp`, `value`: `string`) => { `valid`: `boolean` ; `value`: `string`  } |
| `required` | (`constraint`: `boolean`, `value`: `any`) => { `valid`: `boolean` ; `value`: `any`  } |
| `type` | (`constraint`: `string`, `inputVal`: `any`) => `ValidationResult` |

## Functions

### isDataUrl

▸ `Const` **isDataUrl**(`str`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

`boolean`
