# Product Management App
This is a sample application for Product Management.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## App Demo Link

[Demo](https://in.pinterest.com/pin/461337555595836411)

## Setup Instructions

1. **Install Node.js**  
   Ensure you have Node.js installed on your machine. You can download it from [nodejs.org](https://nodejs.org/).

2. **Install Angular CLI**  
   Verify that you have the latest version of Angular CLI installed. If not, run the following command to install it:
   ```
   npm install -g @angular/cli@latest 
   ```

3. **Install Git CLI**

    Ensure you have Git installed. You can download it from  http://git-scm.com.

4. **Clone the Repository**
    
    Once Git is installed, clone this repository to your local machine:
    ```
    git clone https://github.com/Sujit-Lomte/ProductsManagementSystemApplicationUI.git
    ```

5. **Open the Project in Your IDE**
    
    Open the cloned repository in your favorite IDE (e.g., Visual Studio Code).

6. **Install Dependencies**

    Open the command terminal from the repository folder and run:
    ```
    npm install
    ```

## Run the Application

1. **Run the Backend API**

    Start the backend API using Visual Studio or your preferred method.

2. **Run the Development Server**

    Run the following command to start the development server:
    ```
    npm run start
    ```
    Navigate to http://localhost:4200/ in your browser. The application will automatically reload if you change any of the source files.


## Application Folder Structure

- **app**
  - **components**
    - **confirmation-dialog:** A reusable dialog component to get confirmation from the user before performing delete operations.
    - **Product-list:** The primary component to display the Product list.
    - **edit-Product-dialog:** A component to create or edit a Product.
  - **models**
    - **api-response:** Model for mapping API responses.
    - **Product-data:** Model for mapping Product data.
    - **modal-data:** Configuration model for dialog data.
  - **services**
    - **Product-service:** Service for managing Product operations.
    - **http-interceptor:** Interceptor for handling HTTP requests and responses.
    - **notification-service:** Service for managing user notifications.
- **environments**:
    - **environment.development.ts:** Development environment configuration
- **db.json:** A local json based db file.
## How the application could scale with a large number of Products?

### Backend Scalability

1. **Database:**
    - Currently the backend API is using InMemory database that is good for development purpose but not suitable for production as it cannot persist data forever.
    - We can switch to any Relational or Non Relational database. For example, we can use MongoDB that can handle large number of records effeciently and it is more scalable wich can speed up the query performance.

2. **API**
    - Currently, the API is returning all the records available in the database and it's not good practice to follow.
    - We can use server side pagination so that API will fetch Products in chunks rather than all at once. To achieve this, API should accept `page` and `pageSize` from the frontend application and based on the `pageSize` it will fetch the data from database.
    - We can user server side data filteration, that will minimize the record counts to fetch. To support this we need proper indexing in the database.
    - We can also use caching mechanism to store frequently accessed Products.

3. **Infrastructure**
    - In case of huge traffic, we need to deploy multiple instances of the backend API behind the load balancer to route incoming requests effeciently.
    - To support dynamic scaling, we can utilize containerization techniques using Docker and Kubernetes for orchastration. 

### Frontend Scalability

1.  **Effecient Data Retrieval**
    - Frontend application should fetch data in chunks from backend API by passing the pagination parameters `page` and `pageSize`.
    - Frontend should provide search and filter functionality to reduce number of Products to load.
    - If application grows and contains multiple modules, then we can use Lazy Loading to load child modules when needed.
    - If we start capturing Product person's photo, then we can utilize CDN to load that photo.


## Current Design Support for Scalability

1.  **Seperation of Concerns:**
    - We have separate code base for frontend and backend application. It is a good practice as we can deploy them seperatly and scale seperatly.
      For example, we can scale API layer horizontally to hadle more requests.

2. **Cloud Support**
    - Both Angular and .NET has good support for cloud deplyments. We can leverage cloud services like Load Balancer, CDN, Database that can further enhance the scalability.
