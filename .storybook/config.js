import {configure,addParameters} from '@storybook/react';
import "../index"

addParameters({
    options:{
        name:"React-Pure"
    }
})

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
