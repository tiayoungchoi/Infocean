let popupCloseCount = 0; // Initialize the popup close counter
let lastPopupTop = 0; // Track the last popup's top position

// Function to create popups
function createPopup() {
    // Create the popup element
    let popup = document.createElement('div');
    popup.className = 'popup';

    // Randomly select an image (either 'Ad 1.png' or 'Ad 2.png')
    let randomAd = Math.random() < 0.5 ? 'Ad 1.png' : 'Ad 2.png';

    // Create the image element
    let img = document.createElement('img');
    img.src = randomAd; // Set the image source to the randomly selected ad
    img.alt = 'Advertisement Image'; // Add an alt attribute for accessibility
    img.style.width = '200px'; // Set the width of the image to 200px

    // Wait for the image to load to adjust the popup height
    img.onload = function() {
        // Maintain the aspect ratio by setting height relative to width
        popup.style.width = '200px'; // Fixed width
        popup.style.height = (img.height / img.width) * 200 + 'px'; // Adjust height based on aspect ratio

        // Ensure popups are within the .phone section and not outside
        let phoneElement = document.querySelector('.phone'); // Get the .phone container element
        let phoneTop = phoneElement.offsetTop;
        let phoneHeight = phoneElement.offsetHeight;

        // Ensure the popup doesn't overlap with the header area
        let headerHeight = document.querySelector('.header').offsetHeight; // Get the height of the header
        let availableSpace = phoneHeight - headerHeight;

        // Randomize the gap between popups, allowing for overlap
        let randomGap = Math.random() * 50 + 20; // Random gap between popups (adjust the range as needed)

        // Calculate the top position for the new popup
        let randomTop = lastPopupTop + randomGap; // Random vertical offset with a random gap
        lastPopupTop = randomTop + parseFloat(popup.style.height); // Update lastPopupTop to be below the current popup

        // Ensure the popup stays within the available space
        if (randomTop + parseFloat(popup.style.height) > availableSpace) {
            randomTop = availableSpace - parseFloat(popup.style.height); // If too far down, place it at the bottom
        }

        // Generate a random horizontal position (left)
        let randomLeft = Math.random() * (phoneElement.offsetWidth - parseFloat(popup.style.width)); // Random left position

        // Set the popup's position relative to the .phone container
        popup.style.top = `${phoneTop + headerHeight + randomTop}px`; // Vertical position
        popup.style.left = `${phoneElement.offsetLeft + randomLeft}px`; // Horizontal position
    };

    // Create the close button
    let closeButton = document.createElement('button');
    closeButton.className = 'close-btn';
    closeButton.textContent = 'X';
    closeButton.onclick = function() {
        popup.remove(); // Remove the popup when the close button is clicked
        updateScore(); // Update the score when a popup is closed
    };

    // Append the image and close button to the popup
    popup.appendChild(img);
    popup.appendChild(closeButton);

    // Append the popup to the body
    document.body.appendChild(popup);
}

// Function to update the score on the scoreboard
function updateScore() {
    popupCloseCount++; // Increment the counter
    document.getElementById('scoreboard').textContent = 'Score: ' + popupCloseCount; // Update the scoreboard

    // Check if the score reaches 19 and show the "exit" link
    if (popupCloseCount === 19) {
        showExitLink();
        setTimeout(showWorkNotification, 1000); // Show the work notification 1 second after score reaches 19
    }
}

// Function to show the "exit" link
function showExitLink() {
    // Create the exit link
    let exitLink = document.createElement('a');
    exitLink.href = 'exit.html'; // Set the link's destination
    exitLink.textContent = 'Exit'; // Set the link's text
    exitLink.style.position = 'fixed'; // Fix the position to the right side of the header
    exitLink.style.top = '10px'; // Position it near the top of the page
    exitLink.style.right = '10px'; // Position it near the right edge of the page
    exitLink.style.backgroundColor = 'red'; // Style it to stand out
    exitLink.style.color = 'white'; // White text color
    exitLink.style.padding = '10px'; // Padding around the text
    exitLink.style.textDecoration = 'none'; // Remove underline

    // Append the exit link to the body
    document.body.appendChild(exitLink);
}

// Function to show multiple work notifications with a 0.5-second interval
function showMultipleNotifications() {
    let notificationCount = 5; // Number of notifications to show
    let interval = 500; // Interval in milliseconds (0.5 seconds)
    let notificationTop = document.querySelector('.header').offsetHeight + 10; // Start position below the header
    let phoneElement = document.querySelector('.phone'); // Get the .phone container element
    let phoneLeft = phoneElement.offsetLeft; // Get the left position of the phone container
    let phoneWidth = phoneElement.offsetWidth; // Get the width of the phone container

    let notificationInterval = setInterval(() => {
        // Create a new work notification
        let workNotification = document.createElement('div');
        workNotification.className = 'work-notification';
        workNotification.textContent = 'Work Notification!';

        // Append the new notification to the body
        document.body.appendChild(workNotification);

        // Set the position of the notification below the header and centered in the phone container
        workNotification.style.position = 'fixed'; // Fixed position
        workNotification.style.top = `${notificationTop}px`; // Fixed top position
        workNotification.style.left = `${phoneLeft + (phoneWidth / 2) - (workNotification.offsetWidth / 2)}px`; // Centered horizontally
        workNotification.style.transition = 'opacity 1s ease-in'; // 1 second fade-in
        workNotification.style.opacity = 0; // Start hidden

        // Show the notification with fade-in effect
        setTimeout(() => {
            workNotification.style.opacity = 1; // Fade in
        }, 10); // Small delay to ensure transition is applied after display

        // Increase the top position for the next notification to stack below the previous one
        notificationTop += 40; // Adjust the space between notifications

        // Fade-out effect after 3 seconds
        setTimeout(() => {
            workNotification.style.opacity = 0;
        }, 3000); // Fade-out after 3 seconds

        // Decrease the notification count and stop the interval when done
        notificationCount--;
        if (notificationCount === 0) {
            clearInterval(notificationInterval); // Stop generating notifications
        }
    }, interval);
}

// Function to show the work notification after the score reaches 19
function showWorkNotification() {
    showMultipleNotifications(); // Start showing multiple notifications
}

// Function to show the initial popup
let clockInterval; // Variable to hold the clock interval ID
let simulatedTime; // Variable to hold simulated time

function showInitialPopup() {
    // Generate a random starting time
    simulatedTime = Math.floor(Math.random() * 1440); // Random starting time (between 0 and 23:59)

    clearInterval(clockInterval); // Stop the clock when showing the initial popup

    let initialPopup = document.createElement('div');
    initialPopup.className = 'popup initial-popup'; // Added a new class for styling
    initialPopup.innerHTML = "<p>Welcome to Infocean — the ultimate experience of social media overload, where you can dive into a series of intense mini-games designed to simulate the overwhelming feeling of constant notifications, updates, and content bombardment. As you progress through each challenge, you’ll feel the pressure build, just like scrolling through endless feeds. But don’t worry! Reach a certain point, and you’ll unlock an escape button to break free from the chaos. Test your limits, play at your own pace, and see if you can handle the storm before finding your way out. Ready to face the frenzy? Let’s see if you can escape!</p><button class='close-btn'>X</button>"; // Changed "Close" to "X"

    // Create the close button for the initial popup
    let closeButton = initialPopup.querySelector('.close-btn');
    closeButton.onclick = function() {
        initialPopup.remove(); // Remove the initial popup when the close button is clicked
        startClock(); // Start the clock after the initial popup is closed
        startGeneratingPopups(); // Start generating popups after the initial popup is closed
    };

    // Append the initial popup to the body
    document.body.appendChild(initialPopup);
}

// Function to start the clock
function startClock() {
    // Update the clock every second
    updateClockDisplay();
    clockInterval = setInterval(updateClock, 1000); // Update every second
}

// Function to update the clock display
function updateClockDisplay() {
    let hours = Math.floor(simulatedTime / 60);
    let minutes = simulatedTime % 60;
    let clock = document.getElementById('clock');
    clock.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Function to update the simulated clock time
function updateClock() {
    simulatedTime++;
    if (simulatedTime === 1440) {
        simulatedTime = 0; // Reset to 0 after 24 hours
    }
    updateClockDisplay();
}

// Function to start generating popups
function startGeneratingPopups() {
    setInterval(createPopup, 900); // Generate a new popup every 3 seconds
}

// Start the process by showing the initial popup
showInitialPopup();
