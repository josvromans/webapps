# Triangle Subdivision - Desktop Browser App
You can play with this app in your web browser, preferably on a laptop / desktop:

https://josvromans.github.io/webapps/subdivisions/app.html

This type of triangle subdivision is explained on my website:
https://josvromans.com/blog/2021/1/triangle-subdivisions/


**Parameters**

Background: sets the canvas background color

Line color: sets the line color

Iterations: the amount of iterations. Since the image will not be resized and the line width stays the same, more than 15 iterations do not result in better images.

Divisor: when the divisor is 2, the midpoint will be exactly halfway the opposite triangle edge. 
When changing this number, the 'midpoint' will shift to being closer to one of the two triangle vertices. The output image changes.

Strategy: should be a sequence containing [0, 1, 2] only, but can be of any length. (longer then the amount of iterations makes no sense).
The strategy is described in the article mentioned before. With this strategy, you can recreate any image you see in this video:

[![YouTube video with 3000 variations](https://img.youtube.com/vi/pFiiVXwEKnA/0.jpg)](https://youtu.be/pFiiVXwEKnA)

Download button downloads the current result in the canvas, and saves it as a .png

When you add the strategy in the url, that subdivision will be rendered on page load.You can add the strategy in the url
For example:
https://josvromans.github.io/webapps/subdivisions/app.html?=strategy=0120120 will create the same image as in the image above.

**Controls**

&lt;enter&gt; Generate the subdivision.

&lt;c&gt; Clear the canvas (without reloading the page, &lt;F5&gt; is the alternative)

