import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import Dotenv from 'dotenv-webpack';
export default merge(common, {
    mode: 'production',
    output: {
        publicPath: '/'
    },
    plugins: [
        new Dotenv({
            safe: true,
            systemvars: true
        })
    ]
});
