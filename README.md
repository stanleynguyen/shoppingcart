
 

# Take Home Homework (Day 3) (1 of 2)

Create a new application using Create React App:
- When it first load, shows the login page: refers to https://transition-to-react-playground.vercel.app/login for how it look like
- When user login successfully, shows the marketplace page.https://transition-to-react-playground.vercel.app/marketplace-mock
- When there is no items, show empty message like this page: https://transition-to-react-playground.vercel.app/marketplace-empty

Notes:
- To add item to cart, use https://<your-service>.herokuapp.com/docs/#/marketplace/addCartItem
- To get items in cart, use https://<your-service>.herokuapp.com/docs/#/marketplace/listCartItems
- To remove item from cart, use https://<your-service>.herokuapp.com/docs/#/marketplace/removeCartItem

You should use React styleguidist to documents your presentation components.

Deploy the site and the styleguidist site to Netlify and submit the URLs together with the link to your repository.
 
# SikOn's Remarks on Homework Submission
The shoppingcart homework requires the React styleguidist be used.  However, as this app incorporates four homeworks, I have requested Stanley's permission
to have React styleguidist used in day 4 homework [`movies`](http://github.com/encore428/movies) instead.
 
# Deployment

The app has been deployed to Netlify as below:

https://confident-golick-a02a49.netlify.app 
 
During the deployment, there was one additional task required just because of Netlify:

CI=False, refer to this [article](https://stackoverflow.com/questions/62415804/how-to-prevent-netlify-from-treating-warnings-as-errors-because-process-env-ci).

1. On Netlify, go to Deploys -> [Deployment Settings](https://app.netlify.com/sites/confident-golick-a02a49/settings/deploys).
1. Schroll down to see Environment tab.
1. Click Environment Variables -> Edit Variables
1. Key: CI Value: False
1. Redeploy with clearing cache.
 
