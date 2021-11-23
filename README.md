# Phaser 3 TypeScript Project Template

This quick-start project template combines Phaser 3.50 with [TypeScript 4](https://www.typescriptlang.org/) and uses [Webpack](https://webpack.js.org/) for bundling.

## Requirements

[Yarn](https://yarnpkg.com/) is required to install dependencies and run scripts via `yarn`.

## Available Commands

| Command        | Description                                                             |
| -------------- | ----------------------------------------------------------------------- |
| `yarn install` | Install project dependencies                                            |
| `npm build`    | Build project and open web server running project, watching for changes |
| `npm dev`      | Builds project and open web server, but do not watch for changes        |

## Writing Code

After cloning the repo, run `yarn install` from your project directory. Then, you can start the local development
server by running `yarn dev`. The first time you run this you should see the following demo run:

After starting the development server with `yarn build`, you can edit any files in the `src` folder
and Webpack will automatically recompile and reload your assets.

## Configuring Rollup

- Edit the file `webpack.config.js` to edit the development build.

Note that due to the build process involved, it can take around 20 seconds to build the initial bundle. Times will vary based on CPU and local drive speeds. The development config does not minify the code in order to save build time, but it does generate source maps. If you do not require these, disable them in the config to speed it up further.
