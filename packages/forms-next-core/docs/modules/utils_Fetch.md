# Module: utils/Fetch

## Table of contents

### Type aliases

- [RequestOptions](utils_Fetch.md#requestoptions)

### Functions

- [request](utils_Fetch.md#request)

## Type aliases

### RequestOptions

Ƭ **RequestOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `contentType?` | `string` |
| `headers?` | `any` |
| `method?` | ``"POST"`` \| ``"GET"`` |
| `mode?` | `string` |

## Functions

### request

▸ `Const` **request**(`url`, `data?`, `options?`): `any`

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `url` | `string` | `undefined` |
| `data` | `any` | `null` |
| `options` | [`RequestOptions`](utils_Fetch.md#requestoptions) | `{}` |

#### Returns

`any`
