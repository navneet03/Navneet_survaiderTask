# Sentiment Analysis of Restaurant Reviews

##Problem Statement:

  Make a small Python Flask application which makes use of reviews.json and relation.json to show two things :

    1. Overall sentiments of reviews for Sterling Resorts. You can make a pie chart or bar graph for
        the three sentiments (Positive, Negative, and Neutral).
    2. A page each for each of the three child hotels. On this hotel page, one should be able to see
        the sentiment graph (similar to the overall graph above) as well as all reviews of that hotel.
  *On running your application, we must first see the pie chart / bar graph for the overall sentiments of
    the 900 or so reviews.
  *On clicking on one of the three buttons for hotels, we must be routed to a page where we see the sentiment graph for
    that hotel, followed by reviews for that hotel.
  *If you do not wish to make multiple pages, you may combine task 1 and 2 in one single page itself. Make
    sure every section has its appropriate title.

##Technology Used:

 **Front end:** Html, Javascript, Bootstrap, D3.js

 **Backend:** Python , Flask

 **Database:** MongoDB(mongoengine ODM)

##Application Overview:

  * A simple application that display the sentiments of user reviews of restaurant in bar chart.
  * On loading the page display all sentiment(positive, negative, neutral) of user reviews of the parent restaurant(i.e. sum of all units restaurant) in bar chart.
  * There are three button for three units restaurant
  * On click of unit restaurant display that units restaurant sentiments in bar chart with followed below user reviews and rating.
  * Also on mouse over on bar chart shows the number of sentiment review.

##Implementation Overview:

  * Stored all the json data from reviews.json in mongoDB database.
  * Create "reviewRestApi" flask rest Api.
  * Used ajax for client server communication and D3.js for display bar chart.
  * On Ajax call for particular restaurant count the sentiments and write the required data in csv file.
  * Now after getting the response display the bar chart and reviews of particular restaurant.
  * Used simple cache to avoid the every time to fetch data from database.
  * Cache value updated after some time interval.

