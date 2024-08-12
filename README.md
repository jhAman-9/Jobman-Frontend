## Fixing Hosting Error (404 Page Not Found On Refresh)

#### For Netlify 

- >Step 1 : Create a _redirects file:

    In the root of your React project (where public or src folders are located), create a new file named _redirects (without any extension).
    Add the following line to the _redirects file:
    bash
    Copy code

         /*    /index.html   200


- >Step 2 : Deploy Your Site Again:

    After adding the _redirects file, redeploy your site to Netlify. This should fix the issue and allow you to refresh pages without encountering a 404 error.


#### For Varcel

- For Vercel: Add a vercel.json file in your root directory with the following content:

        {
            "rewrites": [
                { "source": "/(.*)", "destination": "/index.html" }
            ]
        }


#### For Firebase

- For Firebase Hosting: Add the following to your firebase.json configuration file:


        "hosting": {
            "rewrites": [
                {
                "source": "**",
                "destination": "/index.html"
                }
            ]
        }