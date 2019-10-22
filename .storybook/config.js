import {configure, addParameters} from '@storybook/react';
import "../index"

addParameters({
    options: {
        name: "React-Pure",
        showAddonPanel: false
    }
})

// automatically import all files ending in *.stories.js
configure(require.context('../stories', true, /\.stories\.js$/), module);
