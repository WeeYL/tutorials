## config (for type script)
- tsc --init > creates tsconfig
- tsc index.ts

## webpack
- npm install --save--dev webpack webpack-cli webpack-dev-server typescript ts-loader
- npm i --save--dev clean-webpack-plugin
- add webpack.config.js 
- add webpack.config.prod.js for production
- npm run build-webpack > npm run dev-webpack
- must remove .ts extension from the filename, else these files will be compiled 

## run 
- npm run dev
    - select myIndex.html
    - modify util-load-js
- npm run dev-dragdrop
- npm run dev-namespace
    - need to remove file ext for all other .ts files so it will not compile

## namespace
- tsconfig.json > outfile

## tsconfig
- sourcemap = true > for debugging


## lib
-  "@types/node" in order to use "require"


