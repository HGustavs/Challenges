can you make code in javascript that renders a mk2 volkswagen golf as a 3d isometric line drawing in svg format. The drawing should animate, so that when the mouse moves the car should rotate left or right around its vertical axis. No libraries or frameworks, only javascript code. 

The headlights are now spherical rather than cylindrical which is not correct. The headlights need to be added in the same manner as the wheels using a flat circle for each headlight. 

Please add more geometry so that the result is more similar to this uploaded image. 

Make a separate page with an interface for updating the geometry. It should have four views top view Left side view front view and rear view. When a point is moved in one view it should update to the correct position in the other views. It should be possible to select any point in any view and then move that point in any of the views. The selected point should be shown by a rectangle. It should be possible to add background images to each view in order to sketch over a blueprint in each view. It should also be possible to select lines. Any selected line is highlighted in all four views. There should be a button for isometric preview, a button for line editing mode and a button for point editing mode. When no point is selected the point that is hovered over in the current view is highlighted. When the highlighted point is clicked it is selected. We move from preview mode to editing mode using a button. In preview mode only the isometric preview is shown. In the editing mode the four views are shown.

Add a button for point creation mode where points can be added one by one by clicking in a view. Add a button for line editing mode which allows the user to click a point and make a line to some other point when a second point is clicked on in any of the views. After the first click in line editing mode and before the second click a line preview is drawn from the first point to the mouse coordinate or the second point.

Line editing mode will add segments to the current line segment one by one until escape key is pressed or until a loop of line segments is created

Add a mode for creating quadratic curve segments by connecting three or more points until escape is pressed or a loop of quadratic segments is created. The quadratic segments should be colored distinctly from the lines in the drawing view and the isometric preview. I suggest using yellow for quadratic segments. 

Add a button for downloading the data in json format file and for uploading data in json format. While drawing the data should automatically be saved to local storage.

In point editing mode add box selection functionality that allows the user to select multiple points and move all selected points together. Also add functionality for adding or removing points from the selected point set using the control button as a modifier to select additional points. If an already selected point is control clicked it will be deselected. 

When shift key is held movement in point editing mode should be restricted to the most significant axis. If for example the points have moved 10 pixels left and 5 pixels down, the movement should be restricted to only the axis represented with left in the current view. Furthermore the arrow keys should move the selected points one pixel in the direction of the arrow key in relation to the view that the mouse is positioned currently. If the down arrow key is pressed 10 times the selected points should move 10 pixels down in that view. The number of pixels moved per key press should be represented as a constant in the code. 

Add a button for exporting all five views as svg. All five views including the isometric preview should be saved as an individual svg file exactly corresponding to the svg contents in each of the five views. There should also be a range input that contains the rotation angle for the preview. This input should be updated to correspond to the angle given by the mouse rotation in the preview mode. The angle in the angle input should be the angle used for the svg export of the preview svg file. 

In point editing mode when backspace is pressed the currently selected points should be deleted.

The isometric preview rotation should only change when the mouse is in the preview and not when the mouse is in the menu pane. There should also be an icon in the menu for disabling the mouse movement rotation, limiting the rotation to only the range input. 

The buttons should have icons from google fonts material design icons. The export, upload and download should have the Export Note, File Save and File Open Icons. The svg preview should have the preview icon. The point creation mode button should should have the "point scan" icon. The point edit, line edit and curve edit button should have the "Arrows Output", "Line End" and "Line Curve" icons. The edit mode button should have the "Edit" icon. 

The buttons with icons should only have the icons and the text should be moved to the alt attribute. 

The "top" button should have the "subheader" icon and the "right" button should have the "position top right" icon. The "front" button should have the "position bottom left" icon and the "rear" button should have the "position bottom right" icon. All text in the buttons should be moved to the alt tag. 

In order for the coordinate systems to match up we need a way to pan the backgrounds after uploading the images. Add a button with the "drag pan" icon that starts a panning mode. In each of the four views in editing mode, the top left corner of the background image can be panned using the mouse. The panning button should be near the image upload buttons. The panning values for each of the four views should be stored in local storage.

The coordinate system in the top view (upper left viewport) needs to be rotated 90 degrees counter clockwise to match the background image in that view. The other three views should not be affected The coordinate system in the top view (upper left viewport) needs to be rotated a further 180 degrees counter clockwise to match the background image in that view. The other three views should not be affected. This is necessary because both the x axis and y axis in that view are flipped. 