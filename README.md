1. Before Setting Up the environment variables : 

* **Ensure you have node version 20.17.0 or greater**   
    
  * You can simply check this through this command via terminal   
    * node \-v  
  * Here is a link that will walk you through how to install node js via package manager : [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager)

* **Ensure you have React 18 or greater** 

2. **Install Python and Dependencies:**

* Install Python version 3.12.0  
  * Download it from this [website](https://www.python.org/downloads/release/python-3120/) based on your operating system.

3. **Set Up Environment Variables for Python:**

* After installation, edit your environment variables. 

* Add the path to your Python installation in both User and System Variables as follows:

  * \[Python installation path\]  
  * \[Python installation path\]\\Scripts

4. **Install Python Dependencies:**

* Open your terminal and run the following commands, one at a time:

  * python \-m pip install \--upgrade pip

* pip install fastapi uvicorn transformers torch torchvision pillow

5. **Set Up Environment Variables**:
   Create a .env file in the root of your project (same level as the server folder) with content from email.

    Email razeenali22@gmail.com for access to the .env file 

7. **Navigate to the Server Directory**: 

* Move into the server directory:
  
  cd my-app
  cd server

7. **Install Server Dependencies**: 

* Once in the server directory, run the following command to install the required dependencies: npm install i

8. **Start the Server**: 

- You need to start two servers:   
  * First server is for Python  
    * **Start the Python Server**  
    1. Navigate to the server directory and run:

 uvicorn analyze\_fashion:app \--host 127.0.0.1 \--port 8000

* Second server is for the Database  
* **Start the Database Server**  
  1. Run the following command:  
     Npm run dev 

You should see the message:  **Database Connected Successfully and Server started on port 8080 in your terminal if everything is set up correctly.** 

**DO NOT CLOSE THE TERMINAL THAT IS CURRENTLY RUNNING THE SERVER \!\!**

9. **Open a New Terminal Window**: 

* Open a new terminal window (or tab) to start the client.

10. **Navigate to the Client Directory**: 

* In the new terminal window, navigate to the client directory:   
  cd my-app
  cd client

      

11. **Install Client Dependencies**: 

* Run the following command to install the required dependencies for the client:   
  npm install

12. **Start the Client**: 

* Once the dependencies are installed, start the client application by running:  
    
    
  npm start 

You need to run the backend server and the frontend client in separate terminal windows. After starting both the server and client, you can register and log in users through the application.
