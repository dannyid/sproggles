# Sproggles

## Complete marketer's toolkit

###[Get it at the Chrome store here](https://chrome.google.com/webstore/detail/sproggles/jbjbbpondgkpmdmkjpnpdfpnnoimehib)

### To Run:

1. Make sure you have gulp installed globally

    `npm install -g gulp`

2. Clone repo

    `git clone git@git.hubteam.com:dshekhtman/sproggles.git && cd sproggles`

3. Install dependencies

    `npm install`

4. Kick off watch task

    `gulp watch`

5. Gulp will create a `dist` folder which is the entire unpacked extension

6. In Chrome, navigate to `chrome://extensions`

7. Make sure the **Developer mode** checkbox on the top right is checked

8. Click **Load unpacked extension...**

9. Choose the `dist` folder that gulp created earlier

10. Your changes will automatically be processed by `gulp watch` and will update the `dist` folder every time you save

11. After many of your changes you'll need to click the **refresh** link on the extension on the `chrome://extensions` page or just refresh the whole page
