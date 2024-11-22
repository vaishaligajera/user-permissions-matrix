# vue-role-permission

## Project setup

```
npm install
```

### Copy the `.env.example` File

Before running the project, copy the `.env.example` file and create a new `.env` file. This file contains environment-specific configurations, such as the role permissions.

### Update the Environment Variables

To test different roles, you need to update the role-related environment variable values in your `.env` file. The available roles are:

- `gea` 
- `sea`
- `eng`
- `opr`
- `obj`

For example, to set the role to "gea" (Global Engineering Admin), open the `.env` file and update the relevant environment variable:

### Compiles and hot-reloads for development

Once you have updated the environment variable, you can re-start the development server by running:

```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```
