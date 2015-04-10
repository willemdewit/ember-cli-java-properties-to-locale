# ember-cli-java-properties-to-object
Converts java properties files to a ES6 module which exports the object version.

***This is copied from https://github.com/gdub22/ember-cli-less. All credits to the author.***

## Installation

```
npm install --save-dev ember-cli-java-properties-to-object
```

## Usage

This addon will compile `*.properties` files into ES6 modules which export the POJO version of it.  
This can be used for converting properties files which contain i18n messages.

```
# i18n messages
user.edit.title             = Edit User
user.followers.title.one    = One Follower
user.followers.title.other  = All {{count}} Followers
button.add_user.title       = Add a user
button.add_user.text        = Add
button.add_user.disabled    = Saving...
```

```js
var translations = propertiesToObject(messages);
// result
{
  "user": {
  	"edit": {
  	  "title": "Edit user"
  	},
  	"followers": {
  	  "title": {
  	    "one": "One Follower",
  	    "other": "All {{count}} Followers"
  	  }
  	}
  },
  "button": {
    "add_user": {
    	"title": "Add a user",
    	"text": "Add",
    	"disabled": "Saving..."
    }
  }
}
```

The result can then be used in [ember-cli-i18n](https://github.com/dockyard/ember-cli-i18n)

## References

- [java.properties.js](https://github.com/willemdewit/java.properties.js)