![Header Graphic](http://ziplines.pixelcab.in/img/social_thumb-eba438a9.png)

# Ziplines

> Ziplines is a quick command line tool to help you get set up with an integrated Shopify workflow that supports a stable multi-developer workflow, VCS, the full feature-set of SASS, JS hinting and compression, and much more! 

&nbsp;

&nbsp;

## Getting Started

#### Requirements

You'll need the following software installed to get started.

  * [Git](http://git-scm.com/downloads): Use the installer for your OS.
    * Windows users can also try [Git for Windows](http://git-for-windows.github.io/).
  * [Node.js](http://nodejs.org): Use the installer provided on the NodeJS website.
    * npm comes with Node, however it is updated more frequently than Node itself, so you'll want to update by running `sudo npm install npm -g`
    * Once npm is installed, run `sudo npm install -g bower`.  
  * [Grunt.js](http://gruntjs.com): Install by running `npm install -g grunt-cli`

#### Installing

ziplines is installed through npm.

```bash
npm install -g ziplines
```

This will add the `ziplines` command to your system.


## Setup Instructions
#### New Store
1. Setup the store on Shopify (shortcut for Partners: `ziplines store_setup new`)
1. Setup a private app on your store (shortcut: `ziplines store_setup app --store=STORENAME`), and take note of the api key and api password
1. `ziplines new STORENAME APIKEY APIPASSWORD`(see the [new](https://github.com/pixelcabin/ziplines#new) docs for optional flags)

#### Day-to-day use
1. The app will default to a development environment - to change to production, run `ziplines env production`
1. run `grunt watch`
1. All liquid files in layout/snippets/templates within `shop`
1. All SCSS files should be created in `src/scss`, and included via `@import` within `application.scss`
1. All JS files should be created in `src/js`
1. All other assets should be created in `shop/assets`


## Updating

The CLI periodically gets updates that add features or fix bugs. Use npm to upgrade the CLI to the newest version.

```bash
npm update -g ziplines
```

To check what version you currently have, use `-v`.

```bash
ziplines -v
```

--------

# What does `new` do?

The primary goal of this tool was to streamline the process of getting set up with the tooling we have found useful. In summary, this does the following:

1. Clones a publicly available repo into a new folder - this defaults to [pixelcabin/pxl_shopify_template_public_draft](https://github.com/pixelcabin/pxl_shopify_template_public_draft)
1. Creates a new theme on the store, telling Shopify to use the zip of the master branch of the repo cloned in step 1.
1. Sets up the the relevant config to ensure that subsequent Grunt tasks are pointing to the correct store, with the newly created `theme_id`, and API credentials
1. Installs the dependencies specified in the cloned repo's `packages.json`
1. Optionally installs Foundation
1. Runs a one off asset compilation, and uploads that to the newly created theme
1. Initialises a new Git repository in the project folder, and commits all files as a first commit

At this stage, your folder will be all set up to start development.

## Folder structure of our default template
The folder structure in a newly created project will look familiar, but has a few nuances.

```

├-- [shop]
│   ├-- [assets]
│   │   ├- application.css
│   │   ├- application.js
│   │   ├- third_lib.js
│   │
│   ├-- [config]
│   │   ├- settings_data.json
│   │   ├- settings_schema.json
│   │
│   ├-- [layout]
│   │   ├- theme.liquid
│   │
│   ├-- [snippets]
│   │
│   ├-- [templates]
│   │   ├-- [customers]
│   ├- _template liquid files_
│
├-- [src]
│   ├-- [js]
│   │   ├-- [app]
│   │   ├-- [third_party]
│   │
│   ├-- [scss]
│   │   ├- application.scss
│
├- .gitignore
├- .jshint
├- Gruntfile.js
├- bower.json
├- credentials_template.json
├- credentials.json
├- package.json

```

The main driver of day-to-day development, `grunt watch`, will do the following ([view in the Gruntfile](https://github.com/pixelcabin/pxl_shopify_template_public_draft/blob/master/Gruntfile.js#L148)):
* monitor the contents of `src\js\app`, and compile (and compress) all .js files within to `shop\assets\application.js`
* monitor the contents of `src\js\third_party`, and compile (and compress) all .js files within to `shop\assets\third_lib.js`
* monitor the contents of `src\scss`, and compile (and compress) `application.scss` to `shop\assets\application.css` 
* for both of the js tasks, `jshint` will be run before compilation (using the rules defined in `.jshint`), and block compilation if jshint fails
* monitor the contents of `shop`, and will upload any changes to the configured theme (this will also trigger a call to livereload - if on Chrome, this can be used with [this extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?utm_source=chrome-app-launcher-info-dialog))

--------

## Commands

* `new`
* `status`
* `view`
* `admin`
* `docs`
* `env`
* `store_setup`
* `help`

> NB: Where possible, **Ziplines** will attempt to identify the relevant store and theme in question, by looking at the contents of the Gruntfile and credentials.json. This means that if running commands such as `admin` from within the project folder, no store name needs to be provided. 

### new

Downloads and installs a new Ziplines project, into a folder named after the store.

```bash
ziplines new <store-name> <api_key> <api_password>
```

You can include Foundation with the `--foundation` flag.

```bash
ziplines new <store-name> <api_key> <api_password> --foundation
```

You can also provide the path to a public github repo as the fourth argument (in the format `username/reponame`), providing you the flexibility to build your own template into this workflow:

```bash
ziplines new <store-name> <api_key> <api_password> pixelcabin/blank_ziplines_template

```

> If any arguments are missing, `new` will take you through an interactive prompt

### status

Outputs the Ziplines config for the current folder

### view

Opens your theme in your browser

```bash
ziplines view [theme_name|--live]
```

Can optionally open any other theme on your store by passing the theme name as the first argument, or can open the live theme by adding the `--live` flag.
i.e.
```bash
ziplines view Staging
```

### admin

Opens the store's Shopify admin page in your browser

```bash
ziplines admin [sub-page] [--store=STORE_NAME]
```

You can optionally open any subpage of your store's admin by passing the page name as the first argument.
i.e. If wanting to view the products admin page, run:
```bash
ziplines admin products
```

### docs

Opens the documentation for Ziplines (currently this page)

### env

Switch the built tools environment between development and production
```bash
ziplines env <environment>
```

Available arguments: `development` (or `d`), and `production` (or `p`)
    
> Important: requires a restart of `grunt watch` after execution

### store_setup

A set of shortcuts to speed up creating a new store

```bash
ziplines store_setup <command>
```

Available commands:
* `new_store` - shortcut to the new dev store page _[only available if you have a partner account]_
* `new_app [--store=STORE_NAME]` - shortcut to the new private app page 
* `show_apps [--store=STORE_NAME]` - shortcut to the private apps page

Optional `--store` flag can be added if running outside of a configured project folder

### help

Lists all available commands in the CLI.

```bash
ziplines help
```

Add a command name at the end to learn how a specific command works.

```bash
ziplines help new
```

--------

## Generic Workflow

The workflow we have adopted is modeled off normal VCS-based software development, where each developer has a version of the code running locally on their machine, and then synchronises with the rest of the team via their VCS. However, with Shopify, there is no way to run a store locally, meaning that to run the code you have been working on, it must first be uploaded to Shopify.

Our workflow is as follows:
* Each developer has their own theme on Shopify, which Grunt is configured to upload to. Any changes they make are only pushed to that theme.
* The local codebase is tracked through a VCS, meaning that a team can collaborate on it like any other development project

Ziplines sets up a new project with this direction in mind - it creates a new theme on your store that Grunt will upload to, and initialises a new git repositiory. Crucially, `credentials.json`, which holds the config for both your API settings and the theme to push to, is excluded from the repo, ensuring that the theme_id setting doesn't sync to other developers, allowing each dev to have their own theme (it also stops the sensetive API credentials from being comitting to git).

> One of the great advantages of this approach is that the Shopify theme no longer becomes the authoritative record of the codebase, and instead becomes a temporary snapshot of what is stored in Git - this greatly reduces the fragility of the theme on Shopify, as you can always restore from Git if necessary.

**[COMING SOON]** Making your work live is then achieved as follows:
* `ziplines synclive down` - downloads the live theme into your project folder, allowing you to compare it against your last commit, reverting any changes that are old, and committing any changes from the live theme that need to be preserved (such as changes to the theme settings) - this is particularly useful if you have clients that may make changes to the theme settings or the files themselves without going through you
* `ziplines synclive up` - uploads the merged contents of your project folder to your theme, ensuring that it has any changes brought over from the live theme
* Duplicate your theme (optionally adding a version tag to the commit in git), and then publish that theme (making it easy to revert to the old theme if necessary)


--------

# Additional Information

## Questions

*Ziplines* is currently in beta - please feel free to get in touch on Twitter ([@pixelcabin](https://twitter.com/pixelcabin)), or raise an issue here.

## Thanks
**Ziplines** wouldn't have been possible without the awesome work on the following tools:
* [foundation-cli](https://github.com/zurb/foundation-cli) - immensly useful in kickstarting development on building the CLI tool that became **Ziplines**
* [grunt](http://gruntjs.com) - the core engine that drives the day-to-day automation
* [grunt-shopify](https://github.com/wilr/grunt-shopify) - the grunt plugin that handles the uploading to Shopify 

<img src="http://ziplines.pixelcab.in/img/node-5583ff2b.png" width="24%">
<img src="http://ziplines.pixelcab.in/img/grunt-logo-a9e0afcf.png" width="20%">
<img src="http://ziplines.pixelcab.in/img/sass_logo-5ac97774.png" width="24%">
<img src="http://ziplines.pixelcab.in/img/shopify_bag-452b385a.png" width="22%">

## Contributors

If you'd like to contribute, please feel free to fork and submit a pull request. In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using Grunt.

## License

MIT License. Copyright 2015 Pixelcabin. [www.pixelcab.in](http://www.pixelcab.in)

You are not granted rights or licenses to the trademarks of Pixelcabin, including without limitation the **Ziplines** name or logo.
