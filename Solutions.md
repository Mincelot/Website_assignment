
Names of team members:
Yu Xuan Chen (1002370427)
Manak Kapoor (1002097946)
Samuel Selvarajah (1001594161)


Our web application "Pic.It" provides people who wants to find pictures for their desktop background an
easier way to navigate through thousands of photos existing on the internet. Using a popular photo-sharing-based
api call "Unsplash", we present the user with near infinite numbers of photos that they can choose from. To start, 
the user will have to register an account on the signup page, which will not require any personal information such 
as Email. Once signed up, the user will be able to log into the main page and will be presented with an infinite scroll
page that delivers thousands and thousands of photos. The banner of the website is attached with server status message bar
that rotates thorough existing messages in the database, each message will display for about 2.5 seconds before changing to the
next one. We also allow the user to set up their own collection of photos; specifically, whenever the user select a photo in the main 
page, the pop up window will allow the user to see the location of the photo via google map if the location information is available, the
likes of the photo received on Unsplash and the option to add the photo to their collection of photos. If the user chooses to add the photo
to their collection, they can check the existing photos in their collection by clicking on the "My collection" button on the banner, which 
will take them to the collection page. In here, the user can see all of the photo that they've added and for each photo, they can choose
to delete the photo from their collection or replace the photo with another photo from Unsplash given the id of the new Photo. The RESTFUL
api of our web application also supports those features, the GET function will retrieve all the photo ids that a particular user likes, the
DELETE will delete a photo from a user's collection, PUT will change the photo id to another photo id and POST will add a photo to a user's
collection.