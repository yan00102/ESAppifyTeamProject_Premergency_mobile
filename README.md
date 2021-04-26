# Below is how to run the mobile application on physical devices that is being developed by using React Native Expo.

## Introduction of the mobile application

The mobile application is for paramedics to do assessments in the mobile environment. The platform building this mobile application is React Native Expo. This manual focuses on Mac.

## How to run the mobile application

### Step 1: Check whether Node is installed in Mac

- Run ‘node -v’ in the terminal

If the result of 'node -v’ is ‘command not found: node’, node is not installed. Please do step 2. If you get the version of node, node has been installed already. You can update node by using the command below.

- Run ‘npm cache clean -f’ in the terminal
- Run ‘sudo npm install -g n’ in the terminal
- Run ‘sudo n stable’ in the terminal

And then please do step 3.

### Step 2: Install node in Mac

- Go to the https://nodejs.org/
- Download the LTS version
- Install the LTS version

### Step 3: Update/install yarn in Mac

The command below is used for both updating and installing yarn.

- Run ‘sudo npm install --global yarn’ in the terminal

### Step 4: Check whether expo-cli is installed in Mac

- Run ‘expo --version’ in the terminal

If the result of ‘expo --version’ is ‘command not found: expo’, expo is not installed. Please do step 6. If you get the version of expo, expo has been installed already. And then, please do step 5 to update expo.

### Step 5: Update expo-cli in Mac

- Run ‘expo upgrade’ in the terminal

And then please do step 7.

### Step 6: Install expo in Mac

- Run ‘sudo npm install --global expo-cli’ in the terminal

### Step 7: Install 'Expo Go' in physical iPhone and Android

- If mobile physical devices(iOS and Android) have 'Expo Go', remove 'Expo Go' in devices and intall it again

- In Apple Store for iPhone

  <img src="https://user-images.githubusercontent.com/54903541/114061401-66931980-9864-11eb-93b1-4fbc5dd458f0.jpeg" width="300">

- In Google Play Store for Android

  <img src="https://user-images.githubusercontent.com/54903541/114062491-94c52900-9865-11eb-9385-8831586ce9b4.png" width="300">

### Step 8: Clone the ‘dev’ branch from the team mobile repository and install dependencies in Mac

- Run ‘git clone -b dev https://github.com/ESAppify-Team1/Premegency-mobile.git’ in the terminal
- Run 'cd Premegency-mobile' in the terminal
- Run 'yarn' in the terminal

### Step 9: Run expo in Mac

- In the folder 'Premegency-mobile' of the Step 8, run 'yarn start' in the terminal
- And then, the browser shows the QRcode like below

  <img src="https://user-images.githubusercontent.com/54903541/114064712-e79fe000-9867-11eb-9ffa-816b73a5012f.png" width="300">

### Step 10: Run the application on the devices

- On iPhone

  - Open 'Expo Go'
  - Open Camara of iPhone
  - Scan the QRcode of the step 9

- On Anroid
  - Open 'Expo Go'
  - Click 'Scan QR Code'
  - Scan the QRcode of the step 9

### Step 11: Login the mobile application

- Test User Accounts
  - ID: paramedic.user1@aaa.com / Password: 123456!
  - ID: paramedic.user2@aaa.com / Password: 123456!
# ESAppifyTeamProject_Premergency_mobile
