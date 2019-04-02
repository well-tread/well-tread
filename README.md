## Well Tread

Well Tread is a web app that lets users look for and track hiking, mountain biking, and running trails across the US.

### Login
![Login Page](https://firebasestorage.googleapis.com/v0/b/well-tread.appspot.com/o/ReadMe%20Images%2FWell%20Tread%20Login.png?alt=media&token=946a207f-0801-42a9-b572-23d23266048b "Login Page")

Here the user can choose to sign-in/register using either their email or their Google account. If they're not willing to do either of those, they can continue without an account and later upgrade it if they so choose. <br>
Firebase Authentication is used to verify users.

### Home Page
![Home Page](https://firebasestorage.googleapis.com/v0/b/well-tread.appspot.com/o/ReadMe%20Images%2FWell%20Tread%20Home.png?alt=media&token=a32643cb-7385-4867-8a03-604e1e310dfe "Home Page")

On this page a weather forecast for the next three days is displayed, along with 5 nearby popular hiking, mountain biking, and running trails. Geolocation is used to determine the users location. <br>
If the user doesn't allow the site to access his/her location then the results are drawn from Boulder, CO

### Search Page
![Search Page](https://firebasestorage.googleapis.com/v0/b/well-tread.appspot.com/o/ReadMe%20Images%2FWell%20Tread%20Mobile%20Search.png?alt=media&token=9bb1cc8e-c668-426f-a25f-b5347cf32c3d "Search Page")

Here the user can enter in any location ranging from a full street address to a zipcode and get trails within a 10 mile radius of that point. The user also has the ability to filter based on hiking, mountain biking, or running.

### Trail Page

![Trail Page](https://firebasestorage.googleapis.com/v0/b/well-tread.appspot.com/o/ReadMe%20Images%2FWell%20Tread%20Trail%20Page.png?alt=media&token=3590301a-3c0b-4904-9ffe-f1eb1f528a3d "Trail Page")

This displays the length of the trail, its star rating, difficulty, and a short description. In addition, if the trail condition has been updated this year then the trail condition is displayed along with the time the condition was updated. In addition, the user can view reviews of the trail as well as open the trail location in Google Maps.

### Account Page

![Account Page](https://firebasestorage.googleapis.com/v0/b/well-tread.appspot.com/o/ReadMe%20Images%2FWell%20Tread%20Account%20Page.png?alt=media&token=8c390215-04d2-417c-85d6-68f38e67c2d5 "Account Page")

The account page is where the user can update his/her profile picture and display name, as well as keep track of his/her favorited and completed trails.

### Technologies Used
TypeScript <br>
React <br>
Material-UI<br>
Firebase<br>
Node.js<br>
express<br>
axios<br>
jest<br>

### APIs Used
Google Maps API<br>
Open Weather API<br>
Hiking Project trails API<br>
MTB Project trails API<br>
Trail Run Project trails API<br>
