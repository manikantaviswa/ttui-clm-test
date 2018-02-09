<h1 class="page-header">Documentation</h1>

## Field validation

### Usage
In order to start using field validation you will have to update schema form for each field you want to validate and create needed validation pattern for this.

1. Specify in schema which validation pattern you want to use for which field just by adding to needed field attribute `validation` like so:

``` js
	"firstName": {
		"title": "First Name",
		"description": "First Name",
		"type": "string",
		"validation": "alphabetic"
	}
```

2. Create new validation pattern in `field-validation-config.js` file.

``` js
	alphabetic: {
		pattern: /^[a-zA-Z]+$/,
		errorMessage: 'Only latin letters are allowed'
	},
```

Here we've created new validation pattern with name `alphabetic`, regular expression pattern `/^[a-zA-Z]+$/` and error message `Only latin letters are allowed` which will be shown if field will not pass validation.

### Schema
You are allowed to use one pattern per field and specify it as `string`, e.g.: `"validation": "alphabetic"` or even few patterns and specify them as an `array` like here: `"validation": ["phone.length.max", "phone"]`. In this case you will have to use **complementary rules** which **not contrary between themselves** . ***Benefit*** - you can separate regExps on smaller ones and also specify different error messages per pattern. So, for example, if number too small or too big user will see different messages for each of these errors instead of just one, more general.

### Pattern configuration
If your validation pattern should depends on value chosen in some other field, you have to create special `switch` pattern like so:

``` js
	documentsId: {
		switch: 'idType.masterCode',
		'PANCARD': {
			pattern: /^[a-zA-Z0-9\/]+$/,
			errorMessage: 'Please enter valid pancard number'
		},
		'CORPORATE-REGISTRATION-NUMBER': {
			pattern: 'numeric'
		},
		pattern: 'alphabetic'
	}
```

Here we have:
1. `switch: 'idType.masterCode'` - name of the model value we have to watch for (`idType.masterCode`)
2. `'PANCARD'` - pattern which will be used if model value is equal to `'PANCARD'`, in the same way works next parameter: `'CORPORATE-REGISTRATION-NUMBER'`
3. `pattern: 'alphabetic'`: default pattern, which will be used if value of model (`idType.masterCode`) is not equal to any of specified cases
4. `pattern: 'numeric'`: if you already have described some pattern, you can reuse it instead of creating it again. In current case error message will be taken from `numeric` pattern, but also feel free to redefine it here like this: `errorMessage: 'Some message'`

Also it's possible to nest patterns if you don't want to use long pattern names. In such case you can describe it in config like so:

``` js
	phone: {
		pattern: /^(\+\d{1,4}[ \-]?)?[\d\- ]{6,12}$/,
		errorMessage: 'Please enter valid phone number, ex.: +123456789',
		length: {
			max: {
				pattern: /^.{0,17}$/,
				errorMessage: 'Phone length is too long'
			},
		}
	},
```

And in schema  use this pattern by using dot notation like this:

``` js
	"validation": "phone.length.max"
```

In config above also is described pattern for `phone` itself, so we can use it also:

``` js
	"validation": "phone"
```

## Component documentation

TODO

## Updating

TODO
