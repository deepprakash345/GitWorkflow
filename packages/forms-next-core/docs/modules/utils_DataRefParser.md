# Module: utils/DataRefParser

## Table of contents

### Variables

- [TOK\_GLOBAL](utils_DataRefParser.md#tok_global)

### Type aliases

- [Token](utils_DataRefParser.md#token)

### Functions

- [bracket](utils_DataRefParser.md#bracket)
- [global$](utils_DataRefParser.md#global$)
- [identifier](utils_DataRefParser.md#identifier)
- [resolveData](utils_DataRefParser.md#resolvedata)
- [tokenize](utils_DataRefParser.md#tokenize)

## Variables

### TOK\_GLOBAL

• **TOK\_GLOBAL**: `TokenType` = `'Global'`

## Type aliases

### Token

Ƭ **Token**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `type` | `TokenType` |
| `value` | `string` \| `number` |

## Functions

### bracket

▸ `Const` **bracket**(`value`, `start`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |
| `start` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `type` | `string` |
| `value` | `number` |

___

### global$

▸ `Const` **global$**(): `Object`

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `type` | `string` |
| `value` | `string` |

___

### identifier

▸ `Const` **identifier**(`value`, `start`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `start` | `number` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `start` | `number` |
| `type` | `string` |
| `value` | `string` |

___

### resolveData

▸ `Const` **resolveData**<`T`\>(`data`, `input`, `create?`): `undefined` \| `default` \| `default`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `default`<`T`\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `data` | `default` |
| `input` | `string` \| [`Token`](utils_DataRefParser.md#token)[] |
| `create?` | `T` |

#### Returns

`undefined` \| `default` \| `default`

___

### tokenize

▸ `Const` **tokenize**(`stream`): [`Token`](utils_DataRefParser.md#token)[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `stream` | `string` |

#### Returns

[`Token`](utils_DataRefParser.md#token)[]
