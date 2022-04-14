<h1>Virgool</h1>
<p>
    A Fullstack Typescript Project
</p>
<p>
    using Nestjs as backend, Reactjs as frontend of the panel, and Nextjs as frontend of the site.   
</p>
<p>
    I want to focus on typescript language. so I decided to start a new project to improve my typescript knowledge. I will work on this project when my time be free.
</p>

<h3>Backend:</h3>

<code>
     cd .\backend-nestjs\
</code>
<p>Change .env content. then run these commands</p>

<code>
     npm install
</code>
<br/>
<code>
     npm run start:dev
</code>
<p>Navigate to localhost:8000</p>

<h3>Frontend (Panel):</h3>
<code>
     cd .\frontend-panel-reactjs\
</code>
<br/>
<code>
     npm install
</code>
<br/>
<code>
     npm start
</code>
<p>Navigate to localhost:3000</p>

<h3>Frontend (Site):</h3>
<code>
     cd .\frontend-site-nextjs\
</code>
<br/>
<code>
     npm install
</code>
<br/>
<code>
     npm run dev
</code>
<p>Navigate to localhost:3001</p>


<h3>
    Backend Features
</h3>

<h4>Auth</h4>
  <ul>
    <li>Register</li>
    <li>Login</li>
    <li>Login via google</li>
  </ul>

  <h4>Articles</h4>
  <ul>
    <li>Create a article by users</li>
    <li>Get the articles list</li>
    <li>Get an article</li>
    <li>Update an article by its owner or admins</li>
    <li>Delete an article by its owner or admins</li>
    <li>Search & filter the articles list</li>
    <li>Like an article by users</li>
    <li>Bookmark an article</li>
  </ul>
  
  <h4>Categories</h4>
  <ul>
    <li>Create a category by admins</li>
    <li>Get a category</li>
    <li>Get the categories list</li>
    <li>Update a category by admins</li>
    <li>Delete a category by admins</li>
    <li>Search & filter the categories list</li>
  </ul>

  <h4>Comments</h4>
  <ul>
    <li>Create comment by users on an article</li>
    <li>Reply to comments by users</li>
    <li>Like comments by users</li>
    <li>Update a comment by its owner</li>
    <li>Delete a comment by its owner</li>
    <li>Get comments lists</li>
    <li>Get comments lists of an article</li>
    <li>Search & filter the comments list</li>
  </ul>

  <h4>Roles</h4>
  <ul>
    <li>Create role by admins</li>
    <li>Get roles list</li>
    <li>Get a role</li>
    <li>Update a role by admins</li>
    <li>Delete a role by admins</li>
    <li>Assign a role to a user</li>
    <li>Assign permissions to a role</li>
  </ul>

  <h4>Permissions</h4>
  <ul>
    <li>Create permission by admins</li>
    <li>Get permissions list</li>
    <li>Get a permission</li>
    <li>Update a permission by admins</li>
    <li>Delete a permission by admins</li>
    <li>Assign a permission to a role</li>
  </ul>

  <h4>Me</h4>
  <ul>
    <li>Get profile</li>
    <li>Update profile by it's owner or admins</li>
    <li>Get followers list</li>
    <li>Get followings list</li>
    <li>Follow a user</li>
    <li>Unfollow a followed user</li>
    <li>Get bookmarked articles list</li>
    <li>Get liked articles list</li>
  </ul>
