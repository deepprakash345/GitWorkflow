# Module: FormInstance

## Table of contents

### Functions

- [createFormInstance](FormInstance.md#createforminstance)
- [fetchForm](FormInstance.md#fetchform)
- [validateFormInstance](FormInstance.md#validateforminstance)

## Functions

### createFormInstance

▸ `Const` **createFormInstance**(`formModel`): [`FormModel`](../interfaces/FormModel.FormModel-1.md)

Creates form instance using form model definition as per `crispr form specification`

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formModel` | `any` | form model definition |

#### Returns

[`FormModel`](../interfaces/FormModel.FormModel-1.md)

[form model](FormModel.md)

___

### fetchForm

▸ `Const` **fetchForm**(`url`, `headers?`): `Promise`<`string`\>

Helper API to fetch form model definition from an AEM instance

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | URL of the instance |
| `headers` | `any` | HTTP headers to pass to the aem instance |

#### Returns

`Promise`<`string`\>

promise which resolves to the form model definition

___

### validateFormInstance

▸ `Const` **validateFormInstance**(`formModel`, `data`): `boolean`

Validates Form model definition with the given data

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `formModel` | `any` | form model definition |
| `data` | `any` | form data |

#### Returns

`boolean`

`true`, if form is valid against the given form data, `false` otherwise
